'use strict';

/**
 * Функция для вычисления факториала числа n
 * @param {number} n - неотрицательное целое число
 * @throws {Error} Если n отрицательное или не целое число
 * @returns {number} Факториал числа n
 *
 * @example
 * factorial(5); // 120
 */

const factorial = n => {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Факториал определен только для целых неотрицательных чисел');
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
};