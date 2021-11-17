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
const isWhiteStar = compose(isWhite, getStarColor);


const moreThan1 = number => gt(number, 1);
const isCountUp2= number => gt(number, 2);
const isCount1 = number => equals(number, 1);
const isCount2 = number => equals(number, 2);



const getGreenCount = compose(getLength, filter(isGreen), allColors);
const getRedCount = compose(getLength, filter(isRed), allColors);
const getBlueCount = compose(getLength, filter(isBlue), allColors);
const getOrangeCount = compose(getLength, filter(isOrange), allColors);


const isGreenCount3 = compose(isCountUp2, getGreenCount);
const isGreenCount2 = compose(isCount2, getGreenCount);

const isRedCount3 = compose(isCountUp2, getRedCount);
const isRedCount1 = compose(isCount1, getRedCount);


const isBlueCount3 = compose(isCountUp2, getBlueCount);
const isOrangeCount3 = compose(isCountUp2, getOrangeCount);

//const curriedCompose = curry(compose);
//const denialCompose = curriedCompose(not);
const greenCountUp1 = compose(moreThan1, getGreenCount);
const RedCountEqualBlue =  converge(equals, [getRedCount, getBlueCount]);
const allFiguresOrange = compose(all(isOrange), allColors);
const allFiguresGreen = compose(all(isGreen), allColors);
const TriangleColorEqualSquare = converge(equals, [getTriangleColor, getSquareColor]);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteCircle,
    isWhiteTriangle
])

// 2. Как минимум две фигуры зеленые. *
export const validateFieldN2 = greenCountUp1;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = RedCountEqualBlue;

// 4. Синий круг, красная звезда, оранжевый квадрат *
export const validateFieldN4 = allPass([
    isBlueCircle,
    isRedStar,
    isOrangeSquare
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true). *
export const validateFieldN5 =  anyPass([
    isGreenCount3,
    isRedCount3,
    isBlueCount3,
    isOrangeCount3
]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    isGreenTriangle,
    isGreenCount2,
    isRedCount1
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allFiguresOrange;

// 8. Не красная и не белая звезда. *
export const validateFieldN8 = allPass([
    compose(not, isRedStar),
    compose(not, isWhiteStar)
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allFiguresGreen;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
   compose(not, isWhite, getTriangleColor),
   compose(not, isWhite, getSquareColor),
   TriangleColorEqualSquare
   
]);
