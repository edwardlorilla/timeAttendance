/**
 * Created by Lorilla on 04/09/2017.
 */

function workBookReport(data) {
    axios.post('/api/reportExcel', data).then(function (response) {
        console.log()
        window.open(response.data.data, '_blank');
    })
}

export {workBookReport}