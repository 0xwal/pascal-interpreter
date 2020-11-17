import {Token, TokenType} from './token';
import {InvalidTokenException, InvalidSyntaxException} from './exceptions';


export class Interpreter
{
    private readonly _source: string;
    private _position: number;

    constructor(source: string)
    {
        this._source = source;
        this._position = 0;
    }

    get source(): string
    {
        return this._source;
    }

    public get position(): number
    {
        return this._position;
    }

    private static isNumber(currentChar: string): boolean
    {
        return currentChar >= '0' && currentChar <= '9';
    }

    nextToken(): Token | undefined
    {

        this.cleanWhitespaces();

        const currentChar: string = this.source[this.position];

        if (!currentChar) {
            return new Token(TokenType.EOF);
        }

        if (Interpreter.isNumber(currentChar)) {
            let number = this.grabWholeNumber();
            return new Token(TokenType.INTEGER, number);
        }

        const arithmeticOperators: any = {
            '+': TokenType.ADD,
            '-': TokenType.SUB,
            '*': TokenType.MUL,
            '/': TokenType.DIV
        };

        if (arithmeticOperators[currentChar] !== undefined) {
            this._position++;
            return new Token(arithmeticOperators[currentChar], currentChar);
        }

        throw new InvalidTokenException(currentChar);
    }

    public evaluate(): any
    {
        let currentToken = this.nextToken();

        let result = currentToken?.value;

        currentToken = this.nextToken();

        const arthriticOperators = [TokenType.ADD, TokenType.SUB, TokenType.MUL, TokenType.DIV];

        const calculator: any = {};
        calculator[TokenType.ADD] = (n: number) => result + n;
        calculator[TokenType.SUB] = (n: number) => result - n;
        calculator[TokenType.MUL] = (n: number) => result * n;
        calculator[TokenType.DIV] = (n: number) => result / n;

        while (arthriticOperators.includes(currentToken?.type!)) {

            const currentOperatorToken = currentToken;

            currentToken = this.giveMeTheIntegerOrPanicIfThereIsNone();

            result = calculator[currentOperatorToken?.type.toString()!](currentToken.value);

            currentToken = this.nextToken();

        }

        return result;
    }

    private grabWholeNumber(): number
    {
        let number = '';
        while (this.source[this.position] >= '0' && this.source[this.position] <= '9') {
            number += this.source[this.position];
            this._position++;
        }
        return parseInt(number);
    }

    private cleanWhitespaces(): void
    {
        while (this.source[this.position] === ' ') {
            this._position++;
        }
    }

    private giveMeTheIntegerOrPanicIfThereIsNone(): Token
    {
        const currentToken = this.nextToken();
        if (currentToken?.type !== TokenType.INTEGER) {
            throw new InvalidSyntaxException();
        }
        return currentToken;
    }
}
