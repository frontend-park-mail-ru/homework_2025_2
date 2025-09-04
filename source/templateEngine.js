'use strict';
/**
 * Заменяет в шаблоне все вхождения переменных, заключённых в фигурные скобки, на соответствующие значения из объекта данных
 * @param {string} templateString - Строка шаблона
 * @param {Object} dataObject - Объект данных с значениями для подстановки
 * 
 * @example
 * // returns "Привет, Технопарк!"
 * templateEngine("Привет, {{name}}!", { name: "Технопарк" });
 * 
 * @returns {string} Результирующая строка с подставленными значениями
 */
function templateEngine(templateString, dataObject) {
    if (typeof templateString !== 'string' && !(templateString instanceof String)) {
        throw new TypeError('templateString должен быть строкой');
    }
    if (typeof dataObject !== 'object') {
        throw new TypeError('dataObject должен быть объектом');
    }
    console.log(typeof(dataObject));
    return templateString.replace(/\{\{([^}]+)\}\}/g, (_, variableText) => {
        return getVariableValue(variableText, dataObject);
    });
}

/**
 * Получает значение переменной из объекта по строке с именем
 * @param {string} variableText - Строка с именем переменной
 * @param {Object} dataObject - Объект данных, из которого извлекаются значения
 *
 * @example
 * // returns "Москва"
 * getVariableValue('address.city', { address: { city: "Москва", street: "2-я Бауманская" } });
 * // returns ''
 * getVariableValue('address.building', { address: { city: "Москва", street: "2-я Бауманская" } });
 * 
 * @returns {*} Значение переменной или пустая строка, если переменной не найдено
 */
const getVariableValue = (variableText, dataObject) => {
    return variableText.split('.').reduce((variableValue, part) => {
        return variableValue = variableValue[part] ? variableValue[part] : '';
    }, dataObject);
};
