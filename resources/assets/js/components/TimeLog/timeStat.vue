<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">Pie Chart</span>
        </div>

        <el-row :gutter="20">
            <el-col :span="16">
                <el-tabs v-model="selectedPaned.tabs" type="border-card">
                    <el-tab-pane name="Pie Chart" label="Pie Chart">
                        <time-pie v-if="selectedPaned.tabs == 'Pie Chart'" :dataSet="sumValue"></time-pie>
                    </el-tab-pane>
                    <el-tab-pane name="Doughnut Chart" label="Doughnut Chart">
                        <time-doughnut v-if="selectedPaned.tabs == 'Doughnut Chart'" :dataSet="sumValue"></time-doughnut>
                    </el-tab-pane>
                    <el-tab-pane name="Line Chart" label="Bar Chart">
                        <time-line v-if="selectedPaned.tabs == 'Line Chart'" type="bar" :dataSet="sumValue"></time-line>
                    </el-tab-pane>
                    <el-tab-pane label="Radar Chart">

                    </el-tab-pane>
                    <el-tab-pane label="Polar Area Chart">Task</el-tab-pane>
                    <el-tab-pane label="Bubble Chart">Task</el-tab-pane>
                    <el-tab-pane label="Scatter Chart">Task</el-tab-pane>
                </el-tabs>

            </el-col>
            <el-col :span="8" >
                <el-table
                        :data="sumValue"
                        style="width: 100%"
                >
                    <el-table-column
                            prop="key"
                            label="Year"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="timeValue"
                            label="Time Spend">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>


    </el-card>
</template>

<script>
    import {view} from './timeStatState'
    export default {
        props:['dataValue'],
        data(){
            return{
                selectedPaned: view
            }
        },
        computed:{

            sumValue(){
                var vm = this
                return _(vm.dataValue).map('Year').uniq().map(function (key) {
                    var duration = vm.$moment.duration(_(vm.dataValue).filter({ Year: key }).sumBy('Duration'), 'seconds');
                    return {
                        key: key,
                        val:  _(vm.dataValue).filter({ Year: key }).sumBy('Duration'),
                        timeValue: vm.$moment.utc(duration._milliseconds).format('HH:mm:ss')
                    };
                }).value();
            }
        }
    }
</script>
