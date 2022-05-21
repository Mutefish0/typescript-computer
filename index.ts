type $D =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | -1
  | -2
  | -3
  | -4
  | -5
  | -6
  | -7
  | -8
  | -9;

type $MAP_SHIFT_FORWARD = {
  [-9]: -8;
  [-8]: -7;
  [-7]: -6;
  [-6]: -5;
  [-5]: -4;
  [-4]: -3;
  [-3]: -2;
  [-2]: -1;
  [-1]: 0;
  0: 1;
  1: 2;
  2: 3;
  3: 4;
  4: 5;
  5: 6;
  6: 7;
  7: 8;
  8: 9;
  9: 0;
};

type $MAP_SHIFT_BACKWARD = {
  [-9]: 0;
  [-8]: -9;
  [-7]: -8;
  [-6]: -7;
  [-5]: -6;
  [-4]: -5;
  [-3]: -4;
  [-2]: -3;
  [-1]: -2;
  0: -1;
  1: 0;
  2: 1;
  3: 2;
  4: 3;
  5: 4;
  6: 5;
  7: 6;
  8: 7;
  9: 8;
};

type $NEG<X extends $D> = {
  [-9]: 9;
  [-8]: 8;
  [-7]: 7;
  [-6]: 6;
  [-5]: 5;
  [-4]: 4;
  [-3]: 3;
  [-2]: 2;
  [-1]: 1;
  0: 0;
  1: -1;
  2: -2;
  3: -3;
  4: -4;
  5: -5;
  6: -6;
  7: -7;
  8: -8;
  9: -9;
}[X];

type $MAP_SHIFT_MAP<V extends $D> = {
  0: V;
  1: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[0]];
  2: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[1]];
  3: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[2]];
  4: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[3]];
  5: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[4]];
  6: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[5]];
  7: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[6]];
  8: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[7]];
  9: $MAP_SHIFT_FORWARD[$MAP_SHIFT_MAP<V>[8]];
  [-1]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[0]];
  [-2]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-1]];
  [-3]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-2]];
  [-4]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-3]];
  [-5]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-4]];
  [-6]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-5]];
  [-7]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-6]];
  [-8]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-7]];
  [-9]: $MAP_SHIFT_BACKWARD[$MAP_SHIFT_MAP<V>[-8]];
};

type $Add<X extends $D, Y extends $D> = $MAP_SHIFT_MAP<X>[Y];
type $Sub<X extends $D, Y extends $D> = $MAP_SHIFT_MAP<X>[$NEG<Y>];

// TS performance crash
// type $MAP_MUL_MAP<V extends $D> = {
//   0: 0;
//   1: $Add<$MAP_MUL_MAP<V>[0], V>;
//   2: $Add<$MAP_MUL_MAP<V>[1], V>;
//   3: $Add<$MAP_MUL_MAP<V>[2], V>;
//   4: $Add<$MAP_MUL_MAP<V>[3], V>;
//   5: $Add<$MAP_MUL_MAP<V>[4], V>;
//   6: $Add<$MAP_MUL_MAP<V>[5], V>;
//   7: $Add<$MAP_MUL_MAP<V>[6], V>;
//   8: $Add<$MAP_MUL_MAP<V>[7], V>;
//   9: $Add<$MAP_MUL_MAP<V>[8], V>;
//   [-1]: $NEG<$MAP_MUL_MAP<V>[1]>;
//   [-2]: $NEG<$MAP_MUL_MAP<V>[2]>;
//   [-3]: $NEG<$MAP_MUL_MAP<V>[3]>;
//   [-4]: $NEG<$MAP_MUL_MAP<V>[4]>;
//   [-5]: $NEG<$MAP_MUL_MAP<V>[5]>;
//   [-6]: $NEG<$MAP_MUL_MAP<V>[6]>;
//   [-7]: $NEG<$MAP_MUL_MAP<V>[7]>;
//   [-8]: $NEG<$MAP_MUL_MAP<V>[8]>;
//   [-9]: $NEG<$MAP_MUL_MAP<V>[9]>;
// };

// type $Mul<X extends $D, Y extends $D> = $MAP_MUL_MAP<X>[Y];
// type A = $Mul<2, 3> // 6

type $BOOL = 1 | 0; // True & False

type $AND<X extends $BOOL, Y extends $BOOL> = {
  0: 0;
  1: X;
}[Y];

type $OR<X extends $BOOL, Y extends $BOOL> = {
  0: Y;
  1: 1;
}[X];

type $NOT<X extends $BOOL> = {
  0: 1;
  1: 0;
}[X];

type $IFELSE<B extends $BOOL, IF, ELSE> = {
  1: IF;
  0: ELSE;
}[B];

// equal to zero
type $EQZ<X extends $D> = {
  [-9]: 0;
  [-8]: 0;
  [-7]: 0;
  [-6]: 0;
  [-5]: 0;
  [-4]: 0;
  [-3]: 0;
  [-2]: 0;
  [-1]: 0;
  0: 1;
  1: 0;
  2: 0;
  3: 0;
  4: 0;
  5: 0;
  6: 0;
  7: 0;
  8: 0;
  9: 0;
}[X];

// less than zero
type $LTZ<X extends $D> = {
  [-9]: 1;
  [-8]: 1;
  [-7]: 1;
  [-6]: 1;
  [-5]: 1;
  [-4]: 1;
  [-3]: 1;
  [-2]: 1;
  [-1]: 1;
  0: 0;
  1: 0;
  2: 0;
  3: 0;
  4: 0;
  5: 0;
  6: 0;
  7: 0;
  8: 0;
  9: 0;
}[X];

// grater than zero
type $GTZ<X extends $D> = $NOT<$OR<$EQZ<X>, $LTZ<X>>>;

type $EQ<X extends $D, Y extends $D> = $IFELSE<
  $OR<$AND<$GTZ<X>, $GTZ<Y>>, $AND<$LTZ<X>, $LTZ<Y>>>,
  $EQZ<$Sub<X, Y>>,
  0
>;

type $GT<X extends $D, Y extends $D> = $IFELSE<
  $OR<$AND<$GTZ<X>, $GTZ<Y>>, $AND<$LTZ<X>, $LTZ<Y>>>,
  $GTZ<$Sub<X, Y>>,
  $IFELSE<$AND<$GTZ<X>, $LTZ<Y>>, 1, 0>
>;

type $LT<X extends $D, Y extends $D> = $NOT<$OR<$GT<X, Y>, $EQ<X, Y>>>;

type $Addc<X extends $D, Y extends $D> = [$LT<$Add<X, Y>, X>, $Add<X, Y>];

//type Digital = `${number}`;
// string to digital array
// type G<T extends Digital> = T extends `${infer U1}${infer U2}${infer U3}`
//   ? [U1, U2, U3]
//   : [0, 0, 0];

type Tick<V, R> = {
  Value: V;
  Fin: $BOOL;
  Return: R;
  Register_1: $D;
};

type Context<I, V, R> = {
  Fin: $BOOL;
  currTick: $D;
  Input: I;
  Return: R;
  Prev1Value: V;
  Prev2Value: V;
  Prev3Value: V;
  Register_1: $D;
};

type Functions = "reduce_sum" | "fibonacci";

type ReduceSum<Ctx extends Context<$D, $D, string>> = {
  Value: $IFELSE<
    $EQZ<Ctx["currTick"]>,
    1,
    $Add<Ctx["Prev1Value"], $Add<Ctx["currTick"], 1>>
  >;

  Return: $IFELSE<
    Ctx["Fin"],
    $IFELSE<
      $GTZ<Ctx["Register_1"]>,
      `${Ctx["Register_1"]}${Ctx["Prev1Value"]}`,
      `${Ctx["Prev1Value"]}`
    >,
    Ctx["Return"]
  >;

  Fin: $EQ<$Add<Ctx["currTick"], 1>, Ctx["Input"]>;

  Register_1: $IFELSE<
    $LTZ<$Sub<ReduceSum<Ctx>["Value"], Ctx["Prev1Value"]>>,
    $Add<Ctx["Register_1"], 1>,
    Ctx["Register_1"]
  >;
};

type Fibonacci<Ctx extends Context<$D, $D, string>> = {
  Value: $IFELSE<
    $LT<Ctx["currTick"], 2>,
    1,
    $Add<Ctx["Prev1Value"], Ctx["Prev2Value"]>
  >;

  Return: $IFELSE<
    $EQZ<Ctx["currTick"]>,
    `${Fibonacci<Ctx>["Value"]}`,
    $IFELSE<
      Ctx["Fin"],
      `${Ctx["Return"]}`,
      $IFELSE<
        $Addc<Ctx["Prev1Value"], Ctx["Prev2Value"]>[0],
        `${Ctx["Return"]}, ${Ctx["Register_1"]}${Fibonacci<Ctx>["Value"]}`,
        `${Ctx["Return"]}, ${Fibonacci<Ctx>["Value"]}`
      >
    >
  >;

  Fin: $EQ<$Add<Ctx["currTick"], 1>, Ctx["Input"]>;

  Register_1: $IFELSE<
    $Addc<Ctx["Prev1Value"], Ctx["Prev2Value"]>[0],
    $Add<Ctx["Register_1"], 1>,
    Ctx["Register_1"]
  >;
};

type FunctionTable<Ctx extends Context<any, any, any>> = {
  fibonacci: Fibonacci<Ctx>;
  reduce_sum: ReduceSum<Ctx>;
};

type Gerof<T, P extends Functions> = T extends FunctionTable<infer U>[P]
  ? U
  : T;

type _Recursion<
  funcid extends Functions,
  Ctx extends Context<any, any, any>,
  MaxLoop extends $D
> = {
  [-9]: Ctx["Return"];
  [-8]: Ctx["Return"];
  [-7]: Ctx["Return"];
  [-6]: Ctx["Return"];
  [-5]: Ctx["Return"];
  [-4]: Ctx["Return"];
  [-3]: Ctx["Return"];
  [-2]: Ctx["Return"];
  [-1]: Ctx["Return"];
  0: Ctx["Return"];
  9: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  8: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  7: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  6: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  5: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  4: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  3: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  2: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
  1: $IFELSE<
    Ctx["Fin"],
    FunctionTable<Ctx>[funcid]["Return"],
    _Recursion<
      funcid,
      {
        currTick: $Add<Ctx["currTick"], 1>;
        Input: Ctx["Input"];
        Prev3Value: Ctx["Prev2Value"];
        Prev2Value: Ctx["Prev1Value"];
        Prev1Value: FunctionTable<Ctx>[funcid]["Value"];
        Fin: FunctionTable<Ctx>[funcid]["Fin"];
        Return: FunctionTable<Ctx>[funcid]["Return"];
        Register_1: FunctionTable<Ctx>[funcid]["Register_1"];
      },
      $Sub<MaxLoop, 1>
    >[$Sub<MaxLoop, 1>]
  >;
};

type Call<funcid extends Functions, Arg extends $D> = _Recursion<
  funcid,
  {
    currTick: 0;
    Input: Arg;
    Prev1Value: 0;
    Prev2Value: 0;
    Prev3Value: 0;
    Fin: 0;
    Return: "";
    Register_1: 0;
    Register_2: 0;
    Register_3: 0;
  },
  9
>[9];

// Math
type DEMO1 = $Add<3, 4>; // 7
type DEMO2 = $Sub<9, 2>; // 7
type DEMO3 = $Sub<4, 7>; // -3

// Logical
type DEMO_4_gt_5 = $GT<4, 5>; // 0
type DEMO_6_gt_3 = $GT<6, 3>; // 1
type DEMO_4_lt_5 = $LT<4, 5>; // 1
type DEMO_6_lt_3 = $LT<6, 3>; // 0

type DEMO_0_eq_0 = $EQZ<0>; // 1
type DEMO_1_eq_0 = $EQZ<1>; // 0
type DEMO_and = $AND<DEMO_0_eq_0, DEMO_1_eq_0>; // 0
type DEMO_or = $OR<DEMO_0_eq_0, DEMO_1_eq_0>; // 1

// reduce_sum
type DEMO_reduce_sum_2 = Call<"reduce_sum", 2>; // 1 + 2 = 3
type DEMO_reduce_sum_3 = Call<"reduce_sum", 3>; // 1 + 2 + 3 = 6
type DEMO_reduce_sum_5 = Call<"reduce_sum", 5>; // 1 + 2 + 3 + 4 = 10

type DEMO_reduce_sum_6 = Call<"reduce_sum", 6>; // 1 + 2 + 3 + 4 + 5 + 6 = 21

// fibonacci
type DEMO_fibonacci_4 = Call<"fibonacci", 4>; // 1, 1, 2, 3
type DEMO_fibonacci_6 = Call<"fibonacci", 6>; // 1, 1, 2, 3, 5, 8
type DEMO_fibonacci_7 = Call<"fibonacci", 7>; // 1, 1, 2, 3, 5, 8, 13

type DEMO_fibonacci_8 = Call<"fibonacci", 8>; // 1, 1, 2, 3, 5, 8, 13, 21
