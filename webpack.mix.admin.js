let mix = require('laravel-mix');

mix.js('resources/assets/js/app.js', 'public/js')
    .webpackConfig({
        output: {
            filename: '[name].20210310.js',
            path: path.resolve(Config.publicPath),
            chunkFilename: 'async/[id].20210310.js', // 此选项确定非入口块文件的名称
        },
    })
    .sass('resources/assets/sass/app.scss', 'public/css');


