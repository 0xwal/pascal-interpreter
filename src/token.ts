export enum TokenType
{
    INTEGER,
    ADD,
    EOF,
    SUB,
    MUL,
    DIV,
}


export class Token
{
    private readonly _type: TokenType;
    private readonly _value?: any;

    constructor(type: TokenType, value?: any)
    {
        this._type = type;
        this._value = value;
    }

    public get type()
    {
        return this._type;
    }

    public get value()
    {
        return this._value;
    }
}
