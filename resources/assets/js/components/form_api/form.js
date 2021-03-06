/**
 * Created by Lorilla on 24/08/2017.
 */
function FormDataPost (url, file, name = 'avatar') {
    if (typeof url !== 'string') {
        throw new TypeError(`Expected a string, got ${typeof url}`);
    }

    // You can add checks to ensure the url is valid, if you wish

    const formData = new FormData();
    formData.append(name, file.photo_raw);
    formData.append('course_id', file.course_id);
    formData.append('category_id', file.category_id);
    formData.append('year', file.year);
    formData.append('schoolId', file.schoolId);
    formData.append('name', file.name);
    formData.append('gender_id', file.gender_id);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData, config);
}
function FormDataUpdate (url, file, name = 'avatar') {
    if (typeof url !== 'string') {
        throw new TypeError(`Expected a string, got ${typeof url}`);
    }

    // You can add checks to ensure the url is valid, if you wish

    const formData = new FormData();
    formData.append(name, file.avatar);
    formData.append('id', file.id);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData, config);
}


export {FormDataPost, FormDataUpdate}
