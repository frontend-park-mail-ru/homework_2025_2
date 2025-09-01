'use strict';

/**
 * Вычисляет факториал числа
 * @param {Number} n - число для вычисления факториала
 * 
 * 
 * @example
 * // returns 120
 * factorial(5);
 * 
 * @throws {Error} Если число не является неотрицательным или ввёден нечисловой тип данных
 * @returns {Number}
 */
const factorial = n => {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error('Факториал определен только для целых неотрицательных чисел');
    }
    
    if ((n == 0) || (n == 1)) {
        return 1
    }
    return n * factorial(n-1)
};
