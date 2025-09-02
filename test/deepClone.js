'use strict';

QUnit.module('Тестируем функцию deepClone', () => {
    QUnit.test('Работает правильно для простого объекта', (assert) => {
        const original = { a: 1, b: 2 };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия должна быть независимой от оригинала');
    });

    QUnit.test('Работает правильно для вложенного объекта', (assert) => {
        const original = { a: 1, b: { c: 2 } };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия должна быть независимой от оригинала');
        assert.notStrictEqual(cloned.b, original.b, 'Вложенный объект должен быть независимым');
    });

    QUnit.test('Работает правильно для массива', (assert) => {
        const original = [1, 2, { a: 3 }];
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия массива должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия массива должна быть независимой от оригинала');
        assert.notStrictEqual(cloned[2], original[2], 'Вложенный объект в массиве должен быть независимым');
    });

    QUnit.test('Работает правильно для специальных числовых значений', (assert) => {
        assert.strictEqual(deepClone(Infinity), Infinity, 'Должна корректно копировать Infinity');
        assert.strictEqual(deepClone(-Infinity), -Infinity, 'Должна корректно копировать -Infinity');
        assert.strictEqual(deepClone(0), 0, 'Должна корректно копировать 0');
        assert.strictEqual(deepClone(-0), -0, 'Должна корректно копировать -0');
        assert.ok(Number.isNaN(deepClone(NaN)), 'Должна корректно копировать NaN');
    });

    QUnit.test('Работает правильно с null и undefined', (assert) => {
        assert.strictEqual(deepClone(null), null, 'Должна корректно копировать null');
        assert.strictEqual(deepClone(undefined), undefined, 'Должна корректно копировать undefined');
    });

    QUnit.test('Работает правильно для примитивных значений', (assert) => {
        assert.strictEqual(deepClone(42), 42, 'Должна корректно копировать числа');
        assert.strictEqual(deepClone('hello'), 'hello', 'Должна корректно копировать строки');
        assert.strictEqual(deepClone(true), true, 'Должна корректно копировать true');
        assert.strictEqual(deepClone(false), false, 'Должна корректно копировать false');
    });

    QUnit.test('Работает правильно для объектов Date', (assert) => {
        const date = new Date();
        const cloned = deepClone(date);
        
        assert.deepEqual(cloned, date, 'Скопированная дата должна быть равна оригиналу');
        assert.notStrictEqual(cloned, date, 'Скопированная дата должна быть новым объектом');
        assert.ok(cloned instanceof Date, 'Скопированный объект должен быть экземпляром Date');
    });

    QUnit.test('Работает правильно для объектов RegExp', (assert) => {
        const regex = /test/gi;
        const cloned = deepClone(regex);
        
        assert.notStrictEqual(cloned, regex, 'Скопированный RegExp должен быть новым объектом');
        assert.ok(cloned instanceof RegExp, 'Скопированный объект должен быть экземпляром RegExp');
        assert.strictEqual(cloned.source, regex.source, 'Source должен совпадать');
        assert.strictEqual(cloned.flags, regex.flags, 'Flags должны совпадать');
    });

    QUnit.test('Работает правильно для объектов Set', (assert) => {
        const set = new Set([1, 2, { a: 3 }]);
        const cloned = deepClone(set);
        
        assert.notStrictEqual(cloned, set, 'Скопированный Set должен быть новым объектом');
        assert.ok(cloned instanceof Set, 'Скопированный объект должен быть экземпляром Set');
        assert.deepEqual([...cloned], [...set], 'Элементы должны совпадать');
        assert.notStrictEqual([...cloned][2], [...set][2], 'Вложенные объекты в Set должны быть независимыми');
    });

    QUnit.test('Работает правильно для объектов Map', (assert) => {
        const map = new Map([[1, 'one'], ['key', { value: 'nested' }]]);
        const cloned = deepClone(map);
        
        assert.notStrictEqual(cloned, map, 'Скопированная Map должна быть новым объектом');
        assert.ok(cloned instanceof Map, 'Скопированный объект должен быть экземпляром Map');
        assert.strictEqual(cloned.size, map.size, 'Размеры должны совпадать');
        assert.strictEqual(cloned.get(1), map.get(1), 'Примитивные значения должны совпадать');
        assert.notStrictEqual(cloned.get('key'), map.get('key'), 'Вложенные объекты в Map должны быть независимыми');
        assert.deepEqual(cloned.get('key'), map.get('key'), 'Содержимое вложенных объектов должно совпадать');
    });

    QUnit.test('Работает правильно для вложенных структур с разными типами', (assert) => {
        const original = {
            num: 42,
            str: 'hello',
            bool: true,
            nil: null,
            date: new Date(),
            regex: /test/gi,
            set: new Set([1, 2, { nested: 'in set' }]),
            map: new Map([[1, 'one'], ['obj', { nested: 'in map' }]]),
            arr: [1, 2, { nested: 'value' }],
            obj: {
                inner: {
                    deep: 'deep value'
                }
            }
        };
        
        const cloned = deepClone(original);
        
        assert.deepEqual(cloned, original, 'Сложная структура должна копироваться корректно');
        assert.notStrictEqual(cloned, original, 'Основной объект должен быть независимым');
        assert.notStrictEqual(cloned.date, original.date, 'Date внутри должен быть независимым');
        assert.notStrictEqual(cloned.regex, original.regex, 'RegExp внутри должен быть независимым');
        assert.notStrictEqual(cloned.set, original.set, 'Set внутри должен быть независимым');
        assert.notStrictEqual(cloned.map, original.map, 'Map внутри должна быть независимой');
        assert.notStrictEqual(cloned.arr, original.arr, 'Массив должен быть независимым');
        assert.notStrictEqual(cloned.arr[2], original.arr[2], 'Объекты в массиве должны быть независимыми');
        assert.notStrictEqual(cloned.obj, original.obj, 'Вложенные объекты должны быть независимыми');
        assert.notStrictEqual(cloned.obj.inner, original.obj.inner, 'Глубоко вложенные объекты должны быть независимыми');
        
        assert.notStrictEqual([...cloned.set][2], [...original.set][2], 'Объекты в Set должны быть независимыми');
        
        assert.notStrictEqual(cloned.map.get('obj'), original.map.get('obj'), 'Объекты в Map должны быть независимыми');
    });
});