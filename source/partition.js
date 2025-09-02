'use strict';

/**
 * Разбивает массив на два подмассива по предикату
 * @param {Array<*>} arr Массив элементов для разделения
 * @param {function(*): boolean} predicate
 *        Функция-предикат, принимающая элемент массива и
 *        возвращающая логическое значение (`true`/`false`)
 *
 * @example
 * // Разделить числа на чётные и нечётные
 * const [evens, odds] = partition([1,2,3,4], n => n % 2 === 0);
 * // evens => [2,4], odds => [1,3]
 * 
 * @returns {Array<Array<*>>} Двумерный массив: `[matching, nonMatching]`
 */
function partition(arr, predicate) {
    const matching = [];
    const nonMatching = [];
    for (let elem of arr) {
        if (predicate(elem)) {
            matching.push(elem);
        } else {
            nonMatching.push(elem);
        }
    }
    return [matching, nonMatching];
}