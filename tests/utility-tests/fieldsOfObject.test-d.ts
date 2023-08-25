import { RecursiveFieldsOfObject } from '@util';
import { expectTypeOf } from 'expect-type';

// Summary Tests
type Obj1 = { field: number };
expectTypeOf<RecursiveFieldsOfObject<Obj1>>().toEqualTypeOf<'field'>();

type Obj2 = { field: number; nested: { subfield: string } };
expectTypeOf<RecursiveFieldsOfObject<Obj2>>().toEqualTypeOf<
  'field' | 'nested' | 'nested.subfield'
>();

type Obj3 = { field: number[] };
expectTypeOf<RecursiveFieldsOfObject<Obj3>>().toEqualTypeOf<
  'field' | `field.${number}`
>();

type Obj4 = { field: number[]; nested: { subfield: string[] } };
expectTypeOf<RecursiveFieldsOfObject<Obj4>>().toEqualTypeOf<
  | 'field'
  | `field.${number}`
  | 'nested'
  | 'nested.subfield'
  | `nested.subfield.${number}`
>();

type Obj5 = {
  field: number[];
  nested: { subfield: string[] };
  array: string[][];
};
expectTypeOf<RecursiveFieldsOfObject<Obj5>>().toEqualTypeOf<
  | 'field'
  | `field.${number}`
  | 'nested'
  | 'nested.subfield'
  | `nested.subfield.${number}`
  | 'array'
  | `array.${number}`
  | `array.${number}.${number}`
>();

type Obj6 = {
  field: number[];
  nested: { subfield: string[] };
  array: string[][][];
};
expectTypeOf<RecursiveFieldsOfObject<Obj6>>().toEqualTypeOf<
  | 'field'
  | `field.${number}`
  | 'nested'
  | 'nested.subfield'
  | `nested.subfield.${number}`
  | 'array'
  | `array.${number}`
  | `array.${number}.${number}`
  | `array.${number}.${number}.${number}`
>();

type Obj7 = { field: number; nested: { subfield: { nestedField: number } } };
expectTypeOf<RecursiveFieldsOfObject<Obj7>>().toEqualTypeOf<
  'field' | 'nested' | 'nested.subfield' | 'nested.subfield.nestedField'
>();

type Obj8 = {
  field: number;
  nested: { subfield: { nestedField: { superNestedField: string } } };
};
expectTypeOf<RecursiveFieldsOfObject<Obj8>>().toEqualTypeOf<
  | 'field'
  | 'nested'
  | 'nested.subfield'
  | 'nested.subfield.nestedField'
  | 'nested.subfield.nestedField.superNestedField'
>();

// ----------------------------------------------------------------
//                              Objects
// ----------------------------------------------------------------

interface SimpleObject1 {
  a: string;
  b: number;
  c: void;
  d: number;
  e: null;
  f: undefined;
  g: never;
  h: unknown;
  i: Date;
  j: () => {};
  k: any;
  l: boolean;
  m: object;
}

interface SimpleObject2 {
  'a-b': string;
  'a.c': number;
  d_b: boolean;
  '1321': void;
  null: object;
  undefined: unknown;
  true: never;
  false: undefined;
}

expectTypeOf<RecursiveFieldsOfObject<SimpleObject1>>().toEqualTypeOf<Exclude<keyof SimpleObject1, 'j'>>();
expectTypeOf<RecursiveFieldsOfObject<SimpleObject2>>().toEqualTypeOf<keyof SimpleObject2>();

// ----------------------------------------------------------------
//                               Dates
// ----------------------------------------------------------------

expectTypeOf<RecursiveFieldsOfObject<Date>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<{ a: Date }>>().toEqualTypeOf<'a'>();

// ----------------------------------------------------------------
//                           Nested Objects
// ----------------------------------------------------------------

interface NestedObject {
  id: number;
  name: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    nestedInfo: {
      prop1: string;
      prop2: number;
      superNestedInfo: {
        propX: boolean;
        propY: string;
      };
    };
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
            subPropD: string;
          };
        };
      };
    };
    relatedItem: {
      itemID: string;
      itemName: string;
    };
  };
}

type NestedObjectFields = RecursiveFieldsOfObject<NestedObject>;

expectTypeOf<NestedObjectFields>().toEqualTypeOf<
  | keyof NestedObject
  | `metadata.${keyof NestedObject['metadata']}`
  | `metadata.nestedInfo.${keyof NestedObject['metadata']['nestedInfo']}`
  | `metadata.nestedInfo.superNestedInfo.${keyof NestedObject['metadata']['nestedInfo']['superNestedInfo']}`
  | `otherProperties.${keyof NestedObject['otherProperties']}`
  | `otherProperties.settings.${keyof NestedObject['otherProperties']['settings']}`
  | `otherProperties.settings.option3.${keyof NestedObject['otherProperties']['settings']['option3']}`
  | `otherProperties.settings.option3.deepNestedOption.${keyof NestedObject['otherProperties']['settings']['option3']['deepNestedOption']}`
  | `otherProperties.settings.option3.deepNestedOption.propD.${keyof NestedObject['otherProperties']['settings']['option3']['deepNestedOption']['propD']}`
  | `otherProperties.relatedItem.${keyof NestedObject['otherProperties']['relatedItem']}`
>();

// ----------------------------------------------------------------
//                              Arrays
// ----------------------------------------------------------------

expectTypeOf<RecursiveFieldsOfObject<string[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<number[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<never[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<unknown[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<any[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<[string, number]>>().toBeNever();

expectTypeOf<RecursiveFieldsOfObject<readonly number[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<readonly never[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<readonly unknown[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<readonly any[]>>().toBeNever();
expectTypeOf<RecursiveFieldsOfObject<readonly [string, number]>>().toBeNever();

expectTypeOf<RecursiveFieldsOfObject<{ a: string[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: number[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: never[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: unknown[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: any[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: [string, number] }>>().toEqualTypeOf<'a' | `a.${number}`>();

expectTypeOf<RecursiveFieldsOfObject<{ a: readonly string[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly number[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly never[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly unknown[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly any[] }>>().toEqualTypeOf<'a' | `a.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly [string, number] }>>().toEqualTypeOf<'a' | `a.${number}`>();

expectTypeOf<RecursiveFieldsOfObject<{ a: string[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: number[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: never[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: unknown[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: any[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: [string, number][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();

expectTypeOf<RecursiveFieldsOfObject<{ a: readonly string[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly number[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly never[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly unknown[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly any[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly [string, number][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}`>();

expectTypeOf<RecursiveFieldsOfObject<{ a: string[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: number[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: never[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: unknown[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: any[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: [string, number][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();

expectTypeOf<RecursiveFieldsOfObject<{ a: readonly string[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly number[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly never[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly unknown[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly any[][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: readonly [string, number][][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}` | `a.${number}.${number}.${number}`>();

expectTypeOf<RecursiveFieldsOfObject<{ a: { b: string | number }[] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();
expectTypeOf<RecursiveFieldsOfObject<{ a: { b: never }[] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();
expectTypeOf<RecursiveFieldsOfObject<{ a: { b: any }[] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();

expectTypeOf<RecursiveFieldsOfObject<{ a: [{ b: string | number }] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();
expectTypeOf<RecursiveFieldsOfObject<{ a: [{ b: never }] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();
expectTypeOf<RecursiveFieldsOfObject<{ a: [{ b: any }] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();

expectTypeOf<RecursiveFieldsOfObject<{ a: { b: string | number }[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();
expectTypeOf<RecursiveFieldsOfObject<{ a: { b: never }[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();
expectTypeOf<RecursiveFieldsOfObject<{ a: { b: any }[][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.b` | 'a.b'>();

expectTypeOf<RecursiveFieldsOfObject<{ a: [{ b: string | number }][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}.b` | `a.${number}.b`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: [{ b: never }][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}.b` | `a.${number}.b`>();
expectTypeOf<RecursiveFieldsOfObject<{ a: [{ b: any }][] }>>().toEqualTypeOf<'a' | `a.${number}` | `a.${number}.${number}.b` | `a.${number}.b`>();



// ----------------------------------------------------------------
//                              Indexes
// ----------------------------------------------------------------
class IndexInput {
  [x: `head-${string}`]: string;
  [x: `${string}-tail`]: string;
  [x: `head-${string}-tail`]: string;
  [x: `${bigint}`]: string;
  [x: `embedded-${number}`]: string;

  normal = 123;
  optional?: string;
}

expectTypeOf<RecursiveFieldsOfObject<IndexInput>>().toEqualTypeOf<
  keyof IndexInput
>();
