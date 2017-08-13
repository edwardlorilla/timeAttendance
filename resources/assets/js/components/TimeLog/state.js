/**
 * Created by Lorilla on 13/08/2017.
 */
function fetch(urlFetch) {
    axios.get(urlFetch).then(response => data.data = _.map(response.data, function (num) {
        var pick = _.pick(num, 'id', 'name', 'category', 'year', 'category_id', 'schoolId')
        var object = {
            id: pick.id,
            name: pick.name,
            year: pick.year,
            category: pick.category ? pick.category : '',
            schoolId: pick.schoolId ? pick.schoolId : ''
        }
        return object
    }))
}
export var data = {
    data: []
}
export {fetch, data}