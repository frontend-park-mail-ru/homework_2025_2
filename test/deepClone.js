'use strict';

QUnit.module('Тестируем функцию deepClone', () => {
    QUnit.test('Работает правильного для простого объекта', (assert) => {
        const original = { a: 1, b: 2 };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия должна быть независимой от оригинала');
    });

    QUnit.test('Работает правильно для вложенного объекта', (assert) => {
        const original = { a: 1, b: { c: 2 } };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned.b, original.b, 'Вложенный объект должен быть независимым');
    });

    QUnit.test('Работает правильно для массива', (assert) => {
        const original = [1, 2, { a: 3 }];
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия массива должна быть равна оригиналу');
        assert.notStrictEqual(cloned[2], original[2], 'Вложенный объект в массиве должен быть независимым');
    });

    QUnit.test('Копирование объекта с вложенными массивами и объектами', function (assert) {
        const original = {
            numbers: [1, 2, 3],
            nested: {
                a: 'hello',
                b: [4, 5, 6]
            }
        };

        const cloned = deepClone(original);

        assert.notStrictEqual(cloned, original, 'Клонированный объект не равен оригинальному');
        assert.notStrictEqual(cloned.numbers, original.numbers, 'Вложенные массивы разные');
        assert.notStrictEqual(cloned.nested, original.nested, 'Вложенные объекты разные');

        assert.deepEqual(cloned, original, 'Значения объектов совпадают');
    });

    QUnit.test('Копирование объекта с датами', function (assert) {
        const date = new Date('2023-01-01');
        const original = {
            createdAt: date,
            updatedAt: new Date('2023-12-31')
        };

        const cloned = deepClone(original);

        assert.notStrictEqual(cloned.createdAt, original.createdAt, 'Даты разные');
        assert.notStrictEqual(cloned.updatedAt, original.updatedAt, 'Даты разные');

        assert.strictEqual(cloned.createdAt.getTime(), original.createdAt.getTime(), 'Время дат совпадает');
        assert.strictEqual(cloned.updatedAt.getTime(), original.updatedAt.getTime(), 'Время дат совпадает');
    });

    QUnit.test('Копирование объекта с функциями', function (assert) {
        const testFunc = function () { return 'test'; };
        const original = {
            method: testFunc,
            data: { value: 42 }
        };

        const cloned = deepClone(original);

        assert.strictEqual(cloned.method, original.method, 'Функции совпадают по ссылке');
        assert.strictEqual(cloned.method(), 'test', 'Функция работает корректно');
        assert.notStrictEqual(cloned.data, original.data, 'Вложенные объекты разные');
    });

    QUnit.test('Копирование null значения', function (assert) {
        const original = null;
        const cloned = deepClone(original);

        assert.strictEqual(cloned, original, 'null должен копироваться как null');
        assert.strictEqual(cloned, null, 'Копия должна быть null');
    });
});
