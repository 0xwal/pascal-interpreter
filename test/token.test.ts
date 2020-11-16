import {expect} from 'chai';
import {Token, TokenType} from '../src/token';


describe('Token', () =>
{

    it('should be exist', async () =>
    {
        expect(Token).to.be.exist;
    });

    describe('"type"', () =>
    {
        it('should be exist', async () =>
        {
            expect(Token.prototype).to.haveOwnProperty('type');
        });

        it('should return the value that we passed via the constructor', async () =>
        {
            expect(new Token(TokenType.PLUS).type).to.equals(TokenType.PLUS);
        });
    });

    describe('"value"', () =>
    {
        it('should be exist', async () =>
        {
            expect(Token.prototype).to.haveOwnProperty('value');
        });

        it('should return the value that we passed via the constructor', async () =>
        {
            expect(new Token(TokenType.PLUS, '+').value).to.equals('+');
        });
    });
});
