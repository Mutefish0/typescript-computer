import type { $Add, $Min, $LT, $GT } from "./core";

export type $Split<
  Str extends string,
  Result extends string[] = []
> = Str extends ""
  ? Result
  : Str extends `${infer Head}${infer Tail}`
  ? $Split<Tail, [...Result, Head]>
  : [];

export type $SplitByChar<
  Str extends string,
  Char extends string,
  I extends number = 0,
  SP extends string[] = $Split<Str>,
  TO extends number = SP["length"],
  CUM extends string = "",
  Result extends string[] = []
> = $LT<I, TO> extends 0
  ? [...Result, CUM]
  : SP[I] extends Char
  ? $SplitByChar<Str, Char, $Add<I, 1>["value"], SP, TO, "", [...Result, CUM]>
  : $SplitByChar<
      Str,
      Char,
      $Add<I, 1>["value"],
      SP,
      TO,
      `${CUM}${SP[I]}`,
      Result
    >;

export type $Slice<
  Str extends string,
  From extends number,
  To extends number,
  Result extends string = "",
  SP extends string[] = $Split<Str>,
  ToBound extends number = $Min<SP["length"], To>
> = $LT<From, ToBound> extends 0
  ? Result
  : $Slice<Str, $Add<From, 1>["value"], To, `${Result}${SP[From]}`>;

export type $ArrayToUnion<T extends any[]> = number extends keyof T
  ? T[number]
  : never;
