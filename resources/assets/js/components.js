/**
 * Created by Lorilla on 09/08/2017.
 */
window.Vue = require('vue');
import createData from  './components/Visitors/create.vue'
import reportVisitor from  './components/Visitors/indexReport.vue'
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
import lineTime from  './components/TimeLog/LineChart'
import attendanceChart from  './components/TimeLog/AttendaceChart.vue'
import allCourses from  './components/TimeLog/allCourses.vue'
import allCoursesBar from  './components/TimeLog/allCoursesBar'
import viewProfile from  './components/Auth/viewProfile.vue'
import loginUser from  './components/Auth/loginUser.vue'
import example from  './components/Example.vue'
import Crosstab from 'vue-crosstab'
import fade from  './components/Transition/fade.vue'
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
Vue.component("line-time", function(resolve){
    setTimeout(function(){
        resolve(lineTime)
    }, 100)
});
Vue.component("attendance-chart", function(resolve){
    setTimeout(function(){
        resolve(attendanceChart)
    }, 100)
});
Vue.component("view-profile", function(resolve){
    setTimeout(function(){
        resolve(viewProfile)
    }, 100)
});

Vue.component('fade', function (resolve, reject) {
    setTimeout(function () {
        resolve(fade)
    }, 100)
})
Vue.component('all-courses', function (resolve, reject) {
    setTimeout(function () {
        resolve(allCourses)
    }, 600)
})
Vue.component('all-courses-bar', function (resolve, reject) {
    setTimeout(function () {
        resolve(allCoursesBar)
    }, 600)
})
Vue.component('report-visitor', function (resolve, reject) {
    setTimeout(function () {
        resolve(reportVisitor)
    }, 600)
})
Vue.component('example', function (resolve, reject) {
    setTimeout(function () {
        resolve(example)
    }, 600)
})
Vue.component('login-user', function (resolve, reject) {
    setTimeout(function () {
        resolve(loginUser)
    }, 600)
})
