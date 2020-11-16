import {Token, TokenType} from './token';


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
        const currentChar = this.source[this.position];

        if (!isNaN(parseInt(currentChar))) {
            this._position++;
            return new Token(TokenType.INTEGER, currentChar);
        }

        if (currentChar === '+') {
            this._position++;
            return new Token(TokenType.PLUS, currentChar);
        }

        return new Token(TokenType.EOF);
    }
}
