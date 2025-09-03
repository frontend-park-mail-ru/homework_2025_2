/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию fetchAndMerge", function() {
    QUnit.test("Возвращает объект при полученных данных", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [25, 22],
            "id": [1, 2],
            "name": ["Олег", "Мария"],
            "surname": ["Петров", "Иванова"],
            "status": ["Дуров, верни стену!"],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "name": "Олег", "surname": "Петров", "age": 25, "status": "Дуров, верни стену!" },
                'https://mailru.example.com/mailid': { "id": 2, "name": "Мария", "surname": "Иванова", "age": 22 },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMerge(urls);
        assert.deepEqual(result, expected, "Должно правильно объединять данные с разных URL");
    });

    QUnit.test("Работает правильно при ошибках fetch", async function(assert) {
        const urls = [
            'https://vk.example.com/mailru',
            'https://vk.example.com/byte'
        ];

        window.fetch = () => Promise.reject(new Error("Network error"));

        const result = await fetchAndMerge(urls);
        assert.deepEqual(result, {}, "Должно возвращать пустой объект при ошибке fetch");
    });

    QUnit.test("Убирает дублирующиеся значения в массивах", async function(assert) {
        const urls = [
            'https://api.example.com/user1',
            'https://api.example.com/user2',
            'https://api.example.com/user3'
        ];
        
        const expected = {
            "name": ["Олег", "Мария"],
            "role": ["admin"],
            "age": [25, 30]
        };

        window.fetch = (url) => {
            const data = {
                'https://api.example.com/user1': { "name": "Олег", "role": "admin", "age": 25 },
                'https://api.example.com/user2': { "name": "Мария", "role": "admin", "age": 30 },
                'https://api.example.com/user3': { "name": "Олег", "role": "admin", "age": 25 }
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMerge(urls);
        assert.deepEqual(result, expected, "Должно убирать дублирующиеся значения в результирующих массивах");
    });

    QUnit.test("Обрабатывает пустой массив URL", async function(assert) {
        const urls = [];
        const expected = {};

        const result = await fetchAndMerge(urls);
        assert.deepEqual(result, expected, "Должно возвращать пустой объект для пустого массива URL");
    });
});

