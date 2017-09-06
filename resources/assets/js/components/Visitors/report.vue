<template>
    <div class="container-fluid">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">Report</span>

                    </div>
                    <report-visitor :groupByYear='groupByYear'
                                    :groupByGender="groupByGender"
                                    :groupByCategory="groupByCategory"
                                    :groupByCourse="groupByCourse"
                    ></report-visitor>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {fetch, data} from './state'
    export default {
        data(){
            return {
                data: data,


            }
        },
        filters: {
            formatStr(str){
                var value;
                if (str === 'year') {
                    value = str.toUpperCase()
                } else if (str === 'gender') {
                    value = str.toUpperCase()
                } else if (str === 'category.name') {
                    value = 'category'.toUpperCase()
                } else if (str === 'course.course') {
                    value = 'Course'.toUpperCase()
                }
                return value
            }

        },
        computed: {
            groupByYear(){
                var vm = this, visitorsData = vm.data.data;
                return _(visitorsData)
                        .groupBy('year')
                        .map(function (items, student) {
                            return {course: vm.level(student), count: items.length}
                        }).value();
            },
            groupByGender(){
                var vm = this, visitorsData = vm.data.data;
                return _(visitorsData)
                        .groupBy('gender')
                        .map(function (items, student) {
                            return {course: vm.gender(student), count: items.length}
                        }).value();
            },
            groupByCategory(){
                var vm = this, visitorsData = vm.data.data;
                return _(visitorsData)
                        .groupBy('category.name')
                        .map(function (items, student) {
                            return {course: _.upperCase(student), count: items.length}
                        }).value();
            },
            groupByCourse(){
                var vm = this, visitorsData = vm.data.data;
                return _(visitorsData)
                        .groupBy('course.course')
                        .map(function (items, student) {
                            return {course: student, count: items.length}
                        }).value();
            }
        },
        methods: {
            level(year){
                var level
                if (year == '1') {
                    level = year + 'st year'
                } else if (year == '2') {
                    level = year + 'nd year'
                } else if (year == '3') {
                    level = year + 'rd year'
                } else {
                    level = year + 'th year'
                }
                return level
            },
            gender(str){
                return str === '1' ? 'Male' : 'Female'
            }
        },
        mounted(){
            fetch('/api/visitors')
        }
    }
</script>
