import {Interpreter} from './interpreter';
import {Token, TokenType} from './token';


const interpreter = new Interpreter('1+5+3');
let token: Token | undefined;
while ((token = interpreter.nextToken())?.type !== TokenType.EOF) {
    console.log(token);
}
