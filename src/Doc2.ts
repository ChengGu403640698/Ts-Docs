// 变量声明
// 1. 尽可能的使用let /const 来代替 var
// 2. 解构赋值
// 给对象解构赋值的变量重命名
let { a: newA, b: newB }: { a: string, b: string } = { a: "a", b: "b" };
console.log(newA, newB)
newA = "A";
newB = "B";
console.log(newA, newB)