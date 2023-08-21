import { GetFieldByPath } from '../src/util.js';
import { expectTypeOf } from 'expect-type';

interface ComplexObject {
  id: number;
  name: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    nestedInfo: {
      prop1: string;
      prop2: number;
      nestedArray: {
        propX: boolean;
        propY: string;
      }[];
    };
  };
  arrayData: {
    array1: string[];
    array2: {
      subArray1: number[];
      subArray2: {
        propA: string;
        propB: boolean;
        nestedObjects: {
          subProp1: number;
          subProp2: {
            subSubPropA: string;
            subSubPropB: boolean;
          }[];
        }[];
      }[];
    }[];
  };
  otherProperties: {
    isActive: boolean;
    count: number;
    settings: {
      option1: boolean;
      option2: string;
      option3: {
        nestedOption: string;
        deepNestedOption: {
          propC: number;
          propD: {
            subPropC: boolean;
            subPropD: string[];
          };
        };
      };
    };
    relatedItems: {
      itemID: string;
      itemName: string;
    }[];
  };
}

interface Input {
  $: any;
  _: any[];
  a: string;
  b: number;
  c: boolean;
  d: never;
  e: null;
  f: undefined;
  g: void;
  h: () => void;
  i: <T>() => T;
  j: (param: string) => string;
  k: <T>(param: T) => number;
  l: (param: boolean, ...rest: any[]) => unknown[];
  m: <T>(param: () => boolean, ...rest: T[]) => T;
  n: Date;
  'a-1': 5;
  'a[]': string[];
  'b[]': number[];
  'c[]': boolean[];
  'd[]': never[];
  'e[]': null[];
  'f[]': undefined[];
  'g[]': void[];
  arr1: Array<string | number>;
  arr2: Array<Array<string | number>>;
  arr3: Array<Input>;
  arr4: Array<{ x: number}>;
  obj1: object;
  obj2: Record<string, any>;
  obj3: { x: number; y: string; z: boolean; };
  obj4: { x: { a: number; b: string; c: { readonly field: string; } }; y: never[]; c: unknown; d: number[]; };
  obj5: ComplexObject;
  readonly obj6: Readonly<ComplexObject>;
  readonly _a: string;
  readonly _b: number;
  readonly _c: boolean;
  [x: `${string}-${number}`]: number;
  [x: `${string}[]`]: unknown[];
}



type GetField<Path extends string | number> = GetFieldByPath<Input, Path>;

// ----------------------------------------------------------------
//                      First-level properties
// ----------------------------------------------------------------

expectTypeOf<GetField<'$'>>().toBeAny();
expectTypeOf<GetField<'_'>>().toEqualTypeOf<any[]>();
expectTypeOf<GetField<'a'>>().toBeString();
expectTypeOf<GetField<'b'>>().toBeNumber();
expectTypeOf<GetField<'c'>>().toBeBoolean();
expectTypeOf<GetField<'d'>>().toBeNever();
expectTypeOf<GetField<'e'>>().toBeNull();
expectTypeOf<GetField<'f'>>().toBeUndefined();
expectTypeOf<GetField<'g'>>().toBeVoid();
expectTypeOf<GetField<'h'>>().toEqualTypeOf<() => void>();
expectTypeOf<GetField<'i'>>().toEqualTypeOf<<T>() => T>();
expectTypeOf<GetField<'j'>>().toEqualTypeOf<(param: string) => string>();
expectTypeOf<GetField<'k'>>().toEqualTypeOf<<T>(param: T) => number>();
expectTypeOf<GetField<'l'>>().toEqualTypeOf<(param: boolean, ...rest: any[]) => unknown[]>();
expectTypeOf<GetField<'m'>>().toEqualTypeOf<<T>(param: () => boolean, ...rest: T[]) => T>();
expectTypeOf<GetField<'n'>>().toEqualTypeOf<Date>();
expectTypeOf<GetField<'a-1'>>().toEqualTypeOf<5>();
expectTypeOf<GetField<'a[]'>>().toEqualTypeOf<string[]>();
expectTypeOf<GetField<'b[]'>>().toEqualTypeOf<number[]>();
expectTypeOf<GetField<'c[]'>>().toEqualTypeOf<boolean[]>();
expectTypeOf<GetField<'d[]'>>().toEqualTypeOf<never[]>();
expectTypeOf<GetField<'e[]'>>().toEqualTypeOf<null[]>();
expectTypeOf<GetField<'f[]'>>().toEqualTypeOf<undefined[]>();
expectTypeOf<GetField<'g[]'>>().toEqualTypeOf<void[]>();
expectTypeOf<GetField<'arr1'>>().toEqualTypeOf<Array<string | number>>();
expectTypeOf<GetField<'arr2'>>().toEqualTypeOf<Array<Array<string | number>>>();
expectTypeOf<GetField<'arr3'>>().toEqualTypeOf<Array<Input>>();
expectTypeOf<GetField<'arr4'>>().toEqualTypeOf<Array<{ x: number}>>();
expectTypeOf<GetField<'obj1'>>().toEqualTypeOf<object>();
expectTypeOf<GetField<'obj2'>>().toEqualTypeOf<Record<string, any>>();
expectTypeOf<GetField<'obj3'>>().toEqualTypeOf<Input['obj3']>();
expectTypeOf<GetField<'obj4'>>().toEqualTypeOf<Input['obj4']>();
expectTypeOf<GetField<'obj5'>>().toEqualTypeOf<ComplexObject>();
expectTypeOf<GetField<'_a'>>().toBeString();
expectTypeOf<GetField<'_b'>>().toBeNumber();
expectTypeOf<GetField<'_c'>>().toBeBoolean();

// ----------------------------------------------------------------
//                              Indexes
// ----------------------------------------------------------------

expectTypeOf<GetField<'abceawd-2138912'>>().toEqualTypeOf<number>;
expectTypeOf<GetField<'dasjda[]'>>().toEqualTypeOf<unknown[]>();
expectTypeOf<GetField<'obj2.someProp'>>().toBeAny();

// ----------------------------------------------------------------
//                           Nested Objects
// ----------------------------------------------------------------

// If the field doesn't exist, it should return never
expectTypeOf<GetField<'obj1.someProp'>>().toBeNever();
expectTypeOf<GetField<'obj3.someProp'>>().toBeNever();
expectTypeOf<GetField<'obj4.someProp'>>().toBeNever();
expectTypeOf<GetField<'obj5.someProp'>>().toBeNever();
expectTypeOf<GetField<'someProp'>>().toBeNever();

expectTypeOf<GetField<'obj3.x'>>().toBeNumber();
expectTypeOf<GetField<'obj3.y'>>().toBeString();
expectTypeOf<GetField<'obj3.z'>>().toBeBoolean();
expectTypeOf<GetField<'obj4.c'>>().toBeUnknown();
expectTypeOf<GetField<'obj4.y'>>().toEqualTypeOf<never[]>();
expectTypeOf<GetField<'obj4.d'>>().toEqualTypeOf<number[]>();
expectTypeOf<GetField<'obj4.x'>>().toEqualTypeOf<Input['obj4']['x']>();
expectTypeOf<GetField<'obj4.x.a'>>().toBeNumber();
expectTypeOf<GetField<'obj4.x.b'>>().toBeString();
expectTypeOf<GetField<'obj4.x.c'>>().toEqualTypeOf<Input['obj4']['x']['c']>();
expectTypeOf<GetField<'obj4.x.c.field'>>().toBeString();
expectTypeOf<GetField<'obj5.id'>>().toBeNumber();
expectTypeOf<GetField<'obj5.name'>>().toBeString();
expectTypeOf<GetField<'obj5.metadata'>>().toEqualTypeOf<ComplexObject['metadata']>();
expectTypeOf<GetField<'obj5.metadata.createdAt'>>().toEqualTypeOf<Date>();
expectTypeOf<GetField<'obj5.metadata.updatedAt'>>().toEqualTypeOf<Date>();
expectTypeOf<GetField<'obj5.metadata.tags'>>().toEqualTypeOf<string[]>();
expectTypeOf<GetField<'obj5.metadata.nestedInfo'>>().toEqualTypeOf<ComplexObject['metadata']['nestedInfo']>();
expectTypeOf<GetField<'obj5.metadata.nestedInfo.prop1'>>().toBeString();
expectTypeOf<GetField<'obj5.metadata.nestedInfo.prop2'>>().toBeNumber();
expectTypeOf<GetField<'obj5.metadata.nestedInfo.nestedArray'>>().toEqualTypeOf<ComplexObject['metadata']['nestedInfo']['nestedArray']>();
expectTypeOf<GetField<'obj5.metadata.nestedInfo.nestedArray.propX'>>().toBeBoolean();
expectTypeOf<GetField<'obj5.metadata.nestedInfo.nestedArray.propY'>>().toBeString();

// ----------------------------------------------------------------
//                              Arrays
// ----------------------------------------------------------------

// Accessing a field of an object array directly, without an index
expectTypeOf<GetField<'arr4.x'>>().toBeNumber();
expectTypeOf<GetField<'obj5.arrayData'>>().toEqualTypeOf<ComplexObject['arrayData']>();
expectTypeOf<GetField<'obj5.arrayData.array1'>>().toEqualTypeOf<string[]>();
expectTypeOf<GetField<'obj5.arrayData.array2'>>().toEqualTypeOf<ComplexObject['arrayData']['array2']>();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray1'>>().toEqualTypeOf<number[]>();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2'>>().toEqualTypeOf<ComplexObject['arrayData']['array2'][number]['subArray2']>();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2.propA'>>().toBeString();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2.propB'>>().toBeBoolean();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2.nestedObjects'>>().toEqualTypeOf<ComplexObject['arrayData']['array2'][number]['subArray2'][number]['nestedObjects']>();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2.nestedObjects.subProp1'>>().toBeNumber();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2.nestedObjects.subProp2'>>().toEqualTypeOf<ComplexObject['arrayData']['array2'][number]['subArray2'][number]['nestedObjects'][number]['subProp2']>();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2.nestedObjects.subProp2.subSubPropA'>>().toBeString();
expectTypeOf<GetField<'obj5.arrayData.array2.subArray2.nestedObjects.subProp2.subSubPropB'>>().toBeBoolean();

// Accesing an index in an array
expectTypeOf<GetField<'arr1.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr1.1'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr1.999'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr2.0'>>().toEqualTypeOf<Array<string | number>>();
expectTypeOf<GetField<'arr2.1'>>().toEqualTypeOf<Array<string | number>>();
expectTypeOf<GetField<'arr2.999'>>().toEqualTypeOf<Array<string | number>>();
expectTypeOf<GetField<'arr2.0.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr2.0.1'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr2.0.999'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr3.0'>>().toEqualTypeOf<Input>();
expectTypeOf<GetField<'arr3.1'>>().toEqualTypeOf<Input>();
expectTypeOf<GetField<'arr3.999'>>().toEqualTypeOf<Input>();
expectTypeOf<GetField<'arr3.0.$'>>().toBeAny();
expectTypeOf<GetField<'arr3.0.arr1'>>().toEqualTypeOf<Array<string | number>>();
expectTypeOf<GetField<'arr3.0.arr1.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr3.0.arr1.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr3.1.$'>>().toBeAny();
expectTypeOf<GetField<'arr3.1.arr1'>>().toEqualTypeOf<Array<string | number>>();
expectTypeOf<GetField<'arr3.1.arr1.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr3.1.arr1.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr3.999.$'>>().toBeAny();
expectTypeOf<GetField<'arr3.999.arr1'>>().toEqualTypeOf<Array<string | number>>();
expectTypeOf<GetField<'arr3.999.arr1.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr3.999.arr1.0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetField<'arr4.1'>>().toEqualTypeOf<{ x: number }>();
expectTypeOf<GetField<'arr4.999'>>().toEqualTypeOf<{ x: number }>();
expectTypeOf<GetField<'arr4.0'>>().toEqualTypeOf<{ x: number }>();
expectTypeOf<GetField<'arr4.0.x'>>().toBeNumber();
expectTypeOf<GetField<'arr4.1.x'>>().toBeNumber();
expectTypeOf<GetField<'arr4.999.x'>>().toBeNumber();
