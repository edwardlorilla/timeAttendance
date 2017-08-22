/**
 * Created by Lorilla on 16/08/2017.
 */
function timeFetch(urlFetch) {
    axios.get(urlFetch).then(response => eventlogs.all = _.map(response.data, function (num) {
        var pick = _.pick(num, 'id', 'visitor', 'LocaleDate', 'tempStartTime', 'LocaleEndTime', 'duration','year', 'LocaleDate')
        var object = {
            id: pick.id,
            timeIn: pick.tempStartTime,
            timeOut: _.isEmpty(pick.LocaleEndTime) ? 'not yet finish!' : pick.LocaleEndTime,
            category: !_.isEmpty(pick.visitor.category) ? pick.visitor.category.name : '',
            year: pick.visitor.year,
            visitor: !_.isEmpty(pick.visitor) ? pick.visitor.name : '',
            schoolId: !_.isEmpty(pick.visitor) ? pick.visitor.schoolId : '',
            LocalDate:  pick.LocaleDate ,
            duration:  _.isEmpty(pick.duration)? 'not yet finish' : pick.duration,
        }
        return object
    }))
}
function utcDate() {
    var date = new Date();
    var mon = ('0' + (1 + date.getMonth())).replace(/.?(\d{2})/, '$1')
    return date.toString().replace(/^[^\s]+\s([^\s]+)\s([^\s]+)\s([^\s]+)\s([^\s]+)\s.*$/ig, '$3-' + mon + '-$2 $4')

}

function updateEvent(request) {
    var found = _.findIndex(eventlogs.all, {id: request.id});
    console.log(found)
    if (eventlogs.all[found]) {
        eventlogs.all[found].duration = request.duration
        eventlogs.all[found].timeOut = request.LocaleEndTime
    }
}
import {findId} from './../Visitors/state'
function addEvent(request) {
    console.log(request)
    var user = findId(request.visitor_id)
    var item = request
    var object = {
        id: item.id,
        timeIn: item.tempStartTime,
        timeOut: _.isEmpty(item.LocaleEndTime) ? 'not yet finish!' :item.LocaleEndTime,
        LocaleDate:item.LocaleDate,
        category:user.category ? user.category.name : '' ,
        visitor: !_.isEmpty(user.name) ? user.name : '',
        schoolId: !_.isEmpty(user.schoolId) ? user.schoolId : '',
        year: _.isEmpty(user.year)? 'not yet specified' : user.year,
        duration: _.isEmpty(item.duration)? 'not yet finish' : item.duration,

    }

    console.log(object)
    eventlogs.all.unshift(object)
}

export {utcDate, timeFetch, updateEvent, addEvent}
export var eventlogs = {
    all: []
}