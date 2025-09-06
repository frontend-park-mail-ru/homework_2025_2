'use strict';

/**
 * Функция, принимающая объект и возвращающая новый объект, содержащий только те ключи, которые имеют значения, отличные от null, undefined или пустой строки.
 * @param {Object} obj - подаваемый объект
 * 
 * @example
 * returns {name: "Андрей", country: "Россия"}
 * compressObject({name: "Андрей", age: null, city: "", country: "Россия", occupation: undefined});
 * 
 * @returns {Object} newObject - новый объект без null, undefined, "". 
 */
var compressObject = function (obj) {
    let newObj = {}
    for (const key in obj){
        if (obj[key] !== null && obj[key]!==undefined && obj[key] !== ""){
            newObj[key] = obj[key]
        }
    }
    console.log("ГЕНА НА ВОТ ТВОЕ ПОЛОТЕНЦЕ", newObj)
    return newObj
}