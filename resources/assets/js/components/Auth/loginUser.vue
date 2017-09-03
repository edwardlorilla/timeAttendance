<template>
    <div class="container-fluid">



        <div class="w3-content w3-margin-top" style="max-width:1400px;">

        <!-- The Grid -->
        <div class="w3-row-padding">
            <div class="w3-col" style="width:100%">
                <div class="w3-container w3-card w3-margin-bottom">
                    <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-user fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Student I.D</h2>
                    <el-form ref="ruleForm" :inline="true" :rules="rule" :model="formInline"
                             class="demo-form-inline">
                        <el-form-item label="Student I.D" prop="studentid">
                            <el-input v-model="formInline.studentid" placeholder="Student I.D"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">Submit</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>

            <!-- Left Column -->
            <div v-if="isEmpty"  class="w3-third">

                <div class="w3-white w3-text-grey w3-card-4">
                    <div class="w3-display-container">
                        <img :src="formInline.user.photo.file ? '/images/' + formInline.user.photo.file: '/images/img_avatar.png'   " style="width:100%" alt="Avatar">
                        <div class="w3-display-bottomleft w3-container w3-text-black">

                        </div>
                        <hr>
                    </div>

                    <div class="w3-container">
                        <h3><p><i class="fa fa-user fa-fw w3-margin-right w3-large w3-text-teal"></i>
                            {{formInline.user.name}}
                        </p></h3>
                        <p><i class="fa fa-graduation-cap fa-fw w3-margin-right w3-large w3-text-teal"></i>
                        {{formInline.user.category.name === 'mkd student' ? 'College' : 'Senior Highschool'}}</span>
                        </p>
                        <p><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>
                        {{level(formInline.user.year)}}-{{formInline.user.course.description}} ({{formInline.user.course.course}})

                        </p>

                        <hr>


                        <br>
                    </div>
                </div><br>

                <!-- End Left Column -->
            </div>

            <!-- Right Column -->
            <div v-if="isEmpty" class="w3-twothird">
                <el-tabs type="border-card">

                    <el-tab-pane label="Time">
                        <p><i  :class="onStart ? 'fa fa-hourglass-start' :  'fa fa-hourglass-end'" class="fa-fw w3-margin-right w3-large w3-text-teal"></i>
                            <button v-if="!onStart" @click="startTime" class="w3-button w3-block w3-teal">Start</button>
                            <view-profile
                                    v-else
                                    :finishRow="finishTime"
                                    :loading="loading"
                                    :autoUpdate="autoUpdate"
                                    :currentLang="currentLang"
                                    :addTd="formInline.user.time"
                            ></view-profile>
                        </p>

                    </el-tab-pane>
                    <el-tab-pane label="Config">



                    </el-tab-pane>
                    <el-tab-pane label="Role">Role</el-tab-pane>
                    <el-tab-pane label="Task">Task</el-tab-pane>
                </el-tabs>


                <!-- End Right Column -->
            </div>

            <!-- End Grid -->
        </div>

        <!-- End Page Container -->
    </div>





    </div>
</template>

<script>
    import qs from './../TimeLog/qs'
    import {fetch, disableSelected, findStudent} from './../Visitors/state'
    import {timelogs, timeFetch, disableAutoUpdate, addEndTime, addTimeId, findTimeId} from './../TimeLog/state'
    import {utcDate, updateEvent, addEvent} from './../TimeLog/event-log'
    export default {
        data() {
            return {
                timeObj: null,
                autoUpdate: 1,
                currentLang: qs().lang || 'en-US',
                onStart: false,
                loading: false,
                activeName: null,

                formInline: {
                    studentid: '',
                    user: {}
                },
                rule: {
                    studentid: [
                        {required: true, message: 'Please input your Student I.D'},
                        {min: 7, max: 10, message: 'Student ID must be between 7 and 10', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){
            fetch('/api/visitors')
            timeFetch('/api/times')
        },
        computed:{
            isEmpty(){
                var vm = this
                return !_.isEmpty(vm.formInline.user)
            }
        },
        watch: {
            'formInline.studentid'(username) {
                this.setUsername(username);
            },
        },
        methods: {
            setUsername: _.debounce(function (username) {
                if (username) {
                    this.onSubmit('ruleForm');
                }

                if (!username) {
                    this.studentid = null;
                }
            }, 500),

            level(year){
                var level
                if(year == '1'){
                    level = year + 'st year'
                }else if(year == '2'){
                    level = year +  'nd year'
                }else if (year == '3'){
                    level = year +  'rd year'
                }else{
                    level = year +  'th year'
                }
                return level
            },
            startTime(){

                var vm = this
                vm.onStart = true
                if (vm.formInline) {
                    var userDetail = vm.formInline.user

                }
                vm.loading = true
                var addTime = {
                    id: userDetail ? userDetail.id : '',
                    visitor_id:userDetail.id,
                    visitor: {
                        name: userDetail ? userDetail.name : '',
                        schoolId: userDetail ? userDetail.schoolId : '',
                        year: userDetail ? userDetail.year : '',
                        photo: userDetail ? userDetail.photo : '' ,
                    },
                    LocaleDate: this.$moment().format('YYYY-MM-DD'),
                    LocaleStartTime: new Date().getTime() - 1000,
                    LocaleEndTime: null,
                    tempStartTime: utcDate()
                }
                setTimeout(function () {
                    vm.loading = false
                    timelogs.all.push(addTime)
                }, 500);
//                'LocaleDate','visitor_id','LocaleStartTime','LocaleEndTime'
                if (addTime) {
                    setTimeout(function () {
                        axios.post('/api/times', {
                            LocaleDate: addTime.LocaleDate,
                            tempStartTime: addTime.tempStartTime,
                            visitor_id: addTime.visitor_id,
                            LocaleStartTime: addTime.LocaleStartTime,
                            LocaleEndTime: addTime.LocaleEndTime,
                            disabled: 1
                        })
                                .then(function (response) {
                                    console.log(response)
                                    userDetail.time_id = response.data.data.id


                                    addEvent(response.data.data)
                                    addTimeId(response.data.data.id, addTime.visitor_id)
                                    if(userDetail.time_id){
                                        disableSelected(userDetail, 1)
                                        userDetail.time = findTimeId(userDetail.time_id)
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                    }, 500);
                }



            },
            finishTime(userId){
                var vm = this
                vm.onStart = false
                addEndTime(userId)
                disableSelected(userId, 0)
                var obj = userId
                var obj2 = {disabled: 0}
                var defaultObj = _.defaults(obj, obj2);
                setTimeout(function () {
                    axios.patch('/api/times/' + userId.id, defaultObj)
                            .then(function (response) {
                                console.log('update', response.data.data)
                                updateEvent(response.data.data)
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }, 500);
            },
            onSubmit(form) {
                var vm = this

                var formData = vm.formInline.studentid;

                this.$refs[form].validate(function (valid) {
                    if (valid) {

                        vm.formInline.user = findStudent(formData)
                        /*if (vm.foundUser) {

                        }*/

                    }
                })
            }
        }
    }
</script>
