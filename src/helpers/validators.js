import { all, allPass, anyPass, converge, compose, not, equals, filter, gt, prop, values } from "ramda";  
/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const getTriangleColor = prop('triangle');
const getStarColor = prop('star');
const getSquareColor = prop('square');
const getCircleColor = prop('circle');

const getLength = prop('length');
const allColors = values; 

const isWhite = equals('white');
const isRed = equals('red');
const isGreen = equals('green');
const isOrange = equals('orange');
const isBlue = equals('blue');

const isWhiteTriangle = compose(isWhite, getTriangleColor);
const isGreenTriangle = compose(isGreen, getTriangleColor);
const isWhiteCircle = compose(isWhite, getCircleColor);
const isBlueCircle = compose(isBlue, getCircleColor);
const isGreenSquare = compose(isGreen, getSquareColor);
const isOrangeSquare = compose(isOrange, getSquareColor);
const isRedStar = compose(isRed, getStarColor);


const moreThanOne = number => gt(number, 1);
const isCountThree= number => equals(number, 3);
const isCountOne = number => equals(number, 1);



const getGreenCount = compose(getLength, filter(isGreen), allColors);
const getRedCount = compose(getLength, filter(isRed), allColors);
const getBlueCount = compose(getLength, filter(isBlue), allColors);
const getOrangeCount = compose(getLength, filter(isOrange), allColors);





// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteCircle,
    isWhiteTriangle
])

// 2. Как минимум две фигуры зеленые. *
export const validateFieldN2 = compose(moreThanOne, getGreenCount);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [getRedCount, getBlueCount]);

// 4. Синий круг, красная звезда, оранжевый квадрат *
export const validateFieldN4 = allPass([
    isBlueCircle,
    isRedStar,
    isOrangeSquare
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true). *
export const validateFieldN5 =  anyPass([
    compose(isCountThree, getGreenCount),
    compose(isCountThree, getRedCount),
    compose(isCountThree, getBlueCount),
    compose(isCountThree, getOrangeCount)
]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    isGreenTriangle,
    compose(moreThanOne, getGreenCount),
    compose(isCountOne, getRedCount)
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(all(isOrange), allColors)// compose( getOrangeCount)]);

// 8. Не красная и не белая звезда. *
export const validateFieldN8 = allPass([
    compose(not, isRed, getStarColor),
    compose(not, isWhite, getStarColor)
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(all(isGreen), allColors)

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
   compose(not, isWhite, getTriangleColor),
   compose(not, isWhite, getSquareColor),
   converge(equals, [getTriangleColor, getSquareColor])
   
]);
