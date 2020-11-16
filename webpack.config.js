const path = require('path');

function rules()
{
    return [
        {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
    ];
}

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: rules(),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
