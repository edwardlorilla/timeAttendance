/**
 * Created by Lorilla on 09/08/2017.
 */
function fetch(urlFetch) {

    axios.get(urlFetch).then(response => data.data = _.map(response.data, function (num) {
      
        var pick = _.pick(num, 'id', 'name', 'category', 'year', 'category_id', 'schoolId', 'course');
        var object = {
            id: pick.id,
            name: pick.name,
            year: pick.year,
            category: pick.category ? pick.category : '',
            schoolId: pick.schoolId ? pick.schoolId : '',
            course: pick.course ? pick.course : '',
        };
        return object
    }))
}

function findIndex(id) {
    var user = _.findIndex(data.data, {id: id});
    found.user = data.data[user];

}


function findId(id){
    var user =_.findIndex(data.data, {id:id});
    return  data.data[user]
}


function dataUpdate(request, message) {

    var editData = request;
    var user =   _.findIndex(data.data, {id: request.id});



    data.data[user]= request
    axios.patch('/api/visitors/' + editData.id, {
        id: editData.id,
        category_id: editData.category.id,
        name: editData.name,
        schoolId: editData.schoolId,
        year: editData.year,
        course_id: editData.course.id
    })

        .then(function (response) {
            if(response){
                message
            }


        })
        .catch(function (error) {

        });



}

function disableSelected(request, change) {
console.log(request)
    var found = _.findIndex(data.data, {id: request.id});

    _.setWith(data.data[found], 'disabled',change );
}

function deleteData(dataId) {
    var found = _.find(this.data.data, ['id', dataId]);
    if (typeof found == 'object') {
        var index = _.indexOf(this.data.data, found);
        this.data.data.splice(index, 1)
    }
}

export var found = {
    user: null
};

export var data = {
    data: []
};

export var isEdit = {
    editData: {},
    isToggle: false
};

function isToggle() {
    var vm = isEdit;
    vm.isToggle = !vm.isToggle
    return vm.isToggle
}

function setEditData(row) {
    var vm = isEdit
    var found = _.findIndex(data.data, {id: row})
    _.setWith(data.data[found], 'category_id', data.data[found].category.id );
    vm.editData = data.data[found]
}




export  {
    setEditData, isToggle, fetch, findIndex, dataUpdate, deleteData, disableSelected, findId, 
}



