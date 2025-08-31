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
function templateEngine(template, data) {
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

            name = name.trim()
            i += 2;

            let value = '';
            if (name.indexOf('.') === -1) {
                if (data[name] != undefined) {
                    value = data[name];
                }
            }

            else {
                let parts = name.split('.');
                let cur = data;
                for (const part of parts) {
                    if (cur && cur[part] != undefined) {
                        cur = cur[part];
                    }
                    else {
                        cur = '';
                        break;
                    }
                }
                value = cur;
            }

            result += value;
        }
    }

    return result;
}