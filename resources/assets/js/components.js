/**
 * Created by Lorilla on 09/08/2017.
 */
window.Vue = require('vue');
import createData from  './components/Visitors/create.vue'
import editData from  './components/Visitors/edit.vue'


// Vue.component('create-data', function (resolve, reject) {
//     setTimeout(function () {
//         resolve(createData)
//     }, 100)
// });
Vue.component('edit-data', function (resolve, reject) {
    setTimeout(function () {
        resolve(editData)
    }, 100)
});