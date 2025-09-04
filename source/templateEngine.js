'use strict';

/**
 * Извлекает значение из объекта по строковому пути
 * @param {string} variableName - Путь к свойству в формате 'ключ.вложенныйКлюч'
 * @param {Object} data - Объект, из которого извлекается значение
 * 
 * @example
 * // returns 'Москва'
 * getValue('address.city', { address: { city: 'Москва' } });
 * 
 * @example
 * // returns ''
 * getValue('', { name: 'Технопарк' });
 * 
 * @returns {*} Значение свойства или пустая строка, если свойство не найдено
 */
const getValue = (variableName, data) => {
    if (!variableName || !(typeof variableName === 'string' || variableName instanceof String)) {
        return '';
    }
    variableName = String(variableName);

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        throw new TypeError('Аргумент data должен быть объектом')
    }
    
    let value = '';
    value = variableName.split('.').reduce((cur, part) => {
        return cur && cur[part] !== undefined ? cur[part] : '';
            }, data)

    if (value === null) {
        return '';
    }
    return value;
}

/**
 * Заменяет в шаблоне переменные в фигурных скобках на значения из объекта данных
 * @param {string} template - Строка-шаблон с переменными в формате {{variable}}
 * @param {Object} data - Объект с данными для подстановки
 * 
 * @example
 * // returns "Привет, Технопарк!"
 * templateEngine("Привет, {{name}}!", {name: "Технопарк"});
 * 
 * @example
 * // returns "Город: Москва, Улица: 2-я Бауманская"
 * templateEngine("Город: {{address.city}}, Улица: {{address.street}}", {
 *   address: { city: "Москва", street: "2-я Бауманская" }
 * });
 * 
 * @returns {string}
 */
const templateEngine = (template, data) => {
    if (!(typeof template === 'string' || template instanceof String)) {
        throw new TypeError('Аргумент template должен быть строкой');
    }
    template = String(template);

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        throw new TypeError('Аргумент data должен быть объектом')
    }

    let i = 0;
    let result = '';

    while (i < template.length) {
        if (i + 1 >= template.length) {
            result += template[i];
            i++;
            continue;
        }

        if (!(template[i] === '{' && template[i + 1] === '{')) {
            result += template[i];
            i++;
        }
        else {
            i += 2;
            let name = '';
            while (!(template[i] === '}' && template[i + 1] === '}') && i < template.length) {
                name += template[i];
                i++;
            }

            if (i > template.length || !(template[i] === '}' && template[i + 1] === '}')) {
                result += '{{' + name;
                break; 
            }

            name = name.trim();
            i += 2;

            result += getValue(name, data);
        }
    }
    return result;
}
