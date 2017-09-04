<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">Attendance Chart</span>
        </div>
        <el-row class="tac" :gutter="20">
            <el-col :span="4">
                <el-menu @select="selectedMenu" default-active="0" class="el-menu-vertical-demo">
                    <el-menu-item v-for="(course, index) in groupBy" :key="index" :index="index | toString">
                        {{course.course}}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="12">
                <el-tabs v-model="selectedPaned.tabs" type="border-card" v-if="selectedCourse">
                    <el-tab-pane name="count_log" :label="selectedCourse.course">
                        <el-table
                                v-if="selectedPaned.tabs == 'count_log'"
                                :data="tableBy"
                                height="250"
                                border
                                show-summary
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="Name">
                            </el-table-column>
                            <el-table-column
                                    prop="year"
                                    label="Year"
                                    :filters="[{ text: '1ST YEAR', value: '1ST YEAR' }, { text: '2ND YEAR', value: '2ND YEAR' }]"
                                    :filter-method="filterTag"
                                    filter-placement="bottom-end"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="timeValue"
                                    label="Time Spend">
                            </el-table-column>
                            <el-table-column
                                    prop="noVisit"
                                    label="no. of visit">
                            </el-table-column>

                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane name="Pie Chart" label="Pie Chart">
                        <time-pie v-if="selectedPaned.tabs == 'Pie Chart'" :dataSet="sumValue"></time-pie>
                    </el-tab-pane>
                    <el-tab-pane name="Doughnut Chart" label="Doughnut Chart">
                        <time-doughnut v-if="selectedPaned.tabs == 'Doughnut Chart'"
                                       :dataSet="sumValue"></time-doughnut>
                    </el-tab-pane>
                    <el-tab-pane name="Bar Chart" label="Bar Chart">
                        <time-line v-if="selectedPaned.tabs == 'Bar Chart'" type="bar" :dataSet="sumValue"></time-line>
                    </el-tab-pane>
                    <el-tab-pane name="Line Chart" label="Line Chart">
                        <line-time v-if="selectedPaned.tabs == 'Line Chart'" :download="true" :label="lineLabel"
                                   :dataSet="lineData"></line-time>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="8">
                <el-table
                        :data="lineValue"
                        style="width: 100%"
                >
                    <el-table-column
                            prop="month"
                            label="Month"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="Count of Students">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    import {view} from './attendanceState'
    export default {
        props: ['dataValue'],
        data(){
            return {
                selected: 0,
                selectedPaned: view,
                lineLabel: [],
                lineData: []
            }
        },
        filters: {
            toString(str){
                return _.toString(str)
            }
        },
        computed: {
            lineValue(){
                var vm = this
                if (vm.selectedCourse) {

                    var name = vm.selectedCourse.name;
                    var uniq = _.uniqBy(name, 'studentId')

                    var countBy = _.countBy(uniq, function (o) {
                        return vm.$moment(o.LocalDate).format('MMMM');
                    });
                    var data1 = vm.lineLabel;
                    var data2 = vm.lineData;
                    var array = [];
                    for (var key in countBy) {

                        if (countBy.hasOwnProperty(key)) {
                            array.push({month: key, count: countBy[key]})
                        }
                        if (countBy.hasOwnProperty(key)) {
                            data1.push(key);
                            data2.push(countBy[key]);
                        }

                    }

                    return array
                }


            },
            sumValue(){
                var vm = this
                return _(vm.groupBy[vm.selected].name).map(function (obj) {
                    return obj.Year
                }).uniq().map(function (key) {
                    var duration = vm.$moment.duration(_(vm.groupBy[vm.selected].name).filter({Year: key}).sumBy('Duration'), 'seconds');
                    var filter = _(vm.groupBy[vm.selected].name).filter({Year: key});
                    return {
                        key: key,
                        val: filter.sumBy('Duration'),
                        timeValue: vm.$moment.utc(duration._milliseconds).format('HH:mm:ss'),
                        noVisit: filter.size().toString()
                    };
                }).value();
            },

            groupBy(){
                var vm = this
                return _(vm.dataValue).groupBy(function (x) {
                    return x.course;
                }).map(function (value, key) {
                    return {course: key, name: value};
                }).value();
            },

            tableBy(){
                var vm = this
                return _.reverse(_.sortBy(_(vm.groupBy[vm.selected].name).map(function (obj) {
                    return obj.studentId
                }).uniq().map(function (key) {
                    var duration = vm.$moment.duration(_(vm.groupBy[vm.selected].name).filter({studentId: key}).sumBy('Duration'), 'seconds');
                    var filter = _(vm.groupBy[vm.selected].name).filter({studentId: key});
                    var name =  _(filter).map(function(obj){
                        return obj
                    }).uniq().head();
                    return {
                        key: key,
                        name: name.name,
                        year: name.Year,
                        val: filter.sumBy('Duration'),
                        noVisit: filter.size().toString(),
                        timeValue: vm.$moment.utc(duration._milliseconds).format('HH:mm:ss')
                    };
                }).value(), ['val']))
            },

            selectedCourse(){
                var vm = this;
                return vm.groupBy[vm.selected]
            }

        },
        methods: {
            filterTag(value, row) {
                return row.year === value;
            },
            selectedMenu(selected){
                var vm = this
                vm.selected = selected
                vm.selectedPaned.tabs = 'count_log'
                vm.lineLabel =[]
                vm.lineData= []
            }
        }
    }
</script>
