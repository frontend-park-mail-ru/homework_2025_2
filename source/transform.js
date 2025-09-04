'use strict'

/**
 * Рекурсивно преобразует все примитивные значения в объекте с помощью функции преобразования
 * @template T
 * @param {T} obj - Объект для преобразования
 * @param {function(*): *} transformFn - Функция преобразования
 * 
 * @example
 * // returns { a: 2, b: { c: 3, d: 4 }, e: 5 }
 * transform({ a: 1, b: { c: 2, d: 3 }, e: 4 }, (value) => value + 1);
 * 
 * @returns {T}
 */

const transform = (obj, transformFn) => {
    
    for (const key in obj) {
        switch (typeof obj[key]) {
            case "object":
                obj[key] = transform(obj[key], transformFn)
                break
            case "array":
                for (let i = 0; i < length(obj[key]); i++) {
                    obj[key][i] = transformFn(obj[key][i])
                }
                break
            default: 
                obj[key] = transformFn(obj[key])
        }
    }

    return obj
}