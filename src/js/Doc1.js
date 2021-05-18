"use strict";
// 基本类型
// 1. boolean / number(0x / 0b / 0o) / string /
// ** [], Array <**> / enum / any / void / null / 
// undefined / never / Object 
// 枚举类型
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
const color = 1;
// 2. 类型断言
// <type> / ** as type
let someValue = "this is a string";
let strLength = someValue.length;
