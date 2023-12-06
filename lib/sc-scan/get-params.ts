/**
 * From a function method get all the params in solidity format
 * @param method 
 * @returns string[] of params
 */
export const getParams = (method: string): string[] => {
    const openParenIndex = method.indexOf('(');
    const closeParenIndex = method.length;

    const params = method.slice(openParenIndex + 1, closeParenIndex - 1);
    let dupParam = method.slice(openParenIndex + 1, closeParenIndex - 1);

    let ret: string[] = [];
    for (let i = 0; i < params.length; i++) {
        if (params[i] === "(") {
            // Need to look for its closing bracker
            let stack = 1;
            for (let j = i + 1; j < params.length; j++) {
                if (stack === 0) {
                    ret.push(params.slice(i, j));
                    i = j;
                    break;
                }
                if (params[j] === "(") {
                    stack++;
                } else if (params[j] === ")") {
                    stack--;
                    if (stack === 0 && j === params.length - 1) {
                        // This special case is for the last param
                        ret.push(params.slice(i, j + 1));
                        i = j;
                        break;
                    }
                }
            }
        }
    }

    ret.sort((a, b) => a.length - b.length).forEach((param) => {
        dupParam = dupParam.replace(param, "tuple");
    });

    return dupParam.split(',');
}
