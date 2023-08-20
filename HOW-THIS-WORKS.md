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

## Creating An Object
Now that we have our union, all left to do is to create an interface that represents the query object.
In simple terms, we take each path (nested or not), access the type of the field it represents and wrap that type in the `Condition` type.

For example:

```ts
interface Example {
  field: string;
  nested: {
    anotherField: number;
  };
  array: number[];
}

interface ExpectedFilterQuery {
  field: Condition<string>;
  nested: Condition<{ anotherField: number }>;
  'nested.anotherField': Condition<number>;
  array: Condition<number[]>;
  [x: `array.${number}`]: Condition<number>;
}
```

For clarification, the last line in `ExpectedFilterQuery` merely defines that every field of the shape `array.number` (e.g. `array.0`) should have the `Condition<number>` type.

### Dot-Notation Access

In order to achieve this result, we need a way to receive an object and a dot-notation path (e.g. `nested.anotherField`) and be able to access the field represented by this path:

```ts
interface Example {
  nested: {
    field: number;
  }
}

type DotNotation = 'nested.field';
type GetFieldByDotNotation<Object, DotNotation> = ...;
type ExpectedResult = GetFieldByDotNotation<Example, DotNotation>; // number
```

Now that we know *what* we need, let's implement it:

```ts
type GetFieldByPath<
  Object extends Record<string | number | symbol, any>,
  Path extends string | number
> = Path extends `${infer Field}.${infer Rest}`
  ? GetFieldByPath<Object[string & Field], Rest>
  : Object[Path];
```

What's going on here? We check whether the path is of a dot notation form, if so, we access the next level and send it to the recursion. Otherwise, access the last level of the path and return the type. For example:

```ts
interface Example {
  nested: {
    field: string;
  };
  anotherField: number;
}

type Result = GetFieldByPath<Example, 'nested.field'>;
// Step 1. Check if the path is of a dot-notation form -> Yes
// Step 2. Access one level -> Example['nested']
// Step 3. Send the rest of the path to the recursion -> GetFieldByPath<Example['nested'], 'field'>;
// Step 4. Is path in dot-notation form? -> No
// Step 5. Access the last level and return the type -> Example['nested']['field] -> string;
```

We now have a type that can access fields within an object with dot-notation strings. What are we forgetting? Arrays! Arrays are special because they can be accessed only via index (`array.0.field`), but MongoDB syntax allows us to access their fields directly (i.e. you can write `array.0.field` but also `array.field`).
So we need a special type for arrays:

```ts
type GetFieldInArrayByPath<
  T extends Record<number | `${number}`, any>,
  Path extends string | number
> = Path extends number | `${number}`
  ? T[Path]
  : Path extends `${infer Index extends number}.${infer Rest}`
  ? GetFieldByPath<T[Index], Rest>
  : GetFieldByPath<T[number], Path>;
```

This type is actually pretty simple:
1. If the path is a number (i.e. an index), return `array[index]`.
2. If the path a dot-notation that starts with an index (i.e. `0.field`), get the type of `array[index]` and then send it back to `GetFieldByPath` with the rest of the path.
3. If the path is none of the above, get the type of `array[number]` (a representation of what the array's elements' type is) and then send it back to `GetFieldByPath`.

### Building the Object

Okay, we figured the dot-notation access thingy, now all we have left to do is actually build the object!

```ts
type _FilterQuery<T extends object> = {} & {
  [K in RecursiveFieldsOfObject<T>]?: Condition<GetFieldByPath<T, string & K>>;
};
```

Yes, after all these scary types, we finally get a short and simple one! Basically all that we do is go over each field we get from `RecursiveFieldsOfObject`, get their types using `GetFieldByPath` and wrap that in the Mongoose `Condition` type. That's it!