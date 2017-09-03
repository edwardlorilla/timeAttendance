/**
 * Created by Lorilla on 13/08/2017.
 */
import {utcDate} from './event-log'
function timeFetch(urlFetch) {
    axios.get(urlFetch).then(response => timelogs.all = _.filter(response.data, function(o) { return o.LocaleEndTime == null; }))
}



function addTimeId(userId, visitor){
    var found = _.findIndex(timelogs.all, {visitor_id: visitor});
    console.log(found)
    timelogs.all[found].id = userId
}

function addEndTime(request){
    var found = _.findIndex(timelogs.all, {id: request.id});
    console.log(request)
    timelogs.all[found].LocaleEndTime = utcDate();
    _.setWith(timelogs.all[found], 'autoUpdate',0 );
}
function findTimeId(id){
    var found = _.findIndex(timelogs.all, {id: id});
    console.log(id)
    return timelogs.all[found]
}
export var timelogs = {
    all: []
}
export {findTimeId,  timeFetch,addEndTime,addTimeId}
