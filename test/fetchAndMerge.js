/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию fetchAndMerge", function () {
    QUnit.test("Возвращает объект при полученных данных", async function (assert) {
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
                'https://vk.example.com/vkid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": "Петров",
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
                'https://mailru.example.com/mailid': {"id": 2, "name": "Мария", "surname": "Иванова", "age": 22},
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно правильно объединять данные с разных URL");
    });

    QUnit.test("Работает правильно при ошибках fetch", async function (assert) {
        const urls = [
            'https://vk.example.com/mailru',
            'https://vk.example.com/byte'
        ];

        window.fetch = () => Promise.reject(new Error("Network error"));

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, {}, "Должно возвращать пустой объект при ошибке fetch");
    });

    QUnit.test("Работает правильно при наличии ошибок fetch", async function (assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [22],
            "id": [2],
            "name": ["Мария"],
            "surname": ["Иванова"],
        };

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': new Error("Network error"),
                'https://mailru.example.com/mailid': {"id": 2, "name": "Мария", "surname": "Иванова", "age": 22},
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Обработка ссылок в одной из которых ошибка");
    });

    QUnit.test("Работает правильно при наличии массивов в JSON", async function (assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [25, 22],
            "id": [1, 2],
            "name": ["Олег", "Мария"],
            "surname": ["Петров", "Иванов", "Иванова", "Петрова"],
            "status": ["Дуров, верни стену!"],
        };

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": ["Петров", "Иванов"],
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
                'https://mailru.example.com/mailid': {
                    "id": 2,
                    "name": "Мария",
                    "surname": ["Иванова", "Петрова"],
                    "age": 22
                },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Нужно правильно обработать тип данных");
    });

    QUnit.test("Работает правильно при наличии не объектов", async function (assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [22],
            "id": [2],
            "name": ["Мария"],
            "surname": ["Иванова"],
        };

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': "fff",
                'https://mailru.example.com/mailid': {"id": 2, "name": "Мария", "surname": "Иванова", "age": 22},
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "string в ответе");
    });

    QUnit.test("Возвращает только уникальные значения", async function (assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [25],
            "id": [1],
            "name": ["Олег"],
            "surname": ["Петров"],
            "status": ["Дуров, верни стену!"],
        };

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": "Петров",
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
                'https://mailru.example.com/mailid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": "Петров",
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно правильно объединять данные с разных URL");
    });

    QUnit.test("Аргумент - строка", async function (assert) {
        const urls = 'https://vk.example.com/vkid';
        const expected = null;

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": "Петров",
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Проверка типа входных данных");
    });

    QUnit.test("Массив из одного элемента", async function (assert) {
        const urls = ['https://vk.example.com/vkid'];
        const expected = {
            "age": [25],
            "id": [1],
            "name": ["Олег"],
            "surname": ["Петров"],
            "status": ["Дуров, верни стену!"],
        };

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": "Петров",
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Неправильная обработка входных данных");
    });
});

