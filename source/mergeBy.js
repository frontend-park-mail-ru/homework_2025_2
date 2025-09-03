'use strict';

/**
 * Функция, объединяющая два массива объектов по заданному ключу
 * @param {Array<Object>} objects1 - первый массив объектов
 * @param {Array<Object>} objects2 - второй массив объектов
 * @param {String} keyPooling - ключ, по которому происходит объединение
 * 
 * @example
 * // returns [{ id: 1, name: "Ilya", age: 20}, {id: 2, name "Petya"}]
 * mergeBy([{ id: 1, name: "Ilya"}, {id: 2, name: "Petya"}],
 * [{ id: 1, age: 20}], 
 * "id");
 * 
 * @returns {Array<Object>}
 */
function mergeBy(objects1, objects2, keyPooling) {
    let map = new Map();
    
    const mergeObjects = function(obj1, obj2) {
        const result = { ...obj1 };
        
        for (let key in obj2) {
            if (key in obj2) {
                if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
                    result[key] = [...obj1[key]];
                    obj2[key].forEach(item => {
                        if (!result[key].includes(item)) {
                            result[key].push(item);
                        }
                    });
                } else {
                    result[key] = obj2[key];
                }
            }
        }
        return result;
    };

    const processArray = function(objects){
        for (const item of objects){
            if (!(keyPooling in item)){
                continue
            }
            if (map.has(item[keyPooling])){
                map.set(item[keyPooling], mergeObjects(map.get(item[keyPooling]), item))
            } else{
                map.set(item[keyPooling], {...item})
            }
        }
    }
    
    processArray(objects1);
    processArray(objects2);
    return Array.from(map.values())
}