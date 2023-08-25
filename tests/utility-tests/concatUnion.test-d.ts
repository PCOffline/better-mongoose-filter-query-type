import { ConcatUnion } from '@util';
import { expectTypeOf } from 'expect-type';

expectTypeOf<ConcatUnion<'a', 'b'>>().toEqualTypeOf<'a' | 'ab'>();
expectTypeOf<ConcatUnion<'a', 1>>().toEqualTypeOf<'a' | 'a1'>();
expectTypeOf<ConcatUnion<'a', true>>().toEqualTypeOf<'a' | 'atrue'>();
expectTypeOf<ConcatUnion<1, 'b'>>().toEqualTypeOf<1 | '1b'>();
expectTypeOf<ConcatUnion<true, 'b'>>().toEqualTypeOf<true | 'trueb'>();
expectTypeOf<ConcatUnion<`${number}-a`, 'b'>>().toEqualTypeOf<`${number}-a` | `${number}-ab`>();
