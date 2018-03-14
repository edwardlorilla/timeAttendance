/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import routes from './routes.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import DataTables from 'vue-data-tables'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import components from './components'
import directive from './directive'
import VueTimeago from 'vue-timeago'
import moment from 'moment'
import viewProfile from  './components/Auth/viewProfile.vue'

Object.defineProperty(Vue.prototype, '$moment', {
    get(){
        return this.$root.moment
    }
})

import {Line , Doughnut, Bar, Pie } from 'vue-chartjs'
Vue.use(ElementUI);
Vue.use(DataTables);
locale.use(lang);
Vue.use(VueTimeago, {
    name: 'timeago', // component name, `timeago` by default
    locale: 'en-US',
    locales: {
        // you will need json-loader in webpack 1
        'en-US': require('vue-timeago/locales/en-US.json')
    }
})

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    linkActiveClass: 'active',
    routes: routes
});
const app = new Vue({
    data: {
        moment
    },
    router
}).$mount('#app');