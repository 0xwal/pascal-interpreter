import {expect} from 'chai';
import {Interpreter} from '../src/interpreter';


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
    });
});
