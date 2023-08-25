import type { KeysOf } from '@util';
import { expectTypeOf } from 'expect-type';

expectTypeOf<KeysOf<Date>>().toBeNever();
expectTypeOf<KeysOf<string[]>>().toBeNever();
expectTypeOf<KeysOf<string[][]>>().toBeNever();
expectTypeOf<KeysOf<Array<string>>>().toBeNever();
expectTypeOf<KeysOf<{ func(): void; }>>().toBeNever();
expectTypeOf<KeysOf<() => void>>().toBeNever();
expectTypeOf<KeysOf<{ [Symbol.hasInstance]: () => boolean; }>>().toBeNever();

expectTypeOf<KeysOf<Record<string, number>>>().toBeString();
expectTypeOf<KeysOf<{ a: string; }>>().toEqualTypeOf<'a'>();
expectTypeOf<KeysOf<{ a: Date; }>>().toEqualTypeOf<'a'>();
expectTypeOf<KeysOf<{ a: {}; }>>().toEqualTypeOf<'a'>();
expectTypeOf<KeysOf<{ a: {}; }>>().toEqualTypeOf<'a'>();

interface Input {
  a: string;
  b: number;
  c: { field: number; };
  d: string[];
  e: Date;
  func(): void;
  [Symbol.toPrimitive]: () => number;
}

expectTypeOf<KeysOf<{ a: string; b: number; }>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<KeysOf<Input>>().toEqualTypeOf<'a' | 'b' | 'c' | 'd' | 'e'>();

// @ts-expect-error
type A = KeysOf<string>;
// @ts-expect-error
type B = KeysOf<number>;
