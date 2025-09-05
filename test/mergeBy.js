'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });
    
    QUnit.test("Работает правильно с одним пустым массивом", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ]);
    });

    QUnit.test("Работает правильно с дубликатами в массивах при объединении", function(assert) {
        const array1 = [
            { id: 1, tags: ["js", "html"], skills: ["programming"] }
        ];
        const array2 = [
            { id: 1, tags: ["js", "css"], skills: ["programming", "debugging"] }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, tags: ["js", "html", "css"], skills: ["programming", "debugging"] }
        ]);
    });

    QUnit.test("Работает правильно при конфликте свойств, которые не являются массивами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", role: "developer", active: true },
            { id: 2, name: "Bob", role: "designer" }
        ];
        const array2 = [
            { id: 1, name: "Alicia", role: "senior developer", age: 30 },
            { id: 2, name: "Robert", active: false }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", role: "developer", active: true, age: 30 },
            { id: 2, name: "Bob", role: "designer", active: false }
        ], "значения из первого массива должны иметь приоритет при конфликте свойств, которые не являются массивами");
    });

    QUnit.test("Работает правильно с неверными типами входных данных", function(assert) {
        {
            const array1 = { id: 1, name: "Alice"};
            const array2 = [
                { age: 30 },
                { id: 2, age: 25 }
            ];

            assert.throws(
                () => mergeBy(array1, array2, "id"),
                /objects1 must be an array/
            )
        }
        {
            const array1 = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" }
            ];
            const array2 = { age: 30 };

            assert.throws(
                () => mergeBy(array1, array2, "id"),
                /objects2 must be an array/
            )
        }
        {
            const array1 = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" }
            ];
            const array2 = [
                { age: 30 },
                { id: 2, age: 25 }
            ];

            assert.throws(
                () => mergeBy(array1, array2, {value: "id"}),
                /keyPooling must be a string/
            )
        }
    });
});
