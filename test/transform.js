/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

        QUnit.test('Работает с пустым объектом', (assert) => {
        const originalObject = {};
        const transformFunction = (value) => value * 10;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, {}, 'Пустой объект остаётся пустым');
    });

    QUnit.test('Работает с null и undefined значениями', (assert) => {
        const originalObject = { a: null, b: undefined, c: 5 };
        const transformFunction = (value) => value === null ? 'null' : (value === undefined ? 'undef' : value * 2);
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 'null', b: 'undef', c: 10 }, 'Функция корректно обрабатывает null и undefined');
    });

    QUnit.test('Работает с вложенными массивами', (assert) => {
        const originalObject = { a: [[1, 2], [3, 4]] };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [[2, 3], [4, 5]] }, 'Все элементы вложенных массивов должны быть увеличены на 1');
    });

});
