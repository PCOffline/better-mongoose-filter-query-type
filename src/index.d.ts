declare module 'mongoose' {
  import type { QuerySelector, RootQuerySelector as _RootQuerySelector } from "mongoose";
  import type { AnyArray, ConcatUnion, GetFieldByPath, GetFieldInArrayByPath, Printable, RecursiveFieldsOfObject } from './util.js'

  // An override of the exported ApplyBasicQueryCasting that removes the unnecessary any in the union.
  export type ApplyBasicQueryCasting<T> = T | T[] | (T extends AnyArray<(infer U)> ? U : T);


  // Use the override of ApplyBasicQueryCasting
  export type Condition<T> = ApplyBasicQueryCasting<T> | QuerySelector<ApplyBasicQueryCasting<T>>;


  export type RootQuerySelector<T> = RemoveIndex<_RootQuerySelector<T>>

  /**
   * Receives an object and returns an object that contains all the fields and nested fields of it
   * wrapped in a Condition and typed specifically for Mongoose
   *
   * @example
   * type Obj = { field: number; nested: { field: string; }; array: string[] }
   * type Result = FilterQuery<Obj> //-> { field: Condition<number>; 'nested.field': Condition<string>; array: Condition<string[]>; [x: `array.${number}`]: Condition<string> }
   */
  type _FilterQuery<T extends object> = {} & {
    [K in RecursiveFieldsOfObject<T>]?: Condition<GetFieldByPath<T, string & K>>;
  };

  export type FilterQuery<T extends object> = _FilterQuery<T> & RootQuerySelector<_FilterQuery<T>>;
}