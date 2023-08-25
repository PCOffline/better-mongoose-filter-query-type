import { IsAny, IsNever, IsArray, IsObject } from '@util';
import { expectTypeOf } from 'expect-type';


// ----------------------------------------------------------------
//                              IsAny
// ----------------------------------------------------------------

expectTypeOf<IsAny<any>>().toEqualTypeOf<true>();
expectTypeOf<IsAny<any[]>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<number>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<string>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<boolean>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<object>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<null>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<undefined>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<never>>().toEqualTypeOf<false>();
expectTypeOf<IsAny<string[]>>().toEqualTypeOf<false>();

// ----------------------------------------------------------------
//                             IsNever
// ----------------------------------------------------------------

expectTypeOf<IsNever<never>>().toEqualTypeOf<true>();
expectTypeOf<IsNever<never[]>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<number>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<string>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<boolean>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<object>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<unknown>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<null>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<undefined>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<any>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<string[]>>().toEqualTypeOf<false>();

// ----------------------------------------------------------------
//                             IsArray
// ----------------------------------------------------------------

expectTypeOf<IsArray<string[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<number[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<boolean[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<never[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<unknown[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<any[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<object[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<Array<string | number>>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<string[] | number[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<[number, string]>>().toEqualTypeOf<true>();

expectTypeOf<IsArray<readonly string[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly number[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly boolean[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly never[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly unknown[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly any[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly object[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly string[] | readonly number[]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly [number, string]>>().toEqualTypeOf<true>();

expectTypeOf<IsArray<string[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<number[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<never[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<unknown[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<any[][]>>().toEqualTypeOf<true>();

expectTypeOf<IsArray<readonly string[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly number[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly never[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly unknown[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly any[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly [string, number][]>>().toEqualTypeOf<true>();

expectTypeOf<IsArray<string[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<number[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<string[][][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<number[][][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<[string, number][][]>>().toEqualTypeOf<true>();

expectTypeOf<IsArray<readonly string[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly number[][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly string[][][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly number[][][]>>().toEqualTypeOf<true>();
expectTypeOf<IsArray<readonly [string, number][][]>>().toEqualTypeOf<true>();

expectTypeOf<IsArray<object>>().toEqualTypeOf<false>();
expectTypeOf<IsArray<string>>().toEqualTypeOf<false>();
expectTypeOf<IsArray<boolean>>().toEqualTypeOf<false>();
expectTypeOf<IsArray<never>>().toEqualTypeOf<false>();
expectTypeOf<IsArray<unknown>>().toEqualTypeOf<false>();
expectTypeOf<IsArray<any>>().toEqualTypeOf<false>();
expectTypeOf<IsArray<Record<number, string>>>().toEqualTypeOf<false>();

// ----------------------------------------------------------------
//                             IsObject
// ----------------------------------------------------------------

expectTypeOf<IsObject<object>>().toEqualTypeOf<true>();
expectTypeOf<IsObject<{}>>().toEqualTypeOf<true>();
expectTypeOf<IsObject<{ a: string; }>>().toEqualTypeOf<true>();
expectTypeOf<IsObject<Record<string, number>>>().toEqualTypeOf<true>();
expectTypeOf<IsObject<string[]>>().toEqualTypeOf<true>();
expectTypeOf<IsObject<{ [key: string]: any }>>().toEqualTypeOf<true>();
expectTypeOf<IsObject<Date>>().toEqualTypeOf<true>();

expectTypeOf<IsObject<string>>().toEqualTypeOf<false>();
expectTypeOf<IsObject<number>>().toEqualTypeOf<false>();
expectTypeOf<IsObject<never>>().toEqualTypeOf<false>();
expectTypeOf<IsObject<unknown>>().toEqualTypeOf<false>();
expectTypeOf<IsObject<any>>().toEqualTypeOf<false>();
