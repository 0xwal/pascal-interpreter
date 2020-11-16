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
        const firstNumber = this.nextToken();
        const operator = this.nextToken();
        const secondNumber = this.nextToken();

        switch (operator?.type) {
            case TokenType.PLUS:
                return firstNumber?.value! + secondNumber?.value!;
            case TokenType.SUB:
                return firstNumber?.value! - secondNumber?.value!;
            case TokenType.MUL:
                return firstNumber?.value! * secondNumber?.value!;
            case TokenType.DIV:
                return firstNumber?.value! / secondNumber?.value!;
        }
    }
}
