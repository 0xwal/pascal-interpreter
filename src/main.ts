import readLine from 'readline';
import {Interpreter} from './interpreter';


let rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});


function waitForCommand()
{
    rl.question('> ', (answer: string) =>
    {
        try {
            const interpreter = new Interpreter(answer);
            console.log(interpreter.evaluate());
        } catch (e) {
            console.error(e.message);
        }
        waitForCommand();
    });
}

waitForCommand();
process.on('exit', () =>
{
    rl.close();
    console.log('bye!');
});
