import type { $Add, $LT, $Subtract, $ParseInt, $Error } from "./core";
import type { $Split, $ArrayToUnion, $Slice, $SplitByChar } from "./collection";

type VALID_HEX_VALUE = $ArrayToUnion<$Split<"0123456789abcdef">>;

type CharAt<X extends string, I extends number> = $Split<X>[I];
type StrLen<X extends string> = $Split<X>["length"];

type ExtractHex<T extends string> = $LT<StrLen<T>, 9> extends 1
  ? $Slice<T, 0, 2> extends "0x"
    ? $Slice<T, 2, StrLen<T>>
    : never
  : never;

type ExtractRGB<T extends string, L extends number = StrLen<T>> = $Slice<
  T,
  0,
  4
> extends "rgb("
  ? $Slice<T, $Subtract<L, 1>["value"], L> extends ")"
    ? $Slice<T, 4, $Subtract<L, 1>["value"]>
    : never
  : never;

type CheckHex<
  X extends string,
  I extends number = 0,
  E extends number = StrLen<X>
> = I extends E
  ? 1
  : CharAt<X, I> extends VALID_HEX_VALUE
  ? CheckHex<X, $Add<I, 1>["value"], E>
  : 0;

type CheckRGBComponents<
  T extends string[],
  R extends number = $ParseInt<T[0]>,
  G extends number = $ParseInt<T[1]>,
  B extends number = $ParseInt<T[2]>
> = T["length"] extends 3
  ? R extends number
    ? G extends number
      ? B extends number
        ? $LT<R, 256> extends 1
          ? $LT<G, 256> extends 1
            ? $LT<B, 256> extends 1
              ? 1
              : 0
            : 0
          : 0
        : 0
      : 0
    : 0
  : 0;

type C_Hex<
  X extends string,
  Hex extends string | never = ExtractHex<X>,
  Check_Hex extends number = CheckHex<Hex>
> = Check_Hex extends 1 ? X : never;

type C_RGB<
  X extends string,
  RGB extends string | never = ExtractRGB<X>,
  R_G_B extends string[] = RGB extends string ? $SplitByChar<RGB, ","> : [],
  Check_R_G_B extends number = CheckRGBComponents<R_G_B>
> = Check_R_G_B extends 1 ? X : never;

type C_Color<X extends string> = C_Hex<X> extends string
  ? X
  : C_RGB<X> extends string
  ? X
  : never;

type A = C_Color<"rgb(1,1,1)">;
