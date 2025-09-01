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

    QUnit.test('Если входной шаблон не строка, должна выбрасываться ошибка', (assert) => {
        assert.throws(() => {
            const template = 5;
            const data = { number: 5 };
            const result = templateEngine(template, data);
        }, /Аргумент template должен быть строкой/, 'Ошибка выбрасывается для template = 5');
    });

    QUnit.test('Если входные данные со значениями переменных не объект, должна выбрасываться ошибка', (assert) => {
        assert.throws(() => {
            const template = "Число: {{number}}";
            const data = [5];
            const result = templateEngine(template, data);
        }, /Аргумент data должен быть объектом/, 'Ошибка выбрасывается для data = [5]');
    });

    QUnit.test("Работает правильно с undefined значениями в данных", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: undefined, street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: , Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с null значениями в данных", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: null, street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: , Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с пустыми значениями в данных", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: '', street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: , Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с булевыми переменными", function(assert) {
        const template = "Флаг: {{flag}}";
        const data = { flag: true };
        const result = templateEngine(template, data);
        assert.equal(result, "Флаг: true");
    });
});
