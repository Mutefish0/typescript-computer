type $Digital = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type _Al = "abcdefghijklmnopqrstvuwxyz";
type _Au = "ABCDEFGHIJKLMNOPQRSTVUWXYZ";
type _Aa = `${_Al}${_Au}`;
type $Alphabets_lower = $Split<_Al>[number];
type $Alphabets_upper = $Split<_Au>[number];
type $Alphabets = $Alphabets_lower | $Alphabets_upper;
type $Words = $Digital | $Alphabets | "_";

type $Split<Str extends string, Result extends string[] = []> = Str extends ""
  ? Result
  : Str extends `${infer Head}${infer Tail}`
  ? $Split<Tail, [...Result, Head]>
  : [];

type $Slice<
  Str extends string,
  From extends number,
  To extends number,
  I extends number = 0,
  Arr extends string[] = $Split<Str>,
  ToBound extends number = $Min<Arr["length"], To>,
  Result extends [string, string, string] = ["", "", ""]
> = $LT<I, From> extends 1
  ? $Slice<
      Str,
      From,
      To,
      $Add<I, 1>["value"],
      Arr,
      ToBound,
      [`${Result[0]}${Arr[I]}`, Result[1], Result[2]]
    >
  : $LT<I, ToBound> extends 1
  ? $Slice<
      Str,
      From,
      To,
      $Add<I, 1>["value"],
      Arr,
      ToBound,
      [Result[0], `${Result[1]}${Arr[I]}`, Result[2]]
    >
  : $LT<I, Arr["length"]> extends 1
  ? $Slice<
      Str,
      From,
      To,
      $Add<I, 1>["value"],
      Arr,
      ToBound,
      [Result[0], Result[1], `${Result[2]}${Arr[I]}`]
    >
  : Result;

type $SliceToCharArray<
  Str extends string,
  From extends number,
  To extends number,
  I extends number = 0,
  Arr extends string[] = $Split<Str>,
  ToBound extends number = $Min<Arr["length"], To>,
  Result extends string[] = []
> = $LT<I, From> extends 1
  ? $SliceToCharArray<Str, From, To, $Add<I, 1>["value"], Arr, ToBound, Result>
  : $LT<I, ToBound> extends 1
  ? $SliceToCharArray<
      Str,
      From,
      To,
      $Add<I, 1>["value"],
      Arr,
      ToBound,
      [...Result, Arr[I]]
    >
  : $LT<I, Arr["length"]> extends 1
  ? $SliceToCharArray<Str, From, To, $Add<I, 1>["value"], Arr, ToBound, Result>
  : Result;

type $Repeat<
  Str extends string,
  N extends number,
  Result extends string = ""
> = N extends 0
  ? Result
  : $Repeat<Str, $Subtract<N, 1>["value"], `${Result}${Str}`>;

type _RepeatRange<
  Str extends string,
  M extends number,
  N extends number,
  Result extends string[] = []
> = $LT<M, $Add<N, 1>["value"]> extends 1
  ? _RepeatRange<Str, $Add<M, 1>["value"], N, [...Result, $Repeat<Str, M>]>
  : Result;

type $RepeatRange<
  Str extends string,
  M extends number,
  N extends number
> = $ArrayToUnion<_RepeatRange<Str, M, N>>;

type $ArrayToUnion<T extends any[]> = number extends keyof T
  ? T[number]
  : never;

type Color = `#${$RepeatRange<"a" | "b", 3, 6>}`;

const c: Color = "#aba";

type $AlphaRange<From extends number, To extends number> = $ArrayToUnion<
  $SliceToCharArray<_Aa, From, To>
>;

type a = $AlphaRange<3, 7>;
