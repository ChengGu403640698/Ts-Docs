"use strict";
// 类
// 成员修饰符： public / private / protected 
// readonly
// get set存取器
// 静态属性 static
// abstract抽象类和抽象方法
// 事实上 Class既是值又是类型 
// let MyClass: typeof Class = Class;
// let MyObj:  Class = new Class();
class Animal {
    constructor(name) {
        this.name = name;
    }
    move(distance = 0) {
        console.log('Father--move');
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    move(distance = 40) {
        super.move(distance);
        console.log(`Dog--move--${distance}`);
    }
}
class Sheep extends Animal {
    constructor(name) {
        super(name);
    }
    move(distance = 40) {
        super.move(distance);
        console.log(`Sheep--move--${distance}`);
    }
}
let animal = new Animal("animal");
animal.move();
let dog1 = new Dog("dog");
dog1.move();
let sheep1 = new Sheep("sheep");
sheep1.move();
//  默认情况下都是public可以被继承被实例访问
class Course {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class MathCourse extends Course {
    constructor(name, teacherName) {
        super(name);
        this.teacherName = teacherName;
    }
    getName() {
        return super.getName();
    }
    getTeacher() {
        return this.teacherName;
    }
}
class ScienceCourse extends Course {
    constructor(name, teacherName) {
        super(name);
        this.teacherName = teacherName;
    }
    getName() {
        return this.name;
    }
    getTeacher() {
        return this.teacherName;
    }
}
// 结论： protected都能保护在实例中属性不被暴露
// private还能保证在继承类中属性都不可见
// get set一般可以用于保护私有变量的修改和读取的函数
console.log(Object.keys(new ScienceCourse("science", "gc")));
