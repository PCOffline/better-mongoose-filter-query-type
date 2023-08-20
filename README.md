# Better Mongoose RootQuerySelector Type
### This proposition is currently still in development, please check the [TODO List](https://github.com/PCOffline/mongoose-filter-query-poc/blob/main/README.md#todo-list)
A proposition for a change of the `RootQuerySelector` type that includes nested paths instead of `any`.
# How to Use
As of the moment, you cannot directly use this repository without manually configuring a module override. Optimally, this proposition should be merged to Mongoose's official types the second it is ready.
Either way, there's a plan to add an option for a module override within this repository, and to turn this repository into an npm package until Mongoose decides to merge it.

# Motivation
As of today, the RootQuerySelector type has the following definition:
```ts
type RootQuerySelector<T> = {
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/and/#op._S_and */
  $and?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/nor/#op._S_nor */
  $nor?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/or/#op._S_or */
  $or?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/text */
  $text?: {
    $search: string;
    $language?: string;
    $caseSensitive?: boolean;
    $diacriticSensitive?: boolean;
  };
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/where/#op._S_where */
  $where?: string | Function;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/comment/#op._S_comment */
  $comment?: string;
  // we could not find a proper TypeScript generic to support nested queries e.g. 'user.friends.name'
  // this will mark all unrecognized properties as any (including nested queries)
  [key: string]: any;
};
```

Notice the `[key: string]: any` and the comment above it. In short, this means that Mongoose could not find a type that receives an object and generates all its paths, including nested paths:
```ts
interface Input {
  field: string;
  nested: {
    anotherField: number;
  }
}

interface ExpectedOutput extends RootQuerySelector<Input> {
  field: Condition<string>;
  // Can't compute these fields:
  nested: Condition<{ nested: anotherField: number }>;
  'nested.anotherField': Condition<number>;
}
```

Instead, Mongoose resorted to declaring the fields they can (root fields such as `$and`, `$or`, etc. and the direct fields of the input object) and allowing for any other field to exist with the `any` type. This gives the freedom for the user to add nested paths without TypeScript complaining, but comrpomises on type-safety.

I noticed this lack of type-safety when I had a typo in a nested path or had a misspelled condition, both of which caused some bugs that were rather hard to find. I decided to take upon myself the challenge of generating these nested paths.

# How This Works
This challenge is split to two general tasks:
1. Creating a union of paths (both regular and nested) for a given object
2. Creating a final object that gives the proper type (i.e. `Condition`) to each path.

## Creating A Union of Paths
First of all, it is apparent this is going to be a recursive type. That is, a type that uses recursion to compute the paths of nested objects.
The result we want is similar to the example above, but let's define the exact requirements:

### General Requirements
1. The input is always an object, otherwise it makes no sense for us to look for its paths.
2. An array also counts as an object, we have to make sure our type can handle arrays and their requirements.
3. If the object has paths that are objects themselves, we should run the recursive type on them as well to get their paths.
4. The type should return a union of paths in a dot-notation format (`objectField.nestedField`) where the left-most path is always a direct field of the original object (this will become more apparent later).

### Object Requirements
According to the MongoDB driver docs, there are a few special cases for nested objects:
Both the nested fields and the path of the object should be present (i.e. `objectField` and `objectField.nestedField` should both be present).
A few examples:
```ts
{ 'objectField.nestedField': 'some value' }
{ objectField: { $exists: true } }
```

### Array Requirements
In an array, the path of the array, as well as the path to its indexes and the path to its fields should be present:
```ts
{ array: 'some value' }
{ array: { $gt: 25 } }
{ array: { $all: 'some value' } }
{ 'array.0': 'some value' }
{ 'array.0.someField': 'some value' }
{ 'array.someField': 'some value' }
```

### Implementation
A type this exhaustive, while hard to make, is indeed possible:
```ts
type RecursiveFieldsOfObject<T> = keyof {
  [Property in keyof T as T[Property] extends any[]
    ?
        | `${string & Property}.${number}`
        | Property
        | (T[Property][number] extends object
            ? `${ConcatUnion<`${string & Property}.`, `${number}.`>}${string &
                RecursiveFieldsOfObject<T[Property][number]>}`
            : never)
    : T[Property] extends object
    ? Property | `${string & Property}.${string & RecursiveFieldsOfObject<T[Property]>}`
    : Property]: true;
};
```

This type is a bit scary, so let's simplify it to a few stages.
For each field in an object, we check:
- If it's an array
  - Include the path of the array, as well as its path with an index: `array | array.0 | array.1 | array.2 | ...`.
  - If the array has an object as its element, include `array.0.someField` and `array.someField`.
  - If that object is nested, run the recursion again for that object.
- If it's an object
  - Include the path of the object: `objectField`
  - Include the path to its fields: `objectField.someField`
  - Check if one of the fields is an object or an array and if so, run the recursion on them.
- If it's any other type (string, number, boolean, symbol), return the path to this field: `someField`

The end result is a union of paths to each field in the object.

# TODO List
- [ ] Add TSD and a test script
- [ ] Add unit tests for FilterQuery
  - [ ] Simple objects (no nested fields / arrays)
  - [ ] Simple Arrays (arrays of primitive types)
  - [ ] Nested Objects
  - [ ] Arrays of Objects
  - [ ] Readonly Arrays
  - [ ] Nested Arrays
  - [ ] Nested Arrays of Objects
  - [ ] Complex Interfaces Mixing Multiple Types
- [ ] Add unit tests for utility types
  - [ ] DeepNestedAccess
  - [ ] ArrayNestedAccess
  - [ ] ConcatUnion
- [ ] Refactor code to be more readable, meaningful names, better docs
- [ ] Add performance charts and data
- [ ] Add examples
