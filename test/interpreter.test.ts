import {expect} from 'chai';
import {Interpreter} from '../src/interpreter';
import {Token, TokenType} from '../src/token';
import {InvalidTokenException} from '../src/exceptions/invalid-token.exception';
import {InvalidSyntaxException} from '../src/exceptions/invalid-syntax.exception';


describe('Interpreter', () =>
{

    it('should be exists', async () =>
    {
        expect(Interpreter).to.be.exist;
    });

    describe('position', () =>
    {
        it('should be exist', async () =>
        {
            expect(Interpreter.prototype).to.have.property('position');
        });

        it('should be defaulted to 0', async () =>
        {
            expect(new Interpreter('the_source').position).to.equals(0);
        });
    });

    describe('source', () =>
    {
        it('should be exist', async () =>
        {
            expect(Interpreter.prototype).to.have.property('source');
        });

        it('should be able to assign source in the constructor', async () =>
        {
            expect(new Interpreter('the_source').source).to.equals('the_source');
        });
    });

    describe('nextToken', () =>
    {
        it('should be exist', async () =>
        {
            expect(Interpreter.prototype, 'Method not exist').to.haveOwnProperty('nextToken');
        });

        it('should return instance of "Token"', async () =>
        {
            expect(new Interpreter('').nextToken()).to.be.instanceOf(Token);
        });

        it('should return TokenType.INTEGER when source[position] is a number', async () =>
        {
            expect(new Interpreter('1').nextToken()?.type).to.equals(TokenType.INTEGER);
        });

        it('should return TokenType.PLUS when source[position] is a "+"', async () =>
        {
            expect(new Interpreter('+').nextToken()?.type).to.equals(TokenType.PLUS);
        });

        it('should return TokenType.SUB when source[position] is a "-"', async () =>
        {
            expect(new Interpreter('-').nextToken()?.type).to.equals(TokenType.SUB);
        });

        it('should return TokenType.MUL when source[position] is a "*"', async () =>
        {
            expect(new Interpreter('*').nextToken()?.type).to.equals(TokenType.MUL);
        });

        it('should return TokenType.DIV when source[position] is a "/"', async () =>
        {
            expect(new Interpreter('/').nextToken()?.type).to.equals(TokenType.DIV);
        });

        it('should increment the position', async () =>
        {
            let interpreter = new Interpreter('1');
            expect(interpreter.position).to.equals(0);
            interpreter.nextToken();
            expect(interpreter.position).to.equals(1);
        });

        it('should return TokenType.EOF when reach the end of the source', async () =>
        {
            let interpreter = new Interpreter('');
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.EOF));
        });

        it('should parse the INTEGER to an integer value', async () =>
        {
            let interpreter = new Interpreter('1+2');

            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, 1));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.PLUS, '+'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, 2));
        });

        it('should be tokenize whole source of "1+2"', async () =>
        {
            let interpreter = new Interpreter('1+2');

            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, 1));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.PLUS, '+'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, 2));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.EOF));
        });

        it('should throw an exception when unknown token provided in the source', async () =>
        {
            let interpreter = new Interpreter('@');
            expect(() => interpreter.nextToken()).to.throws(InvalidTokenException, 'Invalid Token: @');
        });

        it('should ignore whitespaces', async () =>
        {
            let interpreter = new Interpreter(' 1 + 2 ');
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, 1));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.PLUS, '+'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, 2));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.EOF));
        });

        it('should handle multiple digits number', async () =>
        {
            let interpreter = new Interpreter('99');
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, 99));
        });
    });

    describe('evaluate', () =>
    {
        it('should be exist', async () =>
        {
            expect(Interpreter.prototype, 'Method is not exist').to.haveOwnProperty('evaluate');
        });

        it('should evaluate the addition and return the result', async () =>
        {
            expect(new Interpreter('1+2').evaluate()).to.equals(3);
            expect(new Interpreter('1 + 2').evaluate()).to.equals(3);
            expect(new Interpreter('20 + 20').evaluate()).to.equals(40);
        });

        it('should evaluate the subtraction and return the result', async () =>
        {
            expect(new Interpreter('3-2').evaluate()).to.equals(1);
            expect(new Interpreter('3 - 2').evaluate()).to.equals(1);
            expect(new Interpreter('20 - 10').evaluate()).to.equals(10);
        });

        it('should evaluate the multiplication and return the result', async () =>
        {
            expect(new Interpreter('3*2').evaluate()).to.equals(6);
            expect(new Interpreter('3 * 2').evaluate()).to.equals(6);
            expect(new Interpreter('20 * 10').evaluate()).to.equals(200);
        });

        it('should evaluate the division and return the result', async () =>
        {
            expect(new Interpreter('4/2').evaluate()).to.equals(2);
            expect(new Interpreter('4 / 2').evaluate()).to.equals(2);
            expect(new Interpreter('20 / 10').evaluate()).to.equals(2);
        });

        it('should be able to calculate arbitrary numbers', async () =>
        {
            expect(new Interpreter('4 + 4 + 2').evaluate()).to.equals(10);
            expect(new Interpreter('6 + 6 + 2 + 1').evaluate()).to.equals(15);
            expect(new Interpreter('6 + 6 - 2').evaluate()).to.equals(10);
            expect(new Interpreter('6 + 6 - 2 - 2').evaluate()).to.equals(8);
            expect(new Interpreter('2 + 2 * 2').evaluate()).to.equals(8);
            expect(new Interpreter('2 * 2 * 2').evaluate()).to.equals(8);
            expect(new Interpreter('2 * 2 / 2 / 1').evaluate()).to.equals(2);
            expect(new Interpreter('8 / 2 / 2').evaluate()).to.equals(2);
        });

        it('should throw an exception when arithmetic structure not valid', async () =>
        {
            expect(() => new Interpreter('4 + 4 +').evaluate()).to.throws(InvalidSyntaxException, 'Invalid syntax');
            expect(() => new Interpreter('4 + 4 /').evaluate()).to.throws(InvalidSyntaxException, 'Invalid syntax');
            expect(() => new Interpreter('4 + 4 *').evaluate()).to.throws(InvalidSyntaxException, 'Invalid syntax');
            expect(() => new Interpreter('4 + 4 -').evaluate()).to.throws(InvalidSyntaxException, 'Invalid syntax');
        });
    });
});
