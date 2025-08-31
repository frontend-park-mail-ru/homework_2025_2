'use strict';

/**
 * Функция фильтрует объект и возвращает новый объект с указанными ключами
 * @param {object} originalObject - исходный объект
 * @param {Array<string>} keysToFilter - массив ключей
 * 
 * @example
 * const originalObject = { a: 1, b: 2, c: 3 };
 * const keysToFilter = ['a', 'c'];
 * const result = filterObjectByKeys(originalObject, keysToFilter);
 * //returns { a: 1, c: 3 }
 * 
 * @returns {object}
 */
const filterObjectByKeys = (originalObject, keysToFilter) => {
    if(typeof originalObject !== 'object' || originalObject === null || !Array.isArray(keysToFilter)){
        return {};
    }

    return keysToFilter.reduce((result, key) => {
        if (Object.hasOwn(originalObject, key)) {
            result[key] = originalObject[key];
        }
        return result;
    }, {});

};
