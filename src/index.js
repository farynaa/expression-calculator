function eval() {
    // Do not use eval!!!
    return;
}

const div = (s) => {
    const splitted = s.toString().split('/');
    //console.log('div: ', s, splitted);
    let result;
    if (splitted.length === 1) {
        result = parseFloat(splitted[0]);
    }
    else {
        result = splitted.map(e => parseFloat(e)).reduce((c, v) => {
            if (v === 0) {
                throw "TypeError: Devision by zero."
            }
            else {
                return c / v;
            }
        });
    }
    //console.log('div res: ', result, typeof result, s);
    return result;
}

const mul = (s) => {
    //console.log('mul: ', s);
    const splitted = s.toString().split("*");
    let result;
    if (splitted.length === 1) {

        result = div(splitted[0])
        //console.log('???', splitted[0], typeof splitted[0], typeof result)
    }
    else {
        result = splitted.reduce((c, v) => div(c) * div(v));
    }
    return result;
}

const sum = (s) => {
    //console.log("sum: ", s);
    const splitted = s.toString().split('+');
    let result;
    if (splitted.length === 1) {
        result = sub(splitted[0])
    }
    else {
        result = splitted.reduce((c, v) => sub(c) + sub(v));
    }
    //console.log(s, ' sum res: ', result);
    return result;
}

const sub = (s) => {
    const ts = s.toString().split('/-').join('?').split('*-').join('!');
    const splitted = ts.toString().split('-').map(el => el.split('!').join('*-').split('?').join('/-'));
    //console.log('sub: ', s, splitted);
    if (splitted.length === 1) {
        return mul(splitted[0]);
    }

    if ((splitted.length === 2) && (splitted[0] === '')) {
        return -mul(splitted[1]);
    }

    else {
        if (splitted[0] === '') {
            //console.log('slice: ', splitted.slice(1), splitted);
            const result = splitted.slice(1).reduce((c, v) => {
                //console.log("c,v: ", c, v);
                return mul(c) - mul(v);
            }
                , 0);
            //console.log('result: ', result);
            return result;
        }
        else {
            return splitted.reduce((c, v) => {
                //console.log('c,v: ! ', c, v);
                return mul(c) - mul(v)
            });
        }
    }
}

const calcSimpleExpression = (expr) => {
    expr = expr.replace(/ /g, '').split('+-').join('-').split('--').join('+');
    return sum(expr);
}

const expressionCalculator = (inputExpr) => {
    const expr = inputExpr.split(' ').join('');
    const begin = expr.lastIndexOf('(')
    const end = expr.slice(begin).indexOf(')');
    const checkBrackets = expr.split('').reduce( (c,v) => {
        if (v === '(') {
            return c + 1
        }
        if (v === ')') {
            return c - 1
        }
        return c;
    },0);
    console.log(checkBrackets, begin, end, expr.slice(begin + 1, begin + end));
    if ((checkBrackets !== 0)) {
        throw "ExpressionError: Brackets must be paired";
    }
    if (end === -1 && begin !== -1) {
        throw "ExpressionError: Brackets must be paired";
    }
    let result;
    console.log('expr: ', expr.slice(begin + 1, end));
    if (begin >= 0 && end >= 0) {
        const slc = expr.slice(begin + 1, begin + end);
        const simpleResult = calcSimpleExpression(slc);
        //console.log('SR: ', simpleResult);
        result = expressionCalculator(expr.replace('(' + slc + ')', simpleResult.toString()));

    }
    else {
        result = calcSimpleExpression(expr);
    }
    console.log('result: ', result, typeof result);
    return result
}

//const exp = " 20 * 60 + 9 - (  89 * 95 * 3 * (  44 - 51 - 11 - (  62 + 69 - 22 + 21  ) * 9  ) / 50  ) - (  94 - 70 / 29 / 7  ) ";
//const exp = "1 + 2) * 3"
//console.log(expressionCalculator("20/(1-2)"));
//console.log(sub("5-2"))

//const r = sum("10/2*-10 + 1+5*-2");
//const r = expressionCalculator("62 + )69 - 22( + 21");
//console.log(r, typeof r);
//console.log(expressionCalculator(exp));

module.exports = {
    expressionCalculator
}