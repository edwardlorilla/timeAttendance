/**
 * Created by Lorilla on 09/08/2017.
 */
window.Vue = require('vue');
import createData from  './components/Visitors/create.vue'
import editData from  './components/Visitors/edit.vue'
import portfolioItem from  './components/TimeLog/portfolio-item.vue'
import eventLog from  './components/TimeLog/event-log.vue'
import timeTracker from  './components/TimeLog/timeTracker.vue'


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
