
/**
 * Перемешивает элементы массива случайным образом с использованием алгоритма Фишера-Йетса
 * @param {Array} array - Массив для перемешивания
 * @returns {Array} Перемешанный массив
 */
export function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array
}