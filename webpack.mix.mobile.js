let mix = require('laravel-mix');

mix.js('resources/assets/js/mobile.js', 'public/js')
    .webpackConfig({
        output: {
            filename: '[name].js',
            path: path.resolve(Config.publicPath),
            chunkFilename: 'async/mobile_[id].js', // 此选项确定非入口块文件的名称
        },
    })
    .sass('resources/assets/sass/mobile.scss', 'public/css');


