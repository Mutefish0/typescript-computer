type _Dd = "0123456789";
type _Al = "abcdefghijklmnopqrstvuwxyz";
type _Au = "ABCDEFGHIJKLMNOPQRSTVUWXYZ";
type _Aa = `${_Al}${_Au}`;
type $Digital = $Split<_Dd>[number];
type $Alphabets_lower = $Split<_Al>[number];
type $Alphabets_upper = $Split<_Au>[number];
type $Alphabets = $Alphabets_lower | $Alphabets_upper;
type $Words = $Digital | $Alphabets | "_";

type $FindCharIndex<
  Target extends $Alphabets,
  Str extends string = _Aa,
  Result extends number = 0
> = Str extends ""
  ? -1
  : Str extends `${infer U}${infer Tail}`
  ? U extends Target
    ? Result
    : $FindCharIndex<Target, Tail, $Add<Result, 1>["value"]>
  : Result;

type $FindDigitalIndex<
  Target extends $Digital,
  Str extends string = _Dd,
  Result extends number = 0
> = Str extends ""
  ? -1
  : Str extends `${infer U}${infer Tail}`
  ? U extends Target
    ? Result
    : $FindDigitalIndex<Target, Tail, $Add<Result, 1>["value"]>
  : Result;

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

type $AlphaRange<
  From extends $Alphabets,
  To extends $Alphabets,
  From1 extends number = $FindCharIndex<From>,
  To1 extends number = $FindCharIndex<To>
> = $ArrayToUnion<$SliceToCharArray<_Aa, From1, To1>> | To;

type $DigitalRange<
  From extends $Digital,
  To extends $Digital,
  From1 extends number = $FindDigitalIndex<From>,
  To1 extends number = $FindDigitalIndex<To>
> = $ArrayToUnion<$SliceToCharArray<_Dd, From1, To1>> | To;

type $ArrayExclude<
  Arr extends T[],
  P extends T,
  T = string,
  Result extends T[] = []
> = Arr extends []
  ? Result
  : Arr extends [infer Head, ...infer Tail]
  ? Head extends T
    ? Head extends P
      ? [...Result, ...Tail]
      : Tail extends T[]
      ? $ArrayExclude<Tail, P, T, [...Result, Head]>
      : []
    : []
  : [];

type $Array2InsertHead<
  Arr extends T[][],
  Insert extends T,
  T = string,
  Result extends T[][] = []
> = Arr extends []
  ? Result
  : Arr extends [infer Head, ...infer Tail]
  ? Head extends T[]
    ? Tail extends T[][]
      ? $Array2InsertHead<Tail, Insert, T, [...Result, [Insert, ...Head]]>
      : []
    : []
  : [];

type $Arrange<
  Coll extends string[],
  T extends number = 4,
  I extends number = 0,
  Result extends string[][] = []
> = T extends 1
  ? [Coll[0]]
  : T extends 2
  ? [[Coll[1], Coll[0]], [Coll[0], Coll[1]]]
  : $LT<I, T> extends 1
  ? $Arrange<
      Coll,
      T,
      $Add<I, 1>["value"],
      [
        ...Result,
        ...$Array2InsertHead<
          $Arrange<$ArrayExclude<Coll, Coll[I]>, $Subtract<T, 1>["value"]>,
          Coll[I]
        >
      ]
    >
  : Result;

type $Comb2<Coll extends string[]> = [];

// 求子数组（相对顺序不变）
type $Combine<
  Coll extends string[],
  T extends number = 4,
  I extends number = 0,
  J extends number = 0,
  K extends number = 0,
  TempResult extends string[] = [],
  Result extends string[][] = []
> = T extends 1
  ? [[Coll[0]]]
  : T extends 2
  ? [[Coll[0]], [Coll[1]], [Coll[0], Coll[1]]]
  : $LT<I, T> extends 1
  ? $Combine<Coll, T, $Add<I, 1>["value"], I, 0, [], []>
  : $LT<J, T> extends 1
  ? $Combine<Coll, T, I, $Add<J, 1>["value"], I, [], Result>
  : Result;

type $MapJoin<
  Arr extends string[][],
  Sep extends string,
  Result extends string[] = []
> = Arr extends []
  ? Result
  : Arr extends [infer Head, ...infer Tail]
  ? Head extends string[]
    ? Tail extends string[][]
      ? $MapJoin<Tail, Sep, [...Result, $Join<Head, Sep>]>
      : []
    : []
  : [];

