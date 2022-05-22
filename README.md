# typescript-computer

Computations with typescrip types 🪄

<img width="706" alt="截屏2022-05-23 上午1 28 02" src="https://user-images.githubusercontent.com/15227926/169707800-5812ba91-4f97-4a41-9b78-7d3fd77a61eb.png">


## Type Conversion

```ts
type DEMO0 = $$Number<"8">["value"]; // 8
type DEMO00 = $$Number<8>["print"]; // "8"
```

## Math

```ts
type DEMO1 = $Add<3, 4>["print"]; // 7
type DEMO2 = $Subtract<9, 2>["print"]; // 7
type DEMO3 = $Subtract<4, 7>["print"]; // -3
type DEMO4 = $Multiply<4, 8>["print"]; // 32
type DEMO6 = $Divide<24, 3>["print"]; // 8
```

## Logical

```ts
type DEMO_4_gt_5 = $GT<4, 5>; // 0
type DEMO_6_gt_3 = $GT<6, 3>; // 1
type DEMO_4_lt_5 = $LT<4, 5>; // 1
type DEMO_6_lt_3 = $LT<6, 3>; // 0

type DEMO_0_eq_0 = $EQZ<0>; // 1
type DEMO_1_eq_0 = $EQZ<1>; // 0
type DEMO_and = $AND<DEMO_0_eq_0, DEMO_1_eq_0>; // 0
type DEMO_or = $OR<DEMO_0_eq_0, DEMO_1_eq_0>; // 1
```

## Functions

### Fibonacci
```ts
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
```

### ReduceSum

```ts
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
```
