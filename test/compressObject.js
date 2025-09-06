'use strict';

QUnit.module("Тестируем функцию compressObject", function() {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками", function(assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        assert.deepEqual(result, { name: "Андрей", country: "Россия" }, "Все отлично, вернулось: { name: 'Андрей', country: 'Россия' }");
    });

    QUnit.test("Работает с объектом без ненулевых значений", function(assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Все отлично, объект без ненулевых значений вернул пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Все отлично, пустой объект вернул пустой объект.");
    });

    QUnit.test("Работает со спамом undefined и числами", function(assert) {
        const result = compressObject({
            a: undefined,
            b: undefined,
            c: undefined,
            d: undefined,
            e: undefined,
            f: 1,
            j: 25,
            h: 9,
            i: 0
        });

        assert.deepEqual(result, {f: 1, j: 25, h: 9, i: 0}, "Все отлично, вернулись только числы: {f: 1, j: 25, h: 9, i: 0}.");
    });

    QUnit.test("Работает с типом данных boolean ", function(assert) {
        const result = compressObject({
            a: true,
            b: false,
            c: false,
            d: false,
            e: true
        });

        assert.deepEqual(result, {a: true, b: false, c: false, d: false, e: true}, "Все отлично, работает с типом данных boolean: {a: true, b: false, c: false, d: false, e: true}.");
    });

    QUnit.test("Работает с типами данных", function(assert) {
        const result = compressObject({
            name: "Андрей",
            surname: " ",
            age: 44, 
            shoe: null,
            parents: undefined,
            marryed: false,
            money: Infinity,
            children: NaN,
            Iq: 0
        })

        assert.deepEqual(result, {
            name: "Андрей",
            surname: " ",
            age: 44, 
            marryed: false,
            money: Infinity,
            children: NaN,
            Iq: 0
        }, "Все отлчиноБ работает с типами данных: {name: 'Андрей', surname: ' ', age: 44, marryed: false, money: Infinity, children: NaN, Iq: 0}")
    })
    
});
