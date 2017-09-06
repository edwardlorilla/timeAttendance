/**
 * Created by Lorilla on 16/08/2017.
 */
window.Vue = require('vue');
Vue.directive('print-only', {
    bind: function () {
        var className = 'print-only'
        if (this.el.classList)
            this.el.classList.add(className)
        else
            this.el.className += ' ' + className
    }
})

Vue.directive('print-exclude', {
    bind: function () {
        var className = 'print-exclude'
        if (this.el.classList)
            this.el.classList.add(className)
        else
            this.el.className += ' ' + className
    }
})

Vue.mixin({
    methods: {
        print: function () {
            if (window)
                window.print()
            else
                console.log('Can\'t print outside the browser')
        }
    }
})