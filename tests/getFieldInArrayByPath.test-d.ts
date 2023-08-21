import { GetFieldInArrayByPath } from "../src/util.js";
import { expectTypeOf } from "expect-type";

// ----------------------------------------------------------------
//                              Indexes
// ----------------------------------------------------------------

// Primitives
expectTypeOf<GetFieldInArrayByPath<string[], '0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[], '1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<string[], '999'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<number[], '0'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<number[], '1'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<number[], '999'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<boolean[], '0'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<boolean[], '1'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<boolean[], '999'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<null[], '0'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<null[], '1'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<null[], '999'>>().toBeNull();
expectTypeOf<GetFieldInArrayByPath<undefined[], '0'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<undefined[], '1'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<undefined[], '999'>>().toBeUndefined();
expectTypeOf<GetFieldInArrayByPath<symbol[], '0'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<symbol[], '1'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<symbol[], '999'>>().toBeSymbol();
expectTypeOf<GetFieldInArrayByPath<never[], '0'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<never[], '1'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<never[], '999'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<unknown[], '0'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<unknown[], '1'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<unknown[], '999'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<void[], '0'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<void[], '1'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<void[], '999'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<object[], '0'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<object[], '1'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<object[], '999'>>().toBeObject();
expectTypeOf<GetFieldInArrayByPath<any[], '0'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<any[], '1'>>().toBeAny();
expectTypeOf<GetFieldInArrayByPath<any[], '999'>>().toBeAny();

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
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '0'>>().toEqualTypeOf<Array<string>>();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '1'>>().toEqualTypeOf<Array<string>>();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '999'>>().toEqualTypeOf<Array<string>>();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '0.0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '0.1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '0.999'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '1.0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '1.1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '1.999'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '999.0'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '999.1'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Array<string>>, '999.999'>>().toBeString();

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
interface Input2 { x: { y: string; nested: { a: number; b: string; c: boolean[]; d: { _: boolean; $: Array<{ field1: never; field2: void; field3: unknown[]; }>; } } }; z: boolean; }

expectTypeOf<GetFieldInArrayByPath<Array<Input1>, 'x'>>().toEqualTypeOf<{ y: string; }>();
expectTypeOf<GetFieldInArrayByPath<Array<Input1>, 'x.y'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Input1>, 'z'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x'>>().toEqualTypeOf<Input2['x']>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.y'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested'>>().toEqualTypeOf<Input2['x']['nested']>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.a'>>().toBeNumber();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.b'>>().toBeString();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.c'>>().toEqualTypeOf<boolean[]>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.c.0'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.c.1'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.c.999'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d'>>().toEqualTypeOf<Input2['x']['nested']['d']>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d._'>>().toBeBoolean();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$'>>().toEqualTypeOf<Input2['x']['nested']['d']['$']>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.0'>>().toEqualTypeOf<Input2['x']['nested']['d']['$'][number]>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.1'>>().toEqualTypeOf<Input2['x']['nested']['d']['$'][number]>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.999'>>().toEqualTypeOf<Input2['x']['nested']['d']['$'][number]>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.field1'>>().toBeNever();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.field2'>>().toBeVoid();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.field3'>>().toEqualTypeOf<unknown[]>();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.field3.0'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.field3.1'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'x.nested.d.$.field3.999'>>().toBeUnknown();
expectTypeOf<GetFieldInArrayByPath<Array<Input2>, 'z'>>().toBeBoolean();

