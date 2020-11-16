import {Interpreter} from './interpreter';


const interpreter = new Interpreter('1 + 3');
const result = interpreter.evaluate();
console.log(result);
