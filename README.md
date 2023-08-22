# Better Mongoose RootQuerySelector Type
![Type-Level Tests](https://github.com/PCOffline/better-mongoose-filter-query-type/actions/workflows/node.js.yml/badge.svg)

### This proposition is currently still in development, please check the [TODO List](https://github.com/PCOffline/mongoose-filter-query-poc/blob/main/README.md#todo-list)

A proposition for a change of the `RootQuerySelector` type to include nested paths and remove the `any` index signature.

## How to Use

Simply add the following line to your tsconfig.json file:
```json
{
  "compilerOptions": {
    // ...
    "types": ["node_modules/better-mongoose-filter-query-type"]
  }
}
```
## Stability & Performance

### Unit Testing

### Performance Charts

## Motivation

As of today, the RootQuerySelector type has the following definition:

```ts
type RootQuerySelector<T> = {
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/and/#op._S_and */
  $and?: Array<FilterQuery<T>>;
  // ...
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
  nested: Condition<{ anotherField: number }>;
  'nested.anotherField': Condition<number>;
}
```

Instead, Mongoose resorted to declaring the fields they can (root fields such as `$and`, `$or`, etc. and the direct fields of the input object) and allowing for any other field to exist with the `any` type. This gives the freedom for the user to add nested paths without TypeScript complaining, but comrpomises on type-safety.

I noticed this lack of type-safety when I had a typo in a nested path or had a misspelled condition, both of which caused some bugs that were rather hard to find. I decided to take upon myself the challenge of generating these nested paths.
