'use strict';

/**
 * Функция, объединяющая два массива объектов по заданному ключу
 * @param {Array<Object>} objects1 - первый массив объектов
 * @param {Array<Object>} objects2 - второй массив объектов
 * @param {String} keyPooling - ключ, по которому происходит объединение
 * 
 * @throws {Error} если objects1 не является массивом
 * @throws {Error} если objects2 не является массивом
 * @throws {Error} если keyPooling не является строкой
 * 
 * @example
 * // returns [{ id: 1, name: "Ilya", age: 20}, {id: 2, name "Petya"}]
 * mergeBy([{ id: 1, name: "Ilya"}, {id: 2, name: "Petya"}],
 * [{ id: 1, age: 20}], 
 * "id");
 * 
 * @returns {Array<Object>}
 */
const mergeBy = (objects1, objects2, keyPooling) => {
    if (!Array.isArray(objects1)){
        throw new Error("objects1 must be an array")
    }
    if (!Array.isArray(objects2)){
        throw new Error("objects2 must be an array")
    }
    if (typeof keyPooling !== "string"){
        throw new Error("keyPooling must be a string")
    }
    const map = new Map();

    /**
     * Функция, которая обрабатывает массив объектов, объединяя объекты с одинаковыми значениями keyPooling.
     *
     * @param {Array<Object>} objects - массив объектов для обработки
     * @param {String} keyPooling - ключ, используемый для группировки и объединения объектов. Должен быть определен в контексте вызова функции.
     * @param {Map<Object, Object>} map - словрь, используемый для хранения и обновления объединенных объектов. Должен быть определен в контексте вызова функции.
    */
    const processArray = (objects) => {
        for (const item of objects){
            if (!(keyPooling in item)){
                continue;
            }

            const keyValue = item[keyPooling];
            if (map.has(keyValue)){
                map.set(keyValue, mergeObjects(map.get(keyValue), item));
            } else{
                map.set(keyValue, {...item});
            }
        }
    }

    processArray(Array.prototype.concat(objects1, objects2));
    return Array.from(map.values());
}

/**
 * Функция, объединяющая два объекта, добавляя свойства из source в target.
 * Если оба объекта содержат одинаковое свойство, являющееся массивом, то массивы объединяются в один массив без дупликатов.
 * В противном случае остаётся свойство target
 * @param {Object} target - объект, в который будут добавлены свойства. Этот объект изменяется
 * @param {Object} source - объект, из которого будут взяты свойства
 * 
 * @example
 * // returns { id: 1, name: "Ilya", age: 20}
 * mergeObjects({ id: 1, name: "Ilya"}, { id: 1, age: 20})
 * 
 * @returns {Object}
 */
const mergeObjects = (target, source) => {
    for (const key in source) {
        if (key in target) {
            if (Array.isArray(target[key]) && Array.isArray(source[key])) {
                source[key].forEach(item => {
                    if (!target[key].includes(item)) {
                        target[key].push(item);
                    }
                });
            }
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
