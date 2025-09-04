/**
 * Функция глубокой копии объекта
 * @param {*} obj - Объект, который нужно скопировать
 * @returns {*} Глубокая копия исходного объекта
 * 
 * @example
 * // returns копия объекта
 * const original = { a: 1, b: { c: 2 } };
 * const copied = deepClone(original);
 * 
 * @example
 * // returns копия объекта (вложенный массив)
 * const original = [1, 2, [3, 4]];
 * const copied = deepClone(original);
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }

    return obj;
}