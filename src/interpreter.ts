import {Token, TokenType} from './token';
import {InvalidTokenException} from './exceptions/invalid-token.exception';


export class Interpreter
{
    private readonly _source: string;

    constructor(source: string)
    {
        this._source = source;
        this._position = 0;
    }

    private _position: number;

    get source()
    {
        return this._source;
    }

    public get position(): number
    {
        return this._position;
    }


    nextToken(): Token | undefined
    {

        while (this.source[this.position] === ' ') {
            this._position++;
        }

        const currentChar: string = this.source[this.position];

        if (!currentChar) {
            return new Token(TokenType.EOF);
        }

        if (!isNaN(parseInt(currentChar))) {
            let number = '';
            let tempPosition = this._position;
            let count = 0;
            while (this.source[tempPosition] >= '0' && this.source[tempPosition] <= '9') {
                number += this.source[tempPosition];
                tempPosition++;
                count++;
            }
            this._position += count;
            return new Token(TokenType.INTEGER, parseInt(number));
        }

        if (currentChar === '+') {
            this._position++;
            return new Token(TokenType.PLUS, currentChar);
        }

        if (currentChar === '-') {
            this._position++;
            return new Token(TokenType.SUB, currentChar);
        }

        if (currentChar === '*') {
            this._position++;
            return new Token(TokenType.MUL, currentChar);
        }

        if (currentChar === '/') {
            this._position++;
            return new Token(TokenType.DIV, currentChar);
        }

        throw new InvalidTokenException(currentChar);
    }

    public evaluate()
    {
        let currentToken = this.nextToken();

        let result = currentToken?.value;

        currentToken = this.nextToken();

        while ([TokenType.PLUS, TokenType.SUB, TokenType.MUL, TokenType.DIV].includes(currentToken?.type!)) {

            // if (currentToken?.type === TokenType.PLUS) {
            //     currentToken = this.nextToken();
            //     result = result + currentToken?.value;
            // }
            //
            // else if (currentToken?.type === TokenType.SUB) {
            //     currentToken = this.nextToken();
            //     result = result - currentToken?.value;
            // }
            //
            // else if (currentToken?.type === TokenType.MUL) {
            //     currentToken = this.nextToken();
            //     result = result * currentToken?.value;
            // }
            //
            // else if (currentToken?.type === TokenType.DIV) {
            //     currentToken = this.nextToken();
            //     result = result / currentToken?.value;
            // }
            let op = currentToken?.value;
            currentToken = this.nextToken();
            result = eval(`${result}
            ${op}
            ${currentToken?.value}`);
            currentToken = this.nextToken();
        }

        return result;
    }
}
