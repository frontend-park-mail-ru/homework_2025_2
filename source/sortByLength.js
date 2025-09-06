'use strict';

/**
 * Функция, которая сортирует массив строк по длине. Если длина строк одинаковая, то функция сортирует строки по алфавиту. 
 * @param {string[]} array - массив строк для сортировки
 * 
 * @example
 * // returns ["tree", "tea", "garden", "orange", "sun"]
 * sortByLength(["sun", "tea", "tree", "garden", "orange"]);
 * 
 * @returns {string[]} - отсортированный массив
 */
const sortByLength = function(array) {
    return array.sort((a, b) =>
        a.length - b.length || a.localeCompare(b)
    );
}