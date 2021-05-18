"use strict";
// 泛型
// * 注意：无法创建泛型枚举和泛型命名空间
// 1. 泛型函数和泛型函数的类型
// 泛型函数
function Generic(arg) {
    return arg;
}
// 2. 泛型类
// 泛型类类型 {new(props:type):className<type>} / new (props:type)=>className<type>
class GenericNumber {
    constructor(value) {
        this.add = (x, y) => {
            return x;
        };
        this.zeroValue = value;
    }
}
class MyNumber {
    constructor(value) {
        this.zeroValue = value;
    }
    add(x, y) {
        return x;
    }
}
const element = MyNumber;
function getLength(arg) {
    return arg.length;
}
//
