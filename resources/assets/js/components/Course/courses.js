/**
 * Created by Lorilla on 19/08/2017.
 */
export var courses = {
    all: []
}
export {fetchCourses}
function fetchCourses(urlFetch) {
    if(_.isEmpty(courses.all)){
        axios.get(urlFetch).then(response => courses.all = response.data)
    }
}