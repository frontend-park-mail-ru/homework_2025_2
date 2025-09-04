'use strict'

/**
 * Функция принимает число n и генерирует первые n чисел ряда Фибоначчи
 * @param {number} number - число
 * 
 * @example
 * // returns [0, 1, 1]
 * fibonacciGenerator(3)
 * 
 * @returns {number[]} - массив чисел
 */
const fibonacciGenerator = number => {
    let fibonacci = []
    if (number == 1) fibonacci.push(0);
    else if (number > 2) {
        fibonacci.push(0,1)
        for(let i = 2; i < number; i++) 
            fibonacci.push(fibonacci[i-1] + fibonacci[i-2])
    }
    return fibonacci
}
