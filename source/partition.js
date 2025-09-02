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
 * @throws {TypeError} Если переданные аргументы не массив и функция.
 * 
 * @example
 * partition([1, 2, 3, 4], n => n % 2 === 0);
 * // returns: [[2, 4], [1, 3]]
 */

const partition = function (arr, func) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }
    if (typeof func !== 'function') {
        throw new TypeError('Второй аргумент должен быть функцией');
    }

    const passed = [];
    const not_passed = [];

    for (const item of arr) {
        if (func(item)) {
            passed.push(item);
        } else {
            not_passed.push(item);
        }
    }

    return [passed, not_passed];
};
