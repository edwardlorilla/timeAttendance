/**
 * Created by Lorilla on 09/08/2017.
 */
const Login = resolve => require(['./components/Auth/_Login.vue'], resolve);
const Visitor = resolve => require(['./components/Visitors/index.vue'], resolve);
const TimeLog = resolve => require(['./components/TimeLog/index.vue'], resolve);
/*const visitorCreate = resolve => require(['./components/Visitors/create.vue'], resolve);
const visitorEdit = resolve => require(['./components/Visitors/edit.vue'], resolve);*/

export default [
    {
        path: '/',
        component: Login,
        name: 'login',
    },
    {
        path: '/visitors/',
        component: Visitor,
        name: 'visitors'
    },
    {
        path: '/timelogs',
        name: 'timelogs',
        component: TimeLog
    }
    
   /* {
        path: '/visitor/:id/edit',
        component: visitorEdit,
        name: 'visitorEdit'
    },
    {
        path: '/visitor/create',
        component: visitorCreate,
        name: 'visitorCreate'
    },*/
]

