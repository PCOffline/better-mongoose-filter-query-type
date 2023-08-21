export type AnyArray<T> = T[] | ReadonlyArray<T>;

// Removes any signature indexes (such as [key: string]: any) from an interface
export type RemoveIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K]
}

/**
 * A utility function for DeepNestedAccess, handling accessing an array with a dot-notation string.
 * In case K is a number, returns T[K]. Otherwise, mimics MongoDB's syntax where array.field is an access to the array's elements – i.e. T[number] and then follow the dot-notation behaviour.
 *
 * @see GetFieldByPath
 * @example
 * type Array1 = [1, 2, 3];
 * type Array2 = [{ field: 'hello' }, { field: 'world' }];
 *
 * type Test1 = ArrayNestedAccess<Array1, 0>; // 1 – behaves just like Array1[0]
 * type Test2 = ArrayNestedAccess<Array2, 'field'>; // 'hello' | 'world' - behaves like accessing the properties of the elements of the array, similar to MongoDB's query behaviour.
 * type Test3 = ArrayNestedAccess<Array2, '0.field'>; // 'hello' - you can be explicit about the index, the dot-notation behaviour works as expected.
 */
export type GetFieldInArrayByPath<
  T extends Record<number | `${number}`, any>,
  Path extends string | number,
> = Path extends `${infer Index extends number}.${infer Rest}`
  ? GetFieldByPath<T[Index], Rest>
  : Path extends number | `${number}` | keyof T
  ? T[Path]
  : Path extends keyof T[number]
  ? GetFieldByPath<T[number], Path>
  : never;

/**
* Receives two types: an object and a string in a dot-notation format and returns the type of the value at the place specified by K in T

* @example
* type Obj = { field: 'value', nested: { field: 'nestedValue' } }
* type Path = 'nested.field'
* DeepNestedAccess<Obj, Path> //-> 'nestedValue'
*/
export type GetFieldByPath<
  Object extends Record<string | number | symbol, any>,
  Path extends string | number,
> = Object extends AnyArray<any>
  ? GetFieldInArrayByPath<Object, Path>
  : Path extends `${infer Field}.${infer Rest}`
  ? GetFieldByPath<Object[string & Field], Rest>
  : Path extends keyof Object
  ? Object[Path]
  : never;

export type Printable = string | number | boolean;

/**
 * Receives a string and an optional concatenation and returns a union of the string with and without the concatenated part.
 *
 * @example
 * type Example = ConcatUnion<'Hello', 'world'>; //-> 'Hello' | 'Hello world'
 */
export type ConcatUnion<Base extends Printable, Concat extends Printable> =
  | `${Base}${Concat}`
  | Base;

/**
 * Receives an object and returns a union of keys and nested keys in dot-notation formatted specifically for Mongoose
 *
 * @example
 * type Obj = { field: number; nested: { field: string; }; array: string[] }
 * Recursion<Obj> //-> 'field' | 'nested.field' | 'array' | `array.${number}`
 */
export type RecursiveFieldsOfObject<T> = keyof {
  [Property in keyof T as T[Property] extends AnyArray<any>
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