'use strict';
/**
 * преобразует вложенный объект в "плоский" вид, объединяя ключи через точку
 *
 * @param {object|null|undefined} obj – исходный объект
 * @param {string} [prefix=""] – префикс, используемый при рекурсивных вызовах для формирования вложенных ключей
 *
 * @example
 * // return { x: 10, "nested.y": "hello", "nested.deeper.z": true }
 * plainify({ x: 10, nested: { y: 'hello', deeper: { z: true } } });
 *
 * @returns {object}
 */
const plainify = (obj, prefix = '') => {
    const out = {};
    for (const [key, val] of Object.entries(obj || {})) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (val !== null && typeof val === 'object' && !Array.isArray(val) && val.constructor === Object) {
            Object.assign(out, plainify(val, path));
        } else {
            out[path] = val;
        }
    }
    return out;
};

