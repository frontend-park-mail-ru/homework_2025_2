/**
 * Функция, определяющая максимальное число в массиве
 * @param {Array<Array<Number>>} numbers - массив чисел
 * 
 * @example
 * // returns [1, 2, 3]
 * flatten([1, [2, [3]]]);
 * 
 * @returns {Array<Number>}
 */
function flatten(numbers) {
    if (typeof numbers === 'number') return numbers;
    ans = []
    numbers.forEach(el => {
        ans = ans.concat(flatten(el))
    });
    return ans
}