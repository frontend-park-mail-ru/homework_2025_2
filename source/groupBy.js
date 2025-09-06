'use strict';

/**
 * Функция должна возвращать объект, где ключи — это уникальные значения по указанному полю, а значения — массивы объектов, соответствующих этим ключам.
 * 
 * @param {Array.<Object>} array - Массив объектов для группировки
 * @param {string} key - Ключ объекта, по которому производится группировка
 * @returns {Object.<string, Array.<Object>>} Объект, где ключи - значения указанного свойства,
 *                                           а значения - массивы объектов, сгруппированных по этому значению
 * @throws {TypeError} Если первый аргумент не является массивом
 * 
 * @example
 * // Группировка по категориям
 * const data = [
 *   { id: 1, category: 'fruit', name: 'apple' },
 *   { id: 2, category: 'fruit', name: 'banana' },
 *   { id: 3, category: 'vegetable', name: 'carrot' }
 * ];
 * 
 * const result = groupBy(data, 'category');
 * // Результат:
 * // {
 * //   fruit: [
 * //     { id: 1, category: 'fruit', name: 'apple' },
 * //     { id: 2, category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { id: 3, category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 * 
 * @example
 * // Обработка отсутствующих ключей и специальных значений
 * const data = [
 *   { id: 1, category: 'fruit', name: 'apple' },
 *   { id: 2 }, // нет ключа category → пропускается
 *   { id: 3, category: null, name: 'grape' } // null → пропускается
 * ];
 * 
 * const result = groupBy(data, 'category');
 * // Результат:
 * // {
 * //   fruit: [{ id: 1, category: 'fruit', name: 'apple' }]
 * // }
 */
const groupBy = (array, key) => {
    if (!Array.isArray(array)) throw new TypeError('Первый аргумент должен быть массивом');
    
    return array.reduce((acc, item) => {
        const groupValue = item[key];
        if (groupValue == null) return acc;
        
        (acc[groupValue] ||= []).push(item);
        return acc;
    }, {});
};