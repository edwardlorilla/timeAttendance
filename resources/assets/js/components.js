/**
 * Created by Lorilla on 09/08/2017.
 */
window.Vue = require('vue');
import createData from  './components/Visitors/create.vue'
import editData from  './components/Visitors/edit.vue'
import editForm from  './components/Visitors/form_edit.vue'
import userGallery from  './components/Visitors/user_gallery.vue'
import imagePreview from  './components/Visitors/image_preview.vue'
import portfolioItem from  './components/TimeLog/portfolio-item.vue'
import eventLog from  './components/TimeLog/event-log.vue'
import eventReport from  './components/TimeLog/event-report.vue'
import timeTracker from  './components/TimeLog/timeTracker.vue'
import timeStat from  './components/TimeLog/timeStat.vue'
import timeBar from  './components/TimeLog/timePie'
import timeLine from  './components/TimeLog/timeLine'
import timeDoughnut from  './components/TimeLog/timeDoughnut'
import Crosstab from 'vue-crosstab'
import pictureUpload from 'vue-picture-input'
import { Bar, Pie } from 'vue-chartjs'
Vue.component('cross-tabs', function (resolve, reject) {
    setTimeout(function () {
        resolve(Crosstab)
    }, 100)
});

Vue.component('create-data', function (resolve, reject) {
    setTimeout(function () {
        resolve(createData)
    }, 100)
});
Vue.component('edit-data', function (resolve, reject) {
    setTimeout(function () {
        resolve(editData)
    }, 100)
});

Vue.component('portfolio-item', function (resolve) {
    setTimeout(function () {
        resolve(portfolioItem)
    }, 100)
});
Vue.component('event-log', function (resolve) {
    setTimeout(function () {
        resolve(eventLog)
    }, 100)
});
Vue.component('time-tracker', function (resolve) {
    setTimeout(function () {
        resolve(timeTracker)
    }, 100)
});
Vue.component('event-report', function (resolve) {
    setTimeout(function () {
        resolve(eventReport)
    }, 100)
});
Vue.component('picture-input', function (resolve) {
    setTimeout(function () {
        resolve(pictureUpload)
    }, 100)
});
Vue.component('form-edit', function (resolve) {
    setTimeout(function () {
        resolve(editForm)
    }, 100)
});
Vue.component('user-gallery', function (resolve) {
    setTimeout(function () {
        resolve(userGallery)
    }, 100)
});
Vue.component('image-preview', function (resolve) {
    setTimeout(function () {
        resolve(imagePreview)
    }, 100)
});
Vue.component('time-stat', function (resolve) {
    setTimeout(function () {
        resolve(timeStat)
    }, 100)
});
Vue.component('time-pie', function (resolve) {
    setTimeout(function () {
        resolve(timeBar)
    }, 100)
});
Vue.component("time-line", function(resolve){
    setTimeout(function(){
        resolve(timeLine)
    }, 100)
});
Vue.component("time-doughnut", function(resolve){
    setTimeout(function(){
        resolve(timeDoughnut)
    }, 100)
});

