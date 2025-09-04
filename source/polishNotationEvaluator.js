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
 * @throws {Error} Throws error if the input is invalid or expression cannot be evaluated.
 */
const polishNotationEvaluator = str => {
    if (typeof str !== 'string' || !str){
        throw new Error('Input must be a non-empty string');
    }

    // Split the expression into tokens, ignoring whitespace
    const stackResult = str.split(' ').reverse().reduce((stack, token) => {
        // Ignore empty tokens
        if (token === '') {
            return stack;
        }

        // Iterate the expression in reverse order
        // On numeric tokens, push them on the stack
        // On operators, apply them to the last two elements of the stack
        if (!isNaN(Number(token))) {
            stack.push(Number(token));
        } else {
            const a = stack.pop();
            const b = stack.pop();
            if (a === undefined || b === undefined) {
                throw new Error("Not enough operands given");
            }

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
                    if (b === 0) {
                        throw new Error('Division by zero');
                    }
                    stack.push(a / b);
                    break;
                default:
                    // Unknown token
                    throw new Error(`Unknown token: ${token}`);
                }
            }
            return stack;
        }
    , []);

    // Check for remaining operands
    if (stackResult.length !== 1) {
        throw new Error('Too many values. Result cannot be calculated');
    }

    // Check for numeric result
    const numericResult = stackResult.pop();

    if (isNaN(numericResult)) {
        throw new Error('Result is not a number');
    }
    return numericResult;
};  