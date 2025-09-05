'use strict';

/**
 * Функция, вычисляющая результат выражения в польской нотации
 * @param {string} expression - выражение в польской нотацит
 * 
 * @example
 * // returns 20
 * polishNotation("* + 2 3 4");
 * 
 * @returns {Number}
 */
const polishNotationEvaluator = expression => {
    if (typeof expression !== 'string' || expression.trim() === '') {
        return NaN;
    }

    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            return b == 0 ? NaN : a / b;
        },
    };

    const tokens = expression.trim().split(' ');
    const stack = [];

    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];

        if (operations[token]) {
            if (stack.length < 2) {
                return NaN;
            }

            const a = stack.pop();
            const b = stack.pop();
            const value = operations[token](a, b);

            if (isNaN(value)) {
                return NaN;
            }

            stack.push(value);
        } else {
            const num = parseInt(token);

            if (isNaN(num)) {
                return NaN;
            }
            
            stack.push(num);
        }
    }

    return stack.length === 1 ? stack[0] : NaN;
};