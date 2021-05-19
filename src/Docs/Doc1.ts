// 基本类型
// 1. boolean / number(0x / 0b / 0o) / string /
// ** [], Array <**> / enum / any / void / null / 
// undefined / never / Object 

// 枚举类型
enum Color {
    Red = 1,
    Green,
    Blue,
}
const color: Color = 1;

// 2. 类型断言
// <type> / ** as type
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

export {}
