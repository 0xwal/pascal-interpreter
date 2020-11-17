import {Token, TokenType} from './token';
import {InvalidTokenException} from './exceptions/invalid-token.exception';
import {InvalidSyntaxException} from './exceptions/invalid-syntax.exception';


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

        this.cleanWhitespaces();

        const currentChar: string = this.source[this.position];

        if (!currentChar) {
            return new Token(TokenType.EOF);
        }

        if (currentChar >= '0' && currentChar <= '9') {
            let number = this.grabWholeNumber();
            return new Token(TokenType.INTEGER, number);
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

        let arthriticOperators = [TokenType.PLUS, TokenType.SUB, TokenType.MUL, TokenType.DIV];

        while (arthriticOperators.includes(currentToken?.type!)) {

            if (currentToken?.type === TokenType.PLUS) {
                currentToken = this.nextToken();
                if (currentToken?.type !== TokenType.INTEGER) {
                    throw new InvalidSyntaxException();
                }
                result = result + currentToken?.value;
            }

            else if (currentToken?.type === TokenType.SUB) {
                currentToken = this.nextToken();
                if (currentToken?.type !== TokenType.INTEGER) {
                    throw new InvalidSyntaxException();
                }
                result = result - currentToken?.value;
            }

            else if (currentToken?.type === TokenType.MUL) {
                currentToken = this.nextToken();
                if (currentToken?.type !== TokenType.INTEGER) {
                    throw new InvalidSyntaxException();
                }
                result = result * currentToken?.value;
            }

            else if (currentToken?.type === TokenType.DIV) {
                currentToken = this.nextToken();
                if (currentToken?.type !== TokenType.INTEGER) {
                    throw new InvalidSyntaxException();
                }
                result = result / currentToken?.value;
            }
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
}
