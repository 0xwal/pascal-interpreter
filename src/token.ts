export enum TokenType
{
    INTEGER,
    PLUS,
    EOF
}


export class Token
{
    private readonly _type: TokenType;
    private readonly _value?: string;

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
