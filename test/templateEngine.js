'use strict';

QUnit.module("Тестируем функцию templateEngine", function() {
    QUnit.test("Работает правильно с простым шаблоном с одной переменной", function(assert) {
        const template = "Привет, {{name}}!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк!");
    });

    QUnit.test("Работает правильно с шаблоном с отсутствующими переменными", function(assert) {
        const template = "Привет, {{name}}! Тебе {{age}} лет.";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк! Тебе  лет."); // Возраст не найден, заменён на пустую строку
    });

    QUnit.test("Работает правильно с шаблоном с вложенными переменными", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с шаблоном с глубоко вложенными переменными", function(assert) {
        const template = "Город: {{address.city.name}}, Улица: {{address.city.street.name}}, Дом: {{address.city.street.house.number}}";
        const data = { 
            address: {
                city: { 
                    name: "Москва",
                    street: { 
                        name: "2-я Бауманская",
                        house: {
                            number: 5
                        }
                    } 
                } 
            } 
        };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская, Дом: 5");
    });

    QUnit.test("Работает правильно с незакрытыми скобками", function(assert) {
        const template = "Привет, {{name!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);
        assert.equal(result, "Привет, {{name!");
    });

    QUnit.test("Работает правильно с числовыми переменными", function(assert) {
        const template = "Число: {{number}}";
        const data = { number: 5 };
        const result = templateEngine(template, data);
        assert.equal(result, "Число: 5");
    });
});
