/**
 * Created by Lorilla on 16/08/2017.
 */
window.Vue = require('vue');
Vue.directive('moment-ago', {
    update (timestamp) {
        this.el.innerHTML = moment(timestamp).fromNow()

        this.interval = setInterval(() => {
            this.el.innerHTML = moment(timestamp).fromNow()
        }, 1000)
    },

    unbind () {
        clearInterval(this.interval)
    }
})