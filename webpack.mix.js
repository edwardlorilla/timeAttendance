let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    resolve:{
        alias:{
            'vue-router$' : 'vue-router/dist/vue-router.common.js'
        }
    }
})
mix.js('resources/assets/js/bundle.js', 'js/bundle.js')
    .sass('resources/assets/sass/bundle.scss', 'css/bundle.css');
mix.js('resources/assets/js/app.js', 'js/app.js')
    .sass('resources/assets/sass/app.scss', 'css/app.css');

