// Type convert
type DEMO0 = $$Number<"8">["value"]; // 8
type DEMO00 = $$Number<8>["print"]; // "8"

// Math
type DEMO1 = $Add<3, 4>["print"]; // 7
type DEMO2 = $Subtract<9, 2>["print"]; // 7
type DEMO3 = $Subtract<4, 7>["print"]; // -3
type DEMO4 = $Multiply<4, 8>["print"]; // 32
type DEMO6 = $Divide<24, 3>["print"]; // 8

// Logical
type DEMO_4_gt_5 = $GT<4, 5>; // 0
type DEMO_6_gt_3 = $GT<6, 3>; // 1
type DEMO_4_lt_5 = $LT<4, 5>; // 1
type DEMO_6_lt_3 = $LT<6, 3>; // 0

type DEMO_0_eq_0 = $EQZ<0>; // 1
type DEMO_1_eq_0 = $EQZ<1>; // 0
type DEMO_and = $AND<DEMO_0_eq_0, DEMO_1_eq_0>; // 0
type DEMO_or = $OR<DEMO_0_eq_0, DEMO_1_eq_0>; // 1

// Functions

// fibonacci
type Fibonacci<
  I extends number,
  Prev1 extends number = 1,
  Prev2 extends number = 0,
  Result extends string = "1"
> = I extends 0 | 1
  ? Result
  : I extends number
  ? Fibonacci<
      $Subtract<I, 1>["value"],
      $Add<Prev1, Prev2>["value"],
      Prev1,
      `${Result}, ${$Add<Prev1, Prev2>["value"]}`
    >
  : 0;

type F0 = Fibonacci<10>; // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

// reduceSum
type ReduceSum<
  X extends number,
  I extends number = 0,
  Result extends number = 0
> = I extends $Add<X, 1>["value"]
  ? Result
  : ReduceSum<X, $Add<I, 1>["value"], $Add<Result, I>["value"]>;

type R3 = ReduceSum<3>; // 1 + 2 + 3  = 5
type R4 = ReduceSum<4>; // 1 + 2 + 3 +  5 = 10
type R13 = ReduceSum<12>; // 78
type Calc13 = $Divide<$Multiply<$Add<1, 12>, 12>, 2>["value"]; // (x + 1) * x / 2 = 78

// Todo，不支持传递高阶范形，通过指令实现，设计寄存器系统，指令系统，寻址系统
