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
    if (n === 0) {
        return 1;
    }
    return factorial(n - 1) * n;
}
