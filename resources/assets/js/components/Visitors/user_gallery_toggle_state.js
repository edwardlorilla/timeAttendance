/**
 * Created by Lorilla on 28/08/2017.
 */
function change_view() {
    var vm = state_view
    vm.state_view = !vm.state_view
}
export var state_view = {
    state_view: false,
}
export {change_view}