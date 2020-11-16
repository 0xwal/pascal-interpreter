import {expect} from 'chai';
import {Interpreter} from '../src/interpreter';
import {Token, TokenType} from '../src/token';
import {InvalidTokenException} from '../src/exceptions/invalid-token.exception';


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

        it('should be tokenize whole source of "1+2"', async () =>
        {
            let interpreter = new Interpreter('1+2');
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, '1'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.PLUS, '+'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, '2'));
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
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, '1'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.PLUS, '+'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.INTEGER, '2'));
            expect(interpreter.nextToken()).to.deep.equals(new Token(TokenType.EOF));
        });
    });

    describe('evaluate', () =>
    {
        it('should be exist', async () =>
        {
            expect(Interpreter.prototype, 'Method is not exist').to.haveOwnProperty('evaluate');
        });

        it('should evaluate and return the result', async () =>
        {
            let interpreter = new Interpreter('1+2');
            expect(interpreter.evaluate()).to.equals(3);
        });
    });
});
