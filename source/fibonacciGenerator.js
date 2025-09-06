'use strict'

/**
 * Функция принимает число n и генерирует первые n чисел ряда Фибоначчи
 * @param {number} number - число
 * 
 * @example
 * // returns [0, 1, 1]
 * fibonacciGenerator(3)
 * 
 * @yields {number} - следующее число последовательности Фибоначчи
 */

function* fibonacciGenerator(number){
    if (number < 1 || typeof(number) != "number") return [];
    
    let a = 0;
    let b = 1;
    let tmp;
    for (let i = 0; i < number; i++){
        yield a;
        tmp = a;
        a = b;
        b = tmp + a;
    }
}
