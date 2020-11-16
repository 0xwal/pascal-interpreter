export class Interpreter
{
    constructor(source: string)
    {
        this._source = source;
    }

    _source: string;

    get source()
    {
        return this._source;
    }

    get position(): number
    {
        return 0;
    }

    nextToken()
    {

    }
}
