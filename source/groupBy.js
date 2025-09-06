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
function groupBy(array, key) {
    if (!Array.isArray(array)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }
    
    const result = {};
    
    for (const item of array) {
        const groupValue = item[key];
        
        if (groupValue === undefined || groupValue === null) {
            continue;
        }
        
        const groupKey = groupValue;
        
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
    }
    
    return result;
}