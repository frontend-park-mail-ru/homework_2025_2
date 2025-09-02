/************************************************************************
 * @file              : Evaluate a Polish notation expression
 * @author            : Федуков Александр Web-22 <https://t.me/sorrtory>
 ************************************************************************/

'use strict';

/**
 * Evaluates a Polish notation expression.
 *
 * @param {string} str String to be evaluated.
 * @returns {number} Result of the evaluation or NaN if expression is bad.
 */
const polishNotationEvaluator = str => {
    if (typeof str !== 'string' || !str) return NaN;

    // Split the expression into tokens, ignoring whitespace
    const tokens = str.split(' ').filter(token => token !== '');
    const stack = [];

    // Iterate the expression in reverse order
    // On numeric tokens, push them on the stack
    // On operators, apply them to the last two elements of the stack
    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];

        if (!isNaN(Number(token))) {
            stack.push(Number(token));
        } else {
            const a = stack.pop();
            const b = stack.pop();
            if (a === undefined || b === undefined) return NaN;

            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    // Check for division by zero
                    if (b === 0) return NaN;
                    stack.push(a / b);
                    break;
                default:
                    // Invalid token, return NaN
                    return NaN;
            }
        }
    }
    // Check for remaining operands
    if (stack.length !== 1) return NaN;

    // Check for numeric result
    const result = stack.pop();
    return !isNaN(result) ? result : NaN;
};  