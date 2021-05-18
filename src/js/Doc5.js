"use strict";
// 函数
// 函数的类型定义
Object.defineProperty(exports, "__esModule", { value: true });
var FunType1;
(function (FunType1) {
    a: 1;
    b: [2, 3, 4];
})(FunType1 || (FunType1 = {}));
const fun1 = (x, y) => { };
const fun2 = (x, y) => { };
console.dir(fun1, fun2);
function Reload(x, y) {
    if (typeof x === 'string') {
        return 2;
    }
    else {
        console.log("2");
    }
}
