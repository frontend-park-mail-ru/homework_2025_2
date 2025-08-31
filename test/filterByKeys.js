'use strict';

QUnit.module('Тестируем функцию filterObjectByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно с отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Работает правильно c пустыми ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = [];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'Должен вернуться пустой объект');
    });

    QUnit.test('Работает правильно со значением null', (assert) => {
        const originalObject = { a: 1, b: null };
        const keysToFilter = ['a', 'b'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, b: null }, 'Ключ со значением null должен быть скопирован');
    });
});

QUnit.module('Тестируем filterObjectByKeys с некорректными входными данными', () => {

    QUnit.test('Возвращает пустой объект, если вместо объекта передан null или undefined', (assert) => {
        const keys = ['a', 'b'];
        assert.deepEqual(filterObjectByKeys(null, keys), {}, 'Должен вернуть {} для null');
        assert.deepEqual(filterObjectByKeys(undefined, keys), {}, 'Должен вернуть {} для undefined');
    });

    QUnit.test('Возвращает пустой объект, если вместо объекта переданы примитивы', (assert) => {
        const keys = ['a', 'b'];
        assert.deepEqual(filterObjectByKeys('some string', keys), {}, 'Должен вернуть {} для строки');
        assert.deepEqual(filterObjectByKeys(12345, keys), {}, 'Должен вернуть {} для числа');
        assert.deepEqual(filterObjectByKeys(true, keys), {}, 'Должен вернуть {} для boolean');
        assert.deepEqual(filterObjectByKeys(Symbol('id'), keys), {}, 'Должен вернуть {} для Symbol');
        assert.deepEqual(filterObjectByKeys(10n, keys), {}, 'Должен вернуть {} для BigInt');
    });

    QUnit.test('Возвращает пустой объект, если вместо объекта переданы специальные числовые значения', (assert) => {
        const keys = ['toString'];
        assert.deepEqual(filterObjectByKeys(NaN, keys), {}, 'Должен вернуть {} для NaN');
        assert.deepEqual(filterObjectByKeys(Infinity, keys), {}, 'Должен вернуть {} для Infinity');
    });

    QUnit.test('Возвращает пустой объект, если вместо массива ключей передано что-то другое', (assert) => {
        const obj = { a: 1 };
        assert.deepEqual(filterObjectByKeys(obj, null), {}, 'Должен вернуть {} для null вместо массива');
        assert.deepEqual(filterObjectByKeys(obj, { a: 1 }), {}, 'Должен вернуть {} для объекта вместо массива');
        assert.deepEqual(filterObjectByKeys(obj, 'a'), {}, 'Должен вернуть {} для строки вместо массива');
    });
});
