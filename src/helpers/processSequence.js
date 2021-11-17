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
import { prop, gt, lt, compose, test, modulo, allPass, partial, partialRight, ifElse, pipeWith, pipe, andThen, tap, length, cond, equals } from 'ramda';

const getResult = prop('result');

const api = new Api();

const getApiAnimals = id => api.get(`https://animals.tech/${id}`, {});
const getApiNumbers = number => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number: number }); 


const isLengthLess10 = length => lt(length, 10);
const isLenghtUp2 = length => gt(length, 2);
const isPositive = number => gt(number, -1);

const isFloatNum = test(/^[0-9]*\.?[0-9]*$/);

const roundNum = number => Math.round(number);
const squareNum = number => Math.pow(number, 2);
const getDevisionRemainder = number => number % 3;

const patialCompose = partialRight(compose, [length]);

const isStrValid = allPass([
    isFloatNum,
    patialCompose(isPositive),
    patialCompose(isLenghtUp2),
    patialCompose(isLengthLess10),
]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const tapToLog = tap(writeLog);
    pipe(
        cond([
            [isStrValid, 
                pipe(
                    parseFloat,
                    roundNum,
                    tapToLog,
                    pipeWith(andThen) ([
                        getApiNumbers,
                        getResult,
                        tapToLog,
                        length,
                        tapToLog,
                        squareNum,
                        tapToLog,
                        getDevisionRemainder,
                        tapToLog,
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
