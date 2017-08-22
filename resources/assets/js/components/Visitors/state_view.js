/**
 * Created by Lorilla on 10/08/2017.
 */

export var state_view = {
    state_view: false,
}

export  var category = {
    categories: []
}

function change_view() {
    var vm = state_view
    vm.state_view = !vm.state_view
}

function fetchCategories(urlFetch) {
    if(_.isEmpty(category.categories)){
        axios.get(urlFetch).then(response => category.categories = response.data)
    }
    
}

export {fetchCategories, change_view}