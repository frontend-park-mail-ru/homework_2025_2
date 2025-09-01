'use strict';

/**
 * Функция, разделяющая массив на два подмассива в зависимости от предиката.
 *
 * @template T
 * @param {T[]} arr - Исходный массив элементов.
 * @param {(item: T) => boolean} func - Предикат, для проверки элементов массива.
 * @returns {[T[], T[]]} Массив из двух массивов:
 * - первый содержит элементы, для которых предикат вернул true,
 * - второй содержит элементы, для которых предикат вернул false.
 *
 * @example
 * partition([1, 2, 3, 4], n => n % 2 === 0);
 * // returns: [[2, 4], [1, 3]]
 */

const partition = function (arr, func) {
    const filtered_arr = arr.filter(func); 
    const not_in_filtered = arr.filter(item => !func(item));
    
    return [filtered_arr, not_in_filtered];
};
