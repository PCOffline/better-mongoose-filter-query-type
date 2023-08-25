// ----------------------------------------------------------------
//                             Is-Type
// ----------------------------------------------------------------
export type IsAny<T, Then = true, Else = false> = 0 extends 1 & T ? Then : Else;
export type IsNever<T, Then = true, Else = false> = [T, never] extends [
  never,
  T,
]
  ? Then
  : Else;
export type IsArray<T, Then = true, Else = false> = IsNever<
  T,
  Else,
  IsAny<T, Else, T extends AnyArray ? Then : Else>
>;
export type IsObject<T, Then = true, Else = false> = IsNever<
  T,
  Else,
  IsAny<T, Else, T extends object ? Then : Else>
>;

// ----------------------------------------------------------------
//                             General
// ----------------------------------------------------------------
export type AnyArray<T = any> = T[] | ReadonlyArray<T>;

/**
 * Removes any signature indexes (such as [key: string]: any) from an interface.
 *
 * @example
 * interface Example {
 *   str: string;
 *   num: number;
 *   [key: `${string}-${number}`]: any;
 * }
 *
 * type Output = RemoveIndex<Example>; // { str: string; num: number; }
 */
export type RemoveIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
};

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
 * Every type that can be used in a template string type.
 *
 * @example
 * type ConcatHello<Text> = `Hello ${Text}`; // Type 'Text' is not assignable to type 'string | number | bigint | boolean | null | undefined'.
 * type ConcatHello<Text extends Printable> = `Hello ${Text}`; // Works!
 */
export type Printable = string | number | bigint | boolean | null | undefined;

// ----------------------------------------------------------------
//                      Construct Query Object
// ----------------------------------------------------------------

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
  : GetFieldByPath<T[number], Path>;

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
> = IsArray<
  GetFieldInArrayByPath<Object, Path>,
  Path extends `${infer Field}.${infer Rest}`
    ? GetFieldByPath<Object[string & Field], Rest>
    : Path extends keyof Object
    ? Object[Path]
    : never
>;

// ----------------------------------------------------------------
//                         Fields of Object
// ----------------------------------------------------------------

/**
 * Receives an object and returns a union of the keys of the object, excluding Symbols and keys whose value is a Function.
 * Also, prevent the unwrapping of arrays, Date objects and functions.
 *
 * @returns a union of the keys of the object, excluding Symbols and keys whose value is a Function.
 * @example
 * interface Input {
 *   a: string;
 *   b: number;
 *   c: { field: number; };
 *   d: string[];
 *   e: Date;
 *   func(): void;
 *   [Symbol.toPrimitive]: () => number;
 * }
 *
 * type Output = KeysOf<Input>; // 'a' | 'b' | 'c' | 'd' | 'e'
 * type OutputOfDate = KeysOf<Date>; // never
 * type OutputOfArray = KeysOf<string[]>; // never
 * type OutputOfFunction = KeysOf<() => void>; // never
 */

export type KeysOf<T extends object> = T extends Function | Date
  ? never
  : IsArray<
      T,
      never,
      Extract<
        keyof {
          [K in Extract<keyof T, Printable> as IsNever<
            T[K],
            K,
            T[K] extends Function ? never : K
          >]: true;
        },
        Extract<keyof T, Printable> // This line does not actually change anything, but assures TypeScript that the output is a subset of the keys of T
      >
    >;

type HandleArray<T extends AnyArray> =
  | `${number}`
  | (IsArray<T[number]> extends true
      ? `${number}.${HandleArray<T[number]>}`
      : IsObject<T[number]> extends true
      ? `${Extract<RecursiveFieldsOfObject<T[number]>, Printable>}`
      : never);

/**
 * Receives an object and returns a union of keys and nested keys in dot-notation formatted specifically for Mongoose
 *
 * @example
 * type Obj = { field: number; nested: { field: string; }; array: string[] }
 * Recursion<Obj> //-> 'field' | 'nested.field' | 'array' | `array.${number}`
 */

export type RecursiveFieldsOfObject<T extends object> = keyof {
  [Property in KeysOf<T> as IsArray<
    T[Property],
    Property | `${string & Property}.${HandleArray<Extract<T[Property], any[]>>}`,
    IsAny<
      T[Property],
      Property,
      T[Property] extends object
        ?
            | Property
            | `${Property}.${Extract<
                RecursiveFieldsOfObject<T[Property]>,
                Printable
              >}`
        : Property
    >
  >]: true;
};
