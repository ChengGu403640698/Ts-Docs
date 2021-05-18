// 枚举
enum Color { RED = 1, GREEN, BLUE }
// 枚举属性是不可修改的
// const枚举
// 所有的枚举量会在tsc编译后被直接替换成对应的值


// 外部枚举 **感觉暂时不是很明白外部枚举是什么
declare enum Enum {
    A = 1,
    B,
    C = 2
}
let res = Enum.B + Enum.A

