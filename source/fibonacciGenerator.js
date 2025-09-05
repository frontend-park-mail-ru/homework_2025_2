'use strict';

/**
 * Генерирует первые n чисел последовательности Фибоначчи, начиная с 0.
 *
 * @param {number} n Количество чисел.
 * @returns {Generator<number, void, void>} Итератор по последовательности Фибоначчи.
 *
 * @example
 * // первые 5 чисел
 * [...fibonacciGenerator(5)] // [0, 1, 1, 2, 3]
 *
 * @example
 * // если n <= 0
 * [...fibonacciGenerator(0)] // []
 */
function* fibonacciGenerator(n) {
  if (!Number.isInteger(n) || n <= 0) {
    return;
  }

  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i += 1) {
    yield a;
    [a, b] = [b, a + b];
  }
}
