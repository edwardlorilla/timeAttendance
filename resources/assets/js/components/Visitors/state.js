/**
 * Created by Lorilla on 09/08/2017.
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

function findIndex(data) {
    console.log(data)
    var vm = this;
    var found = _.findIndex(this.data, data)
    vm.data.editData = vm.data.data[found];
}

function dataUpdate(request) {

    var found = _.findIndex(data.data, {id: request.id})
    data.data[found] = request
}

function deleteData(dataId) {
    var found = _.find(this.data.data, ['id', dataId])
    if (typeof found == 'object') {
        var index = _.indexOf(this.data.data, found)
        this.data.data.splice(index, 1)
    }
}

export var data = {
    data: []
}

export var isEdit = {
    editData: {},
    isToggle: false
}

function isToggle() {
    var vm = isEdit
    vm.isToggle = !vm.isToggle
}

function setEditData(row) {
    var vm = isEdit
    var found = _.findIndex(data.data, {id: row.id})
    vm.editData = data.data[found]
}

export  {
    setEditData, isToggle, fetch, findIndex, dataUpdate, deleteData
}