'use strict';

/**
 * Принимает объект и возвращает новый объект, содержащий только те ключи, которые имеют значения,
 * отличные от null, undefined или пустой строки.
 *
 * @param {Object} obj - исходный объект
 * 
 * @example
 * // returns { name: "Андрей", country: "Россия" }
 * compressObject({ name: "Андрей", age: null, city: "", country: "Россия", occupation: undefined });
 * 
 * @returns {Object} result - новый объект без значений null, undefined, ""
*/
function compressObject(obj){
    let result = {};

    for (const key in obj){

        if(obj[key] !== null && obj[key] !== undefined && obj[key] !== ""){
            result[key] = obj[key];
        }
    }

    return result;
}
