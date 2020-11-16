export class InvalidTokenException extends Error
{
    constructor(token: string)
    {
        super(`Invalid Token: ${token}`);
    }
}
