# typescript-computer

Computations with typescrip types  🪄

<img width="527" alt="截屏2022-05-21 下午10 03 54" src="https://user-images.githubusercontent.com/15227926/169655241-95984c37-b0eb-4739-97be-7a1815af8b54.png">

<img width="814" alt="截屏2022-05-21 下午10 03 04" src="https://user-images.githubusercontent.com/15227926/169655253-2de6e16a-aa99-49d6-82d9-e2ccf8d8157c.png">

<img width="849" alt="截屏2022-05-21 下午10 03 25" src="https://user-images.githubusercontent.com/15227926/169655263-b74fc6b7-fd25-41d0-afa0-269bbf72e06f.png">


## Math

```ts
type DEMO1 = $Add<3, 4>; // 7
type DEMO2 = $Sub<9, 2>; // 7
type DEMO3 = $Sub<4, 7>; // -3
```

## Logical

```ts
type DEMO_4_gt_5 = $GT<4, 5>; // 0
type DEMO_6_gt_3 = $GT<6, 3>; // 1
type DEMO_4_lt_5 = $LT<4, 5>; // 1
type DEMO_6_lt_3 = $LT<6, 3>; // 0
```

```ts
type DEMO_0_eq_0 = $EQZ<0>; // 1
type DEMO_1_eq_0 = $EQZ<1>; // 0
type DEMO_and = $AND<DEMO_0_eq_0, DEMO_1_eq_0>; // 0
type DEMO_or = $OR<DEMO_0_eq_0, DEMO_1_eq_0>; // 1
```

## Functions

### reduce_sum

```ts
type DEMO_reduce_sum_2 = Call<"reduce_sum", 2>; // 1 + 2 = 3
type DEMO_reduce_sum_3 = Call<"reduce_sum", 3>; // 1 + 2 + 3 = 6
type DEMO_reduce_sum_5 = Call<"reduce_sum", 5>; // 1 + 2 + 3 + 4 = 10
type DEMO_reduce_sum_6 = Call<"reduce_sum", 6>; // 1 + 2 + 3 + 4 + 5 + 6 = 21
```

### fibonacci

```ts
type DEMO_fibonacci_4 = Call<"fibonacci", 4>; // 1, 1, 2, 3
type DEMO_fibonacci_6 = Call<"fibonacci", 6>; // 1, 1, 2, 3, 5, 8
type DEMO_fibonacci_7 = Call<"fibonacci", 7>; // 1, 1, 2, 3, 5, 8, 13
type DEMO_fibonacci_8 = Call<"fibonacci", 8>; // 1, 1, 2, 3, 5, 8, 13, 21
```
