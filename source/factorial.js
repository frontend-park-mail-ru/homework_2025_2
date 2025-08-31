/**
 * Вычисляет факториал числа
 * @param {Number} n - число для вычисления факториала
 * 
 * @example
 * // throws Error
 * factorial(-1);
 * 
 * @example
 * // throws Error
 * factorial(abc);
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
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
};
