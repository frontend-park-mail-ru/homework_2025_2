'use strict';

QUnit.module('Тестируем функцию groupBy', () => {
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


    QUnit.test('Работает правильно, когда все объекты не имеют совпадающих значений по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'vegetable', name: 'potato' },
            { id: 3, category: 'berry', name: 'strawberry' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
            ],
            vegetable: [
                { id: 2, category: 'vegetable', name: 'potato' },
            ],
            berry: [
                { id: 3, category: 'berry', name: 'strawberry' }
            ]
        }, 'Каждому значению по ключу соотвествует 1 объект');
    });

    QUnit.test('Работает правильно с группировкой по ключу-числу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 1, category: 'fruit', name: 'banana' },
            { id: 2, category: 'vegetable', name: 'carrot' },
            { id: 1, category: 'fruit', name: 'orange' },
            { id: 2, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'id');

        assert.deepEqual(result, {
            '1': [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 1, category: 'fruit', name: 'banana' },
                { id: 1, category: 'fruit', name: 'orange' }
            ],
            '2': [
                { id: 2, category: 'vegetable', name: 'carrot' },
                { id: 2, category: 'vegetable', name: 'lettuce' }
            ]
        }, 'Объекты должны быть сгруппированы по категории');
    });
});

    
