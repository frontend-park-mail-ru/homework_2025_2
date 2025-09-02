'use strict';

/**
 * Функция, которая принимает на вход массив объектов и строку, представляющую ключ, по которому нужно сгруппировать объекты.
 * @param {Array<Object>} data - массив объектов для группировки
 * @param {string} key - ключ объекта, по которому производится группировка
 * 
 * data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
 * 
 * @example
 *
 * groupBy(data);
 * //result: 
 * {
        fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 4, category: 'fruit', name: 'orange' }
            ],
        vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'lettuce' }
            ]
 * }
 *
 *           
 * @returns {Object}
 */

const groupBy = (data, key) => {
    return Object.groupBy(data, item => item[key]);
};