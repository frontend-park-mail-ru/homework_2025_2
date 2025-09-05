'use strict';

/**
 * Функция, вычисляющая результат выражения в польской нотации
 * @param {string} expression - выражение в польской нотации
 * 
 * @example
 * // returns 20
 * polishNotation("* + 2 3 4");
 * 
 * @returns {Number}
 */
const polishNotationEvaluator = expression => {
    if (typeof expression !== 'string' || expression.trim() === '') {
        throw new Error(`Invalid expression: ${expression}`);
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
                throw new Error('Not enough operands for operation');
            }

            const a = stack.pop();
            const b = stack.pop();
            const value = operations[token](a, b);

            if (isNaN(value)) {
                throw new Error('Result of operation must be a number');
            }

            stack.push(value);
        } else {
            const num = parseInt(token);

            if (isNaN(num)) {
                throw new Error('Invalid operand in expression');
            }
            
            stack.push(num);
        }
    }

    if (stack.length !== 1) {
        throw new Error('Too many operands in expression');
    }

    return stack[0];
};