'use strict';

QUnit.module('Тестируем функцию plainify', () => {
    QUnit.test('Работает правильно с вложенным объектом', (assert) => {
        const originalObject = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            },
            f: 4
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }, 'Объект должен быть преобразован в plain');
    });

    QUnit.test('Работает правильно с пустым объектом', (assert) => {
        const originalObject = {};
        const result = plainify(originalObject);

        assert.deepEqual(result, {}, 'Пустой объект должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно с объектом, содержащим примитивы', (assert) => {
        const originalObject = {
            x: 'hello',
            y: 42,
            z: { a: 1, b: 2 }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { x: 'hello', y: 42, 'z.a': 1, 'z.b': 2 }, 'Примитивы и вложенные объекты должны быть правильно преобразованы');
    });

    QUnit.test('Работает правильно с null', (assert) => {
        const originalObject = { a: null, b: 5 };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: null, b: 5 }, 'Значение null должно остаться как есть');
    });

    QUnit.test('Работает правильно с массивом', (assert) => {
        const originalObject = { list: [1, 2, 3], x: 10 };
        const result = plainify(originalObject);

        assert.deepEqual(result, { list: [1, 2, 3], x: 10 }, 'Массив должен остаться как значение целиком');
    });

    QUnit.test('Работает правильно с undefined', (assert) => {
        const originalObject = undefined;
        const result = plainify(originalObject);

        assert.deepEqual(result, {}, 'undefined должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно с простым объектом без вложенности', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: 1, b: 2 }, 'Простой объект должен остаться без изменений');
    });
});
