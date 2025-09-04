"use strict";

/**
 * Рекурсивно объединяет два объекта.
 * Если ключи совпадают и значения являются объектами — выполняется глубокое объединение.
 * В остальных случаях значение из второго объекта перезаписывает значение из первого.
 *
 * @param {Object} source - исходный объект
 * @param {Object} target - объект, значения которого имеют приоритет
 * @returns {Object} новый объединённый объект
 *
 * @example
 * deepMerge(
 *   { user: { name: "Alice", age: 25 } },
 *   { user: { age: 30 } }
 * );
 * // => { user: { name: "Alice", age: 30 } }
 */
function deepMerge(source, target) {
    if (target === null || typeof target !== "object"){
        if (source === undefined || source === null) return {};

        return structuredClone(source) ?? {};
    }

    const result = structuredClone(source);

    Object.keys(target).forEach(key => {
            const sourceValue = result[key];
            const targetValue = target[key];

            if (
                sourceValue instanceof Object && targetValue instanceof Object 
            ) {
                result[key] = deepMerge(sourceValue, targetValue);
            } else {
                result[key] = targetValue;
            }
    });

    return result;
}
