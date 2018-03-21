<template>
    <div class="container">

        <div class="row">

            <div class="col-md-10 col-md-offset-1">
                <create-data :pluckSchoolId="pluckSchoolId" v-if="state_view.state_view"></create-data>
                <edit-data :pluckSchoolId="pluckSchoolId" @updateData="updateData($event)" @deleteData="deleteData($event)" v-if="isEdit.isToggle"></edit-data>

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">

                            Visitor Lists

                        </span>
                        <el-button @click="toggleChart = !toggleChart" style="float: right;" type="primary">Toggle
                            Chart
                        </el-button>
                    </div>
                    <time-line v-if="toggleChart" type="bar" :dataSet="chartCourse"></time-line>

                    <data-tables style="margin-top: 2vh"
                                 :custom-filters="customFilters"
                                 :data="getData"
                                 :actions-def="actionsDef"
                                 :checkbox-filter-def="checkFilterDef"
                                 :action-col-def="actionColDef">
                        <el-row slot="custom-tool-bar" style="margin-bottom: 10px">
                            <el-col :span="6">
                                <el-select placeholder="Filter Selected Level"
                                           v-model="customFilters[2].vals"
                                           multiple="multiple">
                                    <el-option v-for="(value, index) in pluckLevel" :key="index" :label="level(value)"
                                               :value="value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select placeholder="Filter Selected Course" v-model="customFilters[0].vals"
                                           multiple="multiple">
                                    <el-option v-for="(value, index) in pluckCourses" :key="index" :label="value "
                                               :value="value"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-table-column v-for="title in titles"
                                         :key="title.label"
                                         :prop="title.prop"
                                         :label="title.label"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </el-card>

            </div>
        </div>
    </div>
</template>

<script>
    import {fetch, data, isEdit, isToggle, setEditData} from './state'
    import {change_view, state_view} from './state_view'
    export default {

        data() {
            var vm = this
            return {
                toggleChart: false,
                courses: [],
                isEdit: isEdit,
                data: data,
                state_view: state_view,
                courseFilter: {
                    data: [],
                    data2: []
                },

                customFilters: [{
                    vals: [],
                    props: 'course',
                }, {
                    vals: []
                }, {
                    vals: '',
                    props: 'year',
                }, {
                    vals: []
                }],
                titles: [{
                    prop: "category",
                    label: "Categorize"
                }, {
                    prop: "name",
                    label: "Name"
                }, {
                    prop: "year",
                    label: "Level"
                }, {
                    prop: "schoolId",
                    label: "School ID"
                }, {
                    prop: "course",
                    label: "Course"
                }],
                actionsDef: {
                    colProps: {
                        span: 5
                    },

                    def: [{

                        name: "new",
                        handler: function handler() {
                            change_view()
                        },
                        buttonProps: {
                            type: "text"
                        }
                    }, {
                        name: "import",
                        handler: function handler() {
                            console.log('import')
                        },
                        icon: "upload"
                    }]
                },
                checkFilterDef: {
                    props: 'category',
                    def: [{
                        code: "teacher",
                        name: "Teacher"
                    }, {
                        code: "senior high",
                        name: "Senior High"
                    }, {
                        code: "outsider",
                        name: "Outsider"
                    }, {
                        code: "mkd student",
                        name: "Mkd Student"
                    }]
                },
                actionColDef: {
                    label: "Actions",
                    def: [{
                        handler: function handler(row) {
                            setEditData(row.id)
                            isToggle()
                        },
                        name: "Edit"
                    }, {
                        icon: "message",
                        type: "text",
                        handler: function handler(row) {
                            console.log('RUA' + row)
                            console.log("RUA in row clicked", row);
                        },
                        name: "RUA"
                    }]
                }
            }
        },
        mounted() {
            fetch('/api/visitors')

        },
        computed: {

            pluckCourses(){
                var courses = this.getData
                var map = _.map(courses, function (num, key) {
                    return !_.isEmpty(num) ? num.course : null
                });
                var unique = _.uniq(map);
                var pluckFilter = _.filter(unique, function (fil) {
                    return fil == "" ? null : fil
                });
                return pluckFilter
            },
            pluckLevel(){
                var courses = this.getData
                var map = _.map(courses, function (num, key) {
                    return !_.isEmpty(num) ? num.year : null
                });
                var unique = _.uniq(map);
                var pluckFilter = _.filter(unique, function (fil) {
                    return fil == "" ? null : fil
                });
                return pluckFilter
            },
            pluckSchoolId(){
                var vm = this
                return _.map(vm.data.data, 'schoolId')

            },


            getData(){
                var vm = this
                return _.map(vm.data.data, function (num) {
                    return {
                        id: num.id,
                        name: num.name,
                        year: vm.level(num.year),
                        category: num.category ? num.category.name : '',
                        course: num.course ? num.course.course : '',
                        avatar: !_.isEmpty(num.photo) ? '/images/' + num.photo.file : {file: null, id: null},
                        schoolId: num.schoolId
                    }
                })
            },

            chartCourse(){
                var vm = this
                var getData = vm.getData;
                var countBy = _.countBy(getData, function (o) {
                    return o.course
                });

                var data1 = vm.courseFilter.data;
                var data2 = vm.courseFilter.data2;
                var array = [];
                for (var key in countBy) {
                    if (countBy.hasOwnProperty(key)) {
                        data1.push(key);
                        data2.push(countBy[key]);
                        array.push({key: key, val: countBy[key]})
                    }
                }
                return array
            },
            pluckYear(){
                var vm = this
                var getData = vm.getData;
                return _.countBy(getData, function (o) {
                    return o.year
                });


            },

        },
        methods: {
            updateData(event){
                var vm = this
                var user = _.findIndex(vm.data.data, {id: event.id});
                vm.$set(vm.data.data, user,  event);
            },deleteData(event){
                var vm = this
                var user = _.findIndex(vm.data.data, {id: event});
                vm.$delete(vm.data.data, user);
            },
            level(year){
                var level
                if (year == '1') {
                    level = year + 'st year'
                } else if (year == '2') {
                    level = year + 'nd year'
                } else if (year == '3') {
                    level = year + 'rd year'
                } else if( year == '4') {
                    level = year + 'th year'
                }else if( year == '11') {
                    level = 'GRADE ' +  year
                }else if( year == '12') {
                    level = 'GRADE ' +  year
                }else if( year == '13') {
                    level = 'FACULTY'
                }else if( year == '14') {
                    level = 'ADMINISTRATOR'
                }else if( year == '15') {
                    level = 'BOARD'
                }
                return level
            },
            getRowActionsDef() {
                let self = this
                return [{
                    type: 'primary',
                    handler(row) {
                        console.log('Edit clicked')
                        console.log('Edit in row clicked', row)
                    },
                    name: 'Edit'
                }]
            }
        }
    }
</script>
