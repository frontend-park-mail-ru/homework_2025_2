/**
 * Рекурсивно применяет функцию преобразования к каждому значению объекта или массива.
 *
 * @param {Object|Array|*} obj - исходный объект, массив или значение
 * @param {Function} transformFn - функция преобразования значений
 * @returns {Object|Array|*} новый объект, массив или преобразованное значение
 */
const transform = (obj, transformFn) => {
    if (Array.isArray(obj)) {
        return obj.map(item => transform(item, transformFn));
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, transform(value, transformFn)])
        );
    }
    return transformFn(obj);
};
