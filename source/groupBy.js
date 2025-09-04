/**
 * Функция должна возвращать объект, где ключи — это уникальные значения по указанному полю, а значения — массивы объектов, соответствующих этим ключам.
 * @param {Array.<Object>} data - Массив объектов для группировки
 * @param {string} key - Ключ
 * @returns {Object.<string, Array.<Object>>} Объект, где ключи - уникальные значения указанного поля, а значения - массивы объектов с соответствующими значениями
 * @example
 * const data = [
 *          { id: 1, category: 'fruit', name: 'apple' },
 *          { id: 2, category: 'fruit', name: 'banana' },
 *          { id: 3, category: 'fruit', name: 'orange' }
 *      ];
 * 
 * const result = groupBy(data, 'category');
 * // result: {
 * //   fruit: [
 * //           { id: 1, category: 'fruit', name: 'apple' },
 * //           { id: 2, category: 'fruit', name: 'banana' },
 * //           { id: 3, category: 'fruit', name: 'orange' }
 * //    ]
 * // }
 */
const groupBy = (data, key) => data.reduce((res, item) => ((res[item[key]] = res[item[key]] || []).push(item), res), {});
