import { GetFieldInArrayByPath } from '../../src/util.js';
import { expectTypeOf } from 'expect-type';

// ----------------------------------------------------------------
//                              Indexes
// ----------------------------------------------------------------

// Empty Array
expectTypeOf<GetFieldInArrayByPath<[], '0'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<[], '1'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<[], '999'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<[], 'length'>>().toEqualTypeOf<0>();

// Primitives
expectTypeOf<GetFieldInArrayByPath<string[], '0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[], '1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[], '999'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<string[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<number[], '0'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<number[], '1'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<number[], '999'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<number[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<number[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<boolean[], '0'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<boolean[], '1'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<boolean[], '999'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<boolean[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<boolean[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<null[], '0'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<null[], '1'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<null[], '999'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<null[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<null[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<undefined[], '0'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<undefined[], '1'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<undefined[], '999'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<undefined[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<undefined[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<symbol[], '0'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<symbol[], '1'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<symbol[], '999'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<symbol[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<symbol[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<never[], '0'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<never[], '1'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<never[], '999'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<never[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<never[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<unknown[], '0'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<unknown[], '1'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<unknown[], '999'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<unknown[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<unknown[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<void[], '0'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<void[], '1'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<void[], '999'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<void[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<void[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<object[], '0'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<object[], '1'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<object[], '999'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<object[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<object[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<any[], '0'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<any[], '1'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<any[], '999'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<any[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<any[], 'someField'>>().toBeAny();

// Readonly Arrays
expectTypeOf<GetFieldInArrayByPath<readonly string[], '0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<readonly string[], '1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<readonly string[], '999'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<readonly string[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly string[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly number[], '0'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly number[], '1'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly number[], '999'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly number[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly number[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly boolean[], '0'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<readonly boolean[], '1'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<readonly boolean[], '999'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<readonly boolean[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly boolean[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly null[], '0'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<readonly null[], '1'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<readonly null[], '999'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<readonly null[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly null[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly undefined[], '0'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<readonly undefined[], '1'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<readonly undefined[], '999'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<readonly undefined[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly undefined[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly symbol[], '0'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<readonly symbol[], '1'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<readonly symbol[], '999'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<readonly symbol[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly symbol[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly never[], '0'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly never[], '1'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly never[], '999'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly never[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly never[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly unknown[], '0'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<readonly unknown[], '1'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<readonly unknown[], '999'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<readonly unknown[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly unknown[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly void[], '0'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<readonly void[], '1'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<readonly void[], '999'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<readonly void[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly void[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly object[], '0'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<readonly object[], '1'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<readonly object[], '999'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<readonly object[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly object[], 'someField'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly any[], '0'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<readonly any[], '1'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<readonly any[], '999'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<readonly any[], 'length'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<readonly any[], 'someField'>>().toBeAny();

// Arrays With Preset Size
expectTypeOf<GetFieldInArrayByPath<[string, number]>, '0'>().toEqualTypeOf<string>();
expectTypeOf<GetFieldInArrayByPath<[string, number]>, '1'>().toEqualTypeOf<number>();
expectTypeOf<GetFieldInArrayByPath<[string, number]>, '2'>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<[string, number]>, 'length'>().toEqualTypeOf<2>();
expectTypeOf<GetFieldInArrayByPath<readonly [string, number]>, '0'>().toEqualTypeOf<string>();
expectTypeOf<GetFieldInArrayByPath<readonly [string, number]>, '1'>().toEqualTypeOf<number>();
expectTypeOf<GetFieldInArrayByPath<readonly [string, number]>, '2'>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<readonly [string, number]>, 'length'>().toEqualTypeOf<2>();

// Unions
expectTypeOf<GetFieldInArrayByPath<Array<string | number>, '0'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetFieldInArrayByPath<Array<string | number>, '1'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetFieldInArrayByPath<Array<string | number>, '999'>>().toEqualTypeOf<string | number>();
expectTypeOf<GetFieldInArrayByPath<Array<null | undefined>, '0'>>().toEqualTypeOf<null | undefined>();
expectTypeOf<GetFieldInArrayByPath<Array<null | undefined>, '1'>>().toEqualTypeOf<null | undefined>();
expectTypeOf<GetFieldInArrayByPath<Array<null | undefined>, '999'>>().toEqualTypeOf<null | undefined>();

// Objects
expectTypeOf<GetFieldInArrayByPath<Array<{ x: string }>, '0'>>().toEqualTypeOf<{ x: string }>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: string }>, '1'>>().toEqualTypeOf<{ x: string }>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: string }>, '999'>>().toEqualTypeOf<{ x: string }>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '0'>>().toEqualTypeOf<{ x: number[] }>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '1'>>().toEqualTypeOf<{ x: number[] }>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '999'>>().toEqualTypeOf<{ x: number[] }>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '0.x'>>().toEqualTypeOf<number[]>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '1.x'>>().toEqualTypeOf<number[]>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '999.x'>>().toEqualTypeOf<number[]>();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '0.x.0'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '0.x.1'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '0.x.999'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '1.x.0'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '1.x.1'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '1.x.999'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '999.x.0'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '999.x.1'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number[] }>, '999.x.999'>>().toBeNumber();

// Two-Dimensional Arrays
expectTypeOf<GetFieldInArrayByPath<string[][], '0'>>().toEqualTypeOf<string[]>();
expectTypeOf<GetFieldInArrayByPath<string[][], '1'>>().toEqualTypeOf<string[]>();
expectTypeOf<GetFieldInArrayByPath<string[][], '999'>>().toEqualTypeOf<string[]>();
expectTypeOf<GetFieldInArrayByPath<string[][], '0.0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '0.1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '0.999'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '1.0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '1.1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '1.999'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '999.0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '999.1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[][], '999.999'>>().toBeString();

// ----------------------------------------------------------------
//                    Accessing Fields Directly
// ----------------------------------------------------------------

expectTypeOf<GetFieldInArrayByPath<Array<{ x: string }>, 'x'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: number }>, 'x'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: boolean }>, 'x'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: symbol }>, 'x'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: object }>, 'x'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: null }>, 'x'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: undefined }>, 'x'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: void }>, 'x'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: never }>, 'x'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: unknown }>, 'x'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: any }>, 'x'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<Array<{ x: Date }>, 'x'>>().toEqualTypeOf<Date>();

// Nested Objects

interface Input1 { x: { y: string; }; z: boolean; }
interface Input2 {
  x: {
    y: string;
    nested: {
      a: number;
      b: string;
      c: boolean[];
      d: {
        _: boolean;
        $: Array<{ field1: never; field2: void; field3: unknown[] }>;
      };
    };
  };
  z: boolean;
}

expectTypeOf<GetFieldInArrayByPath<Input1[], 'x'>>().toEqualTypeOf<{ y: string; }>();
expectTypeOf<GetFieldInArrayByPath<Input1[], 'x.y'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Input1[], 'z'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x'>>().toEqualTypeOf<Input2['x']>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.y'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested'>>().toEqualTypeOf<Input2['x']['nested']>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.a'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.b'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.c'>>().toEqualTypeOf<boolean[]>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.c.0'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.c.1'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.c.999'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d'>>().toEqualTypeOf<Input2['x']['nested']['d']>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d._'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$'>>().toEqualTypeOf<Input2['x']['nested']['d']['$']>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.0'>>().toEqualTypeOf<Input2['x']['nested']['d']['$'][number]>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.1'>>().toEqualTypeOf<Input2['x']['nested']['d']['$'][number]>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.999'>>().toEqualTypeOf<Input2['x']['nested']['d']['$'][number]>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.field1'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.field2'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.field3'>>().toEqualTypeOf<unknown[]>();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.field3.0'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.field3.1'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'x.nested.d.$.field3.999'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<Input2[], 'z'>>().toBeBoolean();
