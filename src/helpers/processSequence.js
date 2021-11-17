/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */ 
import Api from '../tools/api';
import { prop, gt, lt, compose, test, allPass, partialRight, pipeWith, pipe, andThen, tap, length, cond } from 'ramda';

const getResult = prop('result');

const api = new Api();

const getApiAnimals = id => api.get(`https://animals.tech/${id}`, {});
const getApiNumbers = number => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number: number }); 


const isLengthLess10 = length => lt(length, 10);
const isLenghtUp2 = length => gt(length, 2);
const isPositive = number => gt(roundNum( parseFloat(number)), 0);

const isFloatNum = test(/^[0-9]*\.?[0-9]*$/);

const roundNum = number => Math.round(number);
const squareNum = number => Math.pow(number, 2);
const getDevisionRemainder = number => number % 3;

const patialCompose = partialRight(compose, [length]);

const isStrValid = allPass([
    isFloatNum,
    patialCompose(isLenghtUp2),
    patialCompose(isLengthLess10),
    isPositive
]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const tapLog = tap(writeLog);
    pipe(
        cond([
            [isStrValid, 
                pipe(
                    tapLog,
                    parseFloat,
                    roundNum,
                    tapLog,
                    pipeWith(andThen) ([
                        getApiNumbers,
                        getResult,
                        tapLog,
                        length,
                        tapLog,
                        squareNum,
                        tapLog,
                        getDevisionRemainder,
                        tapLog,
                        getApiAnimals,
                        getResult,
                        handleSuccess
                    ])
            )],
            [() => handleError('ValidationError')]
        ])
        
    )(value)

};

export default processSequence;
