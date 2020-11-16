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
            this._position++;
            return new Token(TokenType.INTEGER, currentChar);
        }

        if (currentChar === '+') {
            this._position++;
            return new Token(TokenType.PLUS, currentChar);
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
                return parseInt(firstNumber?.value!) + parseInt(secondNumber?.value!);
        }
    }
}
