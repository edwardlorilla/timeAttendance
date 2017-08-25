<template>
    <div class="container">

        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <create-data v-if="state_view.state_view"></create-data>
                <edit-data v-if="isEdit.isToggle"></edit-data>

                <data-tables :custom-filters="customFilters" :data="getData" :actions-def="actionsDef"
                             :checkbox-filter-def="checkFilterDef"
                             :action-col-def="actionColDef">
                    <el-row slot="custom-tool-bar" style="margin-bottom: 10px">
                    <el-col :span="6">
                        <el-select placeholder="Filter Selected Level" v-model="customFilters[2].vals" multiple="multiple">
                            <el-option v-for="(value, index) in pluckLevel" :key="index" :label="level(value)" :value="value"></el-option>
                        </el-select>
                    </el-col>
                        <el-col :span="6">
                        <el-select placeholder="Filter Selected Course" v-model="customFilters[1].vals" multiple="multiple">
                            <el-option v-for="(value, index) in pluckCourses" :key="index" :label="value " :value="value"></el-option>
                        </el-select>
                    </el-col>
                    </el-row>
                    <el-table-column v-for="title in titles" :key="title.label" :prop="title.prop" :label="title.label"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
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
                courses: [],
                isEdit: isEdit,
                data: data,
                state_view: state_view,


                customFilters: [{
                    vals: '',
                    props: 'course',
                }, {
                    vals: []
                },{
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
                var map = _.map(courses, function(num, key){ return !_.isEmpty(num) ?num.course :null });
                var unique = _.uniq(map);
                var pluckFilter = _.filter(unique, function(fil){ return fil == "" ? null : fil  });
                return pluckFilter
            },
            pluckLevel(){
                var courses = this.getData
                var map = _.map(courses, function(num, key){ return !_.isEmpty(num) ?num.year :null });
                var unique = _.uniq(map);
                var pluckFilter = _.filter(unique, function(fil){ return fil == "" ? null : fil  });
                return pluckFilter
            },


            getData(){
                return _.map(this.data.data, function (num) {
                    var pick = _.pick(num, 'id', 'name', 'category', 'year', 'category_id', 'course', 'photos')
                    var object = {
                        id: pick.id,
                        name: pick.name,
                        year: pick.year,
                        category: pick.category ? pick.category.name : '',
                        course: pick.course ? pick.course.course : '',
                        avatar: !_.isEmpty(pick.photos) ?  '/images/' + pick.photos : ''
                    }
                    return object
                })
            }
        },
        methods: {
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
