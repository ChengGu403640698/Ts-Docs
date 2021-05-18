// 类型推论
// 类型兼容
// 两个变量之间的赋值会根据属性可多不可少的原则进行赋值

interface Name {
    name: string;
}
let b = {
    name: "gucheng",
    age: 18,
};
let aaa: Name = b;
//  **** 注意，直接拿字面量赋值会报错
// let aaaa: Name;
// aaaa = {
//     name: "gucheng",
//     age: 18,
// }

//函数变量之间的赋值是根据
// 参数可少不可多
// 返回值对象属性可多不可少


//类之间的比较静态成员和构造函数不被比较，仅仅比较实例的成员
// example
namespace A {
    class Animal {
        static type = "animal"
        name: string;
        bark: string;
        constructor(name: string, bark: string) {
            this.name = name;
            this.bark = bark;
        }
    }
    class People {
        name: string;
        bark: string;
        constructor(name: string) {
            this.name = name;
            this.bark = "helloworld";
        }
    }
    let animal = new Animal("dog", "wolf");
    let person = new People("gucheng");
    animal = person;
    person = animal;
}
// 虽然这个例子中构造函数的类型不同但是不影响相互之间的赋值
// 假设在这个例子中有任意一个类有自己的属性（属性和原型函数）
// 就不能相互赋值