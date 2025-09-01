'use strict';

/**
 * Функция, вычисляющая факториал числа
 * @param {Number} n - число
 * 
 * @example
 * // returns 120
 * factorial(5);
 * @example
 * // throws Error
 * factorial(-1);
 * 
 * @throws {Error} Факториал определен только для целых неотрицательных чисел
 * @returns {Number}
 */
const factorial = (n) => {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Факториал определен только для целых неотрицательных чисел");
    }
    let answer = 1;
    for (let i = 2; i <= n; i++) {
        answer *= i;
    }
    return answer;
}
