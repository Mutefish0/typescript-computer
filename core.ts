type _MAX_NUMBER = 200;
type _Index_Max_Number_Array = _NArrayNumber<_MAX_NUMBER>;
type _Index_Max_Number = _Index_Max_Number_Array[number];
type _Index_Max_Number_String_Pos = `${_Index_Max_Number}`;
type _Index_Max_Number_String_Neg = Exclude<
  `-${_Index_Max_Number_String_Pos}`,
  "-0"
>;

type _RemoveSign<T extends _Index_Max_Number_String_Neg> =
  T extends `-${infer U}`
    ? U extends _Index_Max_Number_String_Pos
      ? U
      : never
    : never;

type _NArray<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : __NArray<T, N, []>
  : never;

type _Length<X extends any[]> = X["length"] extends infer U
  ? U extends number
    ? U
    : 0
  : 0;

type __NArray<T, N extends number, R extends unknown[]> = _Length<R> extends N
  ? R
  : __NArray<T, N, [...R, _Length<R>]>;

type _NArrayNumber<L extends number> = _NArray<number, L>;

type $CastType<X, Y, Default extends Y> = X extends Y ? X : Default;

// 遍历数组
type $ArrayStuct<T, Head extends T, Tail extends T[]> = [Head, ...Tail];

type $Bool = 1 | 0; // True & False

type $AND<X extends $Bool, Y extends $Bool> = {
  0: 0;
  1: X;
}[Y];

type $OR<X extends $Bool, Y extends $Bool> = {
  0: Y;
  1: 1;
}[X];

type $NOT<X extends $Bool> = {
  0: 1;
  1: 0;
}[X];

// 异或
type $XOR<X extends $Bool, Y extends $Bool> = {
  0: $AND<X, 1>;
  1: $NOT<$OR<X, 0>>;
}[Y];

// 同或
type $EQV<X extends $Bool, Y extends $Bool> = $NOT<$XOR<X, Y>>;

type $IFELSE<B extends $Bool, IF, ELSE> = {
  1: IF;
  0: ELSE;
}[B];

type $Join<
  Arr extends any[],
  Sp extends string,
  Result extends string = ""
> = Arr extends []
  ? Result
  : Arr extends $ArrayStuct<Arr[0], infer Word, []>
  ? `${Result}${Word}`
  : Arr extends $ArrayStuct<Arr[0], infer Word, infer Tail>
  ? $Join<Tail, Sp, `${Result}${Word}${Sp}`>
  : never;

type $Error<Op extends string, Args extends unknown[], Msg extends string> = {
  op: `${Op}<${$Join<Args, ", ">}>`;
  error: `${Op}<${$Join<Args, ", ">}>: ${Msg}`;
};

type $Number = {
  sign: $Bool;
  value: _Index_Max_Number;
  print: string;
};

type $PosNumber = {
  sign: 0;
  value: _Index_Max_Number;
  print: string;
};

type $NegNumber = {
  sign: 1;
  value: _Index_Max_Number;
  print: string;
};

type $ReverseSign<X extends $Number> = {
  sign: $NOT<X["sign"]>;
  value: X["value"];
  print: $IFELSE<X["sign"], `${X["value"]}`, `-${X["value"]}`>;
};

type $SetSign<X extends $Number, S extends $Bool> = {
  sign: S;
  value: X["value"];
  print: $IFELSE<S, `-${X["value"]}`, `${X["value"]}`>;
};

type $Abs<X extends $Number> = $SetSign<X, 0>;

type _Number<T extends string> = T extends _Index_Max_Number_String_Pos
  ? {
      value: _Index_Max_Number_Array[T];
      sign: 0;
      print: T;
    }
  : T extends _Index_Max_Number_String_Neg
  ? {
      sign: 1;
      value: _Index_Max_Number_Array[_RemoveSign<T>];
      print: T;
    }
  : _Number<"0">;
//$Error<"$Number", [T], `excced max number ${_MAX_NUMBER}`>;

type $$Number<T extends number | string> = T extends string
  ? _Number<T>
  : T extends number
  ? _Number<`${T}`>
  : $$Number<0>;

type __SubtractPos<
  X extends _Index_Max_Number,
  Y extends _Index_Max_Number,
  SET extends $Bool = 0
> = _NArrayNumber<X> extends [..._NArrayNumber<Y>, ...infer R]
  ? $SetSign<$$Number<_Length<R>>, SET>
  : $$Number<-1>;

type _SubtractPos<
  X extends _Index_Max_Number,
  Y extends _Index_Max_Number
> = X extends Y
  ? $$Number<0>
  : __SubtractPos<X, Y> extends infer U
  ? U extends $$Number<-1>
    ? __SubtractPos<Y, X, 1>
    : U
  : $$Number<-1>;

type _AddPos<
  X extends _Index_Max_Number,
  Y extends _Index_Max_Number
> = _Length<[..._NArrayNumber<X>, ..._NArrayNumber<Y>]>;

// 乘法(尾递归优化)
type _MultiplyPos<
  X extends _Index_Max_Number,
  Y extends _Index_Max_Number,
  Result extends _Index_Max_Number = 0
> = Y extends 0
  ? Result
  : _MultiplyPos<
      X,
      $CastType<_SubtractPos<Y, 1>, $PosNumber, $$Number<0>>["value"],
      _AddPos<Result, X>
    >;

// 除法(尾递归优化)
type _DividePos<
  X extends _Index_Max_Number,
  Y extends _Index_Max_Number,
  Result extends _Index_Max_Number = 0
> = Y extends 0
  ? $Error<"_DividePos", [X, Y], "divide by zero">
  : Y extends 1
  ? X
  : _SubtractPos<X, Y> extends infer U
  ? U extends $Number
    ? U["value"] extends 0
      ? _AddPos<Result, 1>
      : U["sign"] extends 1
      ? Result
      : _DividePos<U["value"], Y, _AddPos<Result, 1>>
    : 0
  : 0;

type $EQZ<
  X extends $Number | number,
  X1 extends $Number = X extends $Number ? X : $$Number<$CastType<X, number, 0>>
> = X1["value"] extends 0 ? 1 : 0;
type $GTZ<X extends $Number> = $NOT<X["sign"]>;
type $LTZ<X extends $Number> = X["sign"];

// 加法
type $Add<
  X extends $Number | number,
  Y extends $Number | number,
  X1 extends $Number = X extends $Number
    ? X
    : $$Number<$CastType<X, number, 0>>,
  Y1 extends $Number = Y extends $Number ? Y : $$Number<$CastType<Y, number, 0>>
> = $EQV<X1["sign"], Y1["sign"]> extends 1
  ? $SetSign<$$Number<_AddPos<X1["value"], Y1["value"]>>, X1["sign"]>
  : _SubtractPos<X1["value"], Y1["value"]> extends infer U
  ? U extends $Number
    ? $SetSign<U, $AND<$XOR<X1["sign"], U["sign"]>, $NOT<$EQZ<U>>>>
    : $$Number<0>
  : $$Number<0>;

// 减法
type $Subtract<
  X extends $Number | number,
  Y extends $Number | number,
  X1 extends $Number = X extends $Number
    ? X
    : $$Number<$CastType<X, number, 0>>,
  Y1 extends $Number = Y extends $Number ? Y : $$Number<$CastType<Y, number, 0>>
> = $Add<X1, $ReverseSign<Y1>>;

type $EQ<
  X extends $Number | number,
  Y extends $Number | number,
  X1 extends $Number = X extends $Number
    ? X
    : $$Number<$CastType<X, number, 0>>,
  Y1 extends $Number = Y extends $Number ? Y : $$Number<$CastType<Y, number, 0>>
> = X1["value"] extends Y1["value"] ? 1 : 0;

type $GT<
  X extends $Number | number,
  Y extends $Number | number,
  X1 extends $Number = X extends $Number
    ? X
    : $$Number<$CastType<X, number, 0>>,
  Y1 extends $Number = Y extends $Number ? Y : $$Number<$CastType<Y, number, 0>>
> = $GTZ<$CastType<$Subtract<X1, Y1>, $Number, $$Number<0>>>;

type $LT<
  X extends $Number | number,
  Y extends $Number | number,
  X1 extends $Number = X extends $Number
    ? X
    : $$Number<$CastType<X, number, 0>>,
  Y1 extends $Number = Y extends $Number ? Y : $$Number<$CastType<Y, number, 0>>
> = $LTZ<$CastType<$Subtract<X1, Y1>, $Number, $$Number<0>>>;

type $Max<X extends $Number | number, Y extends $Number | number> = $LT<
  X,
  Y
> extends 1
  ? Y
  : X;

type $Min<X extends $Number | number, Y extends $Number | number> = $LT<
  X,
  Y
> extends 1
  ? X
  : Y;

// 乘法
type $Multiply<
  X extends $Number | number,
  Y extends $Number | number,
  X1 extends $Number = X extends $Number
    ? X
    : $$Number<$CastType<X, number, 0>>,
  Y1 extends $Number = Y extends $Number ? Y : $$Number<$CastType<Y, number, 0>>
> = $SetSign<
  {
    value: _MultiplyPos<X1["value"], Y1["value"]>;
    sign: 0;
    print: "";
  },
  $XOR<X1["sign"], Y1["sign"]>
>;

// 除法
type $Divide<
  X extends $Number | number,
  Y extends $Number | number,
  X1 extends $Number = X extends $Number
    ? X
    : $$Number<$CastType<X, number, 0>>,
  Y1 extends $Number = Y extends $Number ? Y : $$Number<$CastType<Y, number, 0>>
> = $SetSign<
  $$Number<
    $CastType<_DividePos<X1["value"], Y1["value"]>, _Index_Max_Number, 0>
  >,
  $XOR<X1["sign"], Y1["sign"]>
>;
