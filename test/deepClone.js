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

    QUnit.test('Работает правильно для специальных констант', (assert) => {
        assert.strictEqual(deepClone(Infinity), Infinity);
        assert.strictEqual(deepClone(0), 0);
        assert.strictEqual(deepClone(-Infinity), -Infinity);
    });

    QUnit.test('Работает правильно для функций', (assert) => {
        assert.strictEqual(deepClone(() => {}), () => {});
    });

    QUnit.test('Работает правильно для символов', (assert) => {
        assert.strictEqual(deepClone(Symbol()), Symbol());
    });

    QUnit.test('Работает правильно для булевых значений', (assert) => {
        assert.strictEqual(deepClone(true), true);
        assert.strictEqual(deepClone(false), false);
    });
});
