<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 50%;"><el-date-picker
                    v-model="dateFilter"
                    type="daterange"
                    placeholder="Pick a range">
        </el-date-picker></span>
            <!--<el-button style="float: right;" type="primary">Operation button</el-button>-->
        </div>


        <data-tables :data="filteredData" :actions-def="actionsDef" :checkbox-filter-def="checkFilterDef"
                     :action-col-def="actionColDef">
            <el-table-column v-for="(title, index) in titles" :prop="title.prop" :label="title.label" :key="index"
                             sortable="custom">
            </el-table-column>
        </data-tables>
    </el-card>

</template>

<script>
    import {change_view} from './tabs_state'
    import {timeFetch, eventlogs} from './event-log'
    export default {
        data() {
            var _this = this
            return {
                dateFilter: [],
                data: eventlogs,
                titles: [
                    {
                        prop: "category",
                        label: "Category"
                    }, {
                        prop: "schoolId",
                        label: "school ID"
                    },
                    {
                        prop: "visitor",
                        label: "Name:"
                    }, {
                        prop: "timeIn",
                        label: "Time in"
                    }, {
                        prop: "timeOut",
                        label: "Time out"
                    }, {
                        prop: "duration",
                        label: "Duration"
                    }, {
                        prop: "year",
                        label: "Level"
                    }

                ],
                actionsDef: {
                    colProps: {
                        span: 5
                    },
                    def: [{
                        name: 'new',
                        handler: function handler() {
                            change_view('time-tracker')
                        },
                        buttonProps: {
                            type: 'text'
                        }
                    }, {
                        name: 'import',
                        handler: function handler() {
                            _this.$message('import clicked');
                        },
                        icon: 'upload'
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
                        name: "MKD Student"
                    }]
                },
                actionColDef: {
                    label: 'Actions',
                    def: [{
                        handler: function handler(row) {
                            _this.$message('Edit clicked');
                            row.timeIn = "hello word";
                        },
                        name: 'Edit'
                    }, {
                        icon: 'message',
                        type: 'text',
                        handler: function handler(row) {
                            _this.$message('RUA in row clicked');
                            console.log('RUA in row clicked', row);
                        },
                        name: 'RUA'
                    }]
                }
            }
        },
        mounted(){
            timeFetch('/api/times')
        },
        computed: {
            filteredData(){
                var vm = this
                var startDateFilter = vm.dateFilter[0];
                var startDate = new Date(vm.$moment(startDateFilter).format('YYYY-MM-DD'));
                var endDateFilter = vm.dateFilter[1];
                var endDate = new Date(vm.$moment(endDateFilter).format('YYYY-MM-DD'));
                    return  _.filter(vm.data.all, (function(product) {
                        if(_.isEmpty(vm.dateFilter) || (_.isNull(startDateFilter) && _.isNull(endDateFilter)) ){
                            return true
                        }else{
                            var date = new Date(vm.$moment(product.LocalDate).format('YYYY-MM-DD'));
                            return (date >= startDate && date <= endDate);
                        }
                    }))
            }

        },
        methods: {
            getRowActionsDef() {
                let self = this
                return [{
                    type: 'primary',
                    handler(row) {
                        self.$message('Edit clicked')
                        console.log('Edit in row clicked', row)
                    },
                    name: 'Edit'
                }]
            },
            testDate(){
                var vm = this
                var date = new Date(vm.$moment('2017-08-21 16:08:58').format('YYYY-MM-DD'));
                console.log(date)
            }

        }
    }
</script>
