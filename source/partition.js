'use strict';

/**
 * Разбивает массив на два подмассива по предикату.
 *
 * @template T
 * @param {Array<T>} arr Массив элементов для разделения.
 * @param {(value: T) => boolean} predicate
 *        Функция-предикат, принимающая элемент массива,
 *        должна возвращать логическое значение (`true`/`false`).
 * @returns {Array<Array<T>>} Двумерный массив: `[matching, nonMatching]`.
 *
 * @example
 * // Разделить числа на чётные и нечётные
 * const [evens, odds] = partition([1,2,3,4], n => n % 2 === 0);
 * // evens => [2,4], odds => [1,3]
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