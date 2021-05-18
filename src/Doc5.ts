// 函数
// 函数的类型定义

import { couldStartTrivia } from "typescript";

// 函数的重载
type FunType1 = (number0: string, number1: number) => void
interface FunType2 {
    (number1: string, number2: string): void;
}
namespace FunType1 {
    a: 1;
    b: [2, 3, 4];
}

const fun1: FunType1 = (x, y) => { };
const fun2: FunType2 = (x, y) => { };
console.dir(fun1, fun2);
function Reload(x: number, y: string): void;
function Reload(x: string, y: string): number;
function Reload(x: any, y: string): any {
    if (typeof x === 'string') {
        return 2;
    } else {
        console.log("2");
    }
}