import { expectTypeOf } from 'expect-type';
import { RemoveIndex } from '../../src/util.js';

class Input {
  [x: string]: any
  [x: number]: any
  [x: symbol]: any
  [x: `head-${string}`]: string
  [x: `${string}-tail`]: string
  [x: `head-${string}-tail`]: string
  [x: `${bigint}`]: string
  [x: `embedded-${number}`]: string

  normal = 123;
  optional?: string;
}

type Result = RemoveIndex<Input>;

expectTypeOf<Result>().toEqualTypeOf<{ normal: number; optional?: string; }>();
