//const exp =" 93 * 30 / 81 * (  78 * 83 / (  71 * 13 - (  14 + 13 - 28 * 62  ) * 62  ) + 99 - (  80 - 89 + 17 * 42  )  ) ";

const exp = "10/2"

let res;

const del_spaces = (ex) => ex.replace(' ', '');

const simple = (expr) => {
    const div = (ex) => ex.toString().split('/').reduce((a,b) => {
        if (parseFloat(b) === 0) throw "TypeError: Devision by zero."
        return parseFloat(a)/parseFloat(b) 
    })

    const mul = (ex) => ex.toString().split('*').length > 1 ? ex.toString().split('*')
                        .reduce((a,b) => parseFloat(div(a))*parseFloat(div(b))) : div(ex);

    const sub = (ex) => ex.toString().split('&').length > 1 ? ex.toString().split('&')
                        .reduce((a,b)=> parseFloat(mul(a))-parseFloat(mul(b))) : mul(ex);

    const sum = (ex) => ex.toString().split('+').length > 1 ? ex.toString().split('+')
                        .reduce((a,b) => parseFloat(sub(a))+parseFloat(sub(b))) : sub(ex);
    console.log(`expr in simple = ${expr}`)
    return sum(expr)
}

const bracket_check = (ex) => {
    console.log(ex.indexOf('('));
    console.log(ex.indexOf(')'));   
    if (ex.indexOf('(') < 0 && ex.indexOf(')') < 0) {
        return false
    }
    if (ex.indexOf('(') >= 0 && ex.indexOf(')') >= 0) {
        return true
    }
}

const slice_string = (str, len) => {
    console.log(`slice_string starts`)
    let start_pad = str.lastIndexOf('(');
    let substr = str.slice(start_pad, len);
    let end_pad = substr.indexOf(')');
    let pad = str.slice(start_pad +1, start_pad + end_pad);
    console.log(`pad = ${pad}`)
    let time_string = str.replace(`(${pad})`, simple(pad).toString());
    console.log(`time_string = ${time_string}`)
    if (bracket_check(time_string)) {
        return slice_string(time_string, time_string.length);
    }
    else {
        console.log(`time_string in recur = ${time_string}`)
        return simple(time_string)
    }
}

let str = del_spaces(exp.replace(/-/g,'&'));
console.log(`str in beginning = ${str}`)
let len = str.length
res = bracket_check(str) ? slice_string(str, len) : simple(str);

console.log(res)
