/**
 * Created by Lorilla on 09/08/2017.
 */
const Visitor = resolve => require(['./components/Visitors/index.vue'], resolve);
const indexReportVisitors = resolve => require(['./components/Visitors/report.vue'], resolve);
const TimeLog = resolve => require(['./components/TimeLog/index.vue'], resolve);
const ViewProfile = resolve => require(['./components/Example.vue'], resolve);
const LoginUser = resolve => require(['./components/Auth/loginUser.vue'], resolve);
const eventReport = resolve => require(['./components/TimeLog/indexEventReport.vue'], resolve);
/*const visitorCreate = resolve => require(['./components/Visitors/create.vue'], resolve);
const visitorEdit = resolve => require(['./components/Visitors/edit.vue'], resolve);*/

export default [
    {
        path: '/view-profile',
        component: ViewProfile,
        name: 'view-profile',
    },
    {
        path: '/login-user',
        component: LoginUser,
        name: 'login',
    },

    {
        path: '/visitors/',
        component: Visitor,
        name: 'visitors'
    },
    {
        path: '/report-visitors',
        name: 'reportVisitor',
        component: indexReportVisitors
    },
    {
        path: '/timelogs',
        name: 'timelogs',
        component: TimeLog
    },
    {
        path: '/',
        name: 'eventLog',
        component: eventReport
    },

    
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

