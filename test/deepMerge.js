'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Добавление нового вложенного объекта", function(assert) {
        const source  = {
            user: {
                name: "Alice"
            }
        };

        const target = {
            user: {
                profile: {
                    age: 25
                }
            }
        };

        const expected = {
            user: {
                name: "Alice",
                profile: {
                    age: 25
                }
            }
        };
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Новый вложенный объект должен добавляться");
    });
    
    QUnit.test("Работает с null и массивами", function(assert) {
        const source = {
            a: 1,
            b: [2, 3]
        };

        const target = {
            a: null,
            b: [4, 5]
        };

        const expected = {
            a: null,
            b: [4, 5]
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "a и b полностью перезапишутся");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const source = {
            a: 1,
            b: [2, 3]
        };

        const target = {};

        const expected = {
            a: 1,
            b: [2, 3]
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должен возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Работает с перезаписью вложенных объектов", function(assert) {
        const source = { 
            a: { 
                b: 1, 
                c: 2 
            } 
        };

        const target = { 
            a: { 
                b: 3 
            } 
        };

        const expected = { 
            a: { 
                b: 3, 
                c: 2 
            } 
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должен правильно перезаписывать вложенные объекты");
    });


    QUnit.test("Работает корректно при разных типах значений", function(assert) {
        const source = {
            user: 'oldUserName',
            };

            const target = {
            user: {
                name: 'Alice'
            },
        };

        const expected = {
            user: {
                name: 'Alice'
            }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должен правильно обрабатывать случай когда одинаковый ключ содержит различный тип данных");
    });
});
