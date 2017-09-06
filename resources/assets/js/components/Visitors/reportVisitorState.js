/**
 * Created by Lorilla on 07/09/2017.
 */
export var view ={
    tabs: 'groupByYear'
}
function change_view(state) {
    view.tabs = state
}
export {change_view}