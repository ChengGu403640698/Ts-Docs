// 接口
interface inter {
    readonly prop1: string;
    prop2?: number;
    [props: string]: any;
}
type ReadonlyInter = Readonly<inter>;
let a: ReadonlyInter = {
    prop1: "gucheng",
    prop2: 18,
    prop3: 20,
}

// ReadonlyArray<number>
const arrayA: ReadonlyArray<number> = [1, 2, 4];
export {}

