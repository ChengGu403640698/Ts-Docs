// 区分对象的属性的类型
// 遍历对象属性的三种方式
// 1. for key in obj-- - 能查找所有可枚举的属性，包括原型链上的
// 2. Object.keys(obj)-- - 能查找自生可枚举的属性
// 3. Object.getOwnPropertyNames(obj)-- - 能查找包括可枚举和不可枚举的自身属性
class JS1 {
    c = 3
    constructor() {
        this.a = 1;
        this.b = 2;
    }
    print() {
        console.log("print");
    }
}
let js1obj = new JS1();
console.log(Object.keys(js1obj));
for (let key in js1obj) {
    console.log(key);
}
console.log(Object.getOwnPropertyNames(js1obj));