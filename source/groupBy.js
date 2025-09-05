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
 *   { id: 1, category: 'fruit' },
 *   { id: 2 }, // нет ключа category
 *   { id: 3, category: null }
 * ];
 * 
 * const result = groupBy(data, 'category');
 * // Результат:
 * // {
 * //   fruit: [{ id: 1, category: 'fruit' }],
 * //   undefined: [{ id: 2 }],
 * //   null: [{ id: 3, category: null }]
 * // }
 */
function groupBy(array, key) {
    if (!Array.isArray(array)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }
    
    const result = {};
    
    for (const item of array) {
        const groupValue = item[key];
        
        const groupKey = groupValue === undefined ? 'undefined' : 
                        groupValue === null ? 'null' : 
                        groupValue;
        
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
    }
    
    return result;
}
