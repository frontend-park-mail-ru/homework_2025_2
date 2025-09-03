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

"use strict";

function deepMerge(source, target) {
    if (target === null || typeof target !== "object") return { ...source};

    const result = { ...source };

    for (const key in target) {
        if (Object.hasOwn(target,key)) {
            const sourceValue = result[key];
            const targetValue = target[key];

            if (
                typeof sourceValue === "object" && sourceValue !== null &&
                typeof targetValue === "object" && targetValue !== null &&
                !Array.isArray(sourceValue) && !Array.isArray(targetValue)
            ) {
                result[key] = deepMerge(sourceValue, targetValue);
            } else {
                result[key] = targetValue;
            }
        }
    }

    return result;
}
