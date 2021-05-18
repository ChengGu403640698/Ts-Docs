// 泛型
// * 注意：无法创建泛型枚举和泛型命名空间

// 1. 泛型函数和泛型函数的类型

// 泛型函数
function Generic<T>(arg: T): T {
    return arg;
}
// 泛型函数的类型
type GenericType1 = <T>(arg: T) => T;
type GenericType2 = typeof Generic;

// 2. 泛型类
// 泛型类类型 {new(props:type):className<type>} / new (props:type)=>className<type>
class GenericNumber<T> {
    zeroValue: T;

    constructor(value: T) {
        this.zeroValue = value;
    }
    add: (x: T, y: T) => T = (x: T, y: T) => {
        return x;
    }
}
class MyNumber {
    zeroValue: number;

    constructor(value: number) {
        this.zeroValue = value;
    }
    add(x: number, y: number) {
        return x;
    }
}
type GenericNumberType = { new(value: number): GenericNumber<number> };
const element: GenericNumberType = MyNumber;
// 3. 泛型约束
// 约束当前使用的泛型T具有某一些属性
interface Length {
    length: number;
}
function getLength<T extends Length>(arg: T): number {
    return arg.length;
}


//