'use strict';

QUnit.module('Тестируем функцию groupBy', () => {
        QUnit.test('Работает правильно с другим ключом для группировки', (assert) => {
        const data = [
            { id: 1, type: 'a', value: 10 },
            { id: 2, type: 'b', value: 20 },
            { id: 3, type: 'a', value: 30 },
            { id: 4, type: 'c', value: 40 }
        ];
        const result = groupBy(data, 'type');

        assert.deepEqual(result, {
            a: [
                { id: 1, type: 'a', value: 10 },
                { id: 3, type: 'a', value: 30 }
            ],
            b: [
                { id: 2, type: 'b', value: 20 }
            ],
            c: [
                { id: 4, type: 'c', value: 40 }
            ]
        }, 'Объекты должны быть сгруппированы по ключу type');
    });

    QUnit.test('Работает правильно, когда каждый объект имеет уникальное значение ключа', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'vegetable', name: 'carrot' },
            { id: 3, category: 'drink', name: 'water' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [{ id: 1, category: 'fruit', name: 'apple' }],
            vegetable: [{ id: 2, category: 'vegetable', name: 'carrot' }],
            drink: [{ id: 3, category: 'drink', name: 'water' }]
        }, 'Каждый объект должен попасть в свою отдельную группу');
    });

    QUnit.test('Работает правильно с группировкой по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 4, category: 'fruit', name: 'orange' }
            ],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'lettuce' }
            ]
        }, 'Объекты должны быть сгруппированы по категории');
    });

    QUnit.test('Работает правильно с пустым массивом', (assert) => {
        const emptyData = [];
        const result = groupBy(emptyData, 'category');

        assert.deepEqual(result, {}, 'Пустой массив должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно, когда все объекты имеют одно значение по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 3, category: 'fruit', name: 'orange' }
            ]
        }, 'Все объекты должны быть сгруппированы под одним значением');
    });

    QUnit.test('Обрабатывает отсутствие ключа в объектах', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' },
            { id: 4, category: null, name: 'grape' },
            { id: 5, category: undefined, name: 'mango' }
        ];
        
        const result = groupBy(data, 'category');
        
        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 3, category: 'fruit', name: 'orange' }
            ]
        }, 'Корректно обрабатывает отсутствие ключа и null/undefined значения');
    });

    QUnit.test('Выбрасывает ошибки при невалидных аргументах', (assert) => {
        assert.throws(
            () => groupBy(null, 'category'),
            TypeError,
            'Должна выбрасываться TypeError при null вместо массива'
        );
        
        assert.throws(
            () => groupBy(undefined, 'category'),
            TypeError,
            'Должна выбрасываться TypeError при undefined вместо массива'
        );
        
        assert.throws(
            () => groupBy('not array', 'category'),
            TypeError,
            'Должна выбрасываться TypeError при строке вместо массива'
        );
        
        assert.throws(
            () => groupBy(123, 'category'),
            TypeError,
            'Должна выбрасываться TypeError при числе вместо массива'
        );
        
        assert.throws(
            () => groupBy({}, 'category'),
            TypeError,
            'Должна выбрасываться TypeError при объекте вместо массива'
        );
    });
});
