/**
 * Функция, создающая глубокую копию значения
 * @param {*} obj - исходное значение
 * 
 * @example
 * // returns { a: 1, b: { c: 2 } }
 * deepClone({ a: 1, b: { c: 2 } });
 * 
 * @example
 * // returns [1, [2, 3]]
 * deepClone([1, [2, 3]]);
 * 
 * @example
 * // returns "hello"
 * deepClone("hello");
 * 
 * @returns {*} - глубокая копия исходного значения
 */
const deepClone = function(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }

    if (obj instanceof Set) {
        const clonedSet = new Set();
        obj.forEach(value => clonedSet.add(deepClone(value)));
        return clonedSet;
    }

    if (obj instanceof Map) {
        const clonedMap = new Map();
        obj.forEach((value, key) => clonedMap.set(deepClone(key), deepClone(value)));
        return clonedMap;
    }

    const clonedObj = {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    return clonedObj;
};