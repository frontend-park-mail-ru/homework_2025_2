'use strict';

QUnit.module('Тестируем функцию flatten', function () {
  QUnit.test('Работает правильно с плоским массивом', function (assert) {
    const result = flatten([1, 2, 3]);

    assert.deepEqual(result, [1, 2, 3]);
  });

  QUnit.test('Работает правильно с вложенным массивом с несколькими уровнями', function (assert) {
    const result = flatten([1, [2, [3, 4], 5], 6]);
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.test('Работает правильно с пустым массивом', function (assert) {
    const result = flatten([]);
    assert.deepEqual(result, []);
  });
  QUnit.test('Работает правильно с undefined и null', function (assert) {
    const result = flatten([undefined, [null, [3]]]);
    assert.deepEqual(result, [undefined, null, 3]);
  });
  QUnit.test('Работает правильно с символами', function (assert) {
    const result = flatten(['a', ['b', ['c']]]);
    assert.deepEqual(result, ['a', 'b', 'c']);
  });
  QUnit.test('Работает правильно с объектами', function (assert) {
    const result = flatten([{3: 3}, 'f', [{5: '3', 3: ['r']}], 42]);
    assert.deepEqual(result, [{3: 3}, 'f', {5: '3', 3: ['r']}, 42]);
  });
});
