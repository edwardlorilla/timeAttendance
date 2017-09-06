<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{selectedPaned.tabs}} # of Time Spends</span>
        </div>

        <el-row :gutter="20">
            <el-col :span="16">
                <el-tabs @tab-click="handleClick" v-model="selectedPaned.tabs" type="border-card">
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
                        <line-time v-if="selectedPaned.tabs == 'Line Chart'" :label="lineLabel"
                                   :dataSet="lineData"></line-time>
                    </el-tab-pane>
                </el-tabs>

            </el-col>
            <el-col :span="8">
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
    import {view} from './timeStatState'
    export default {
        props: ['sumValue','lineValue', 'lineData', 'lineLabel'],
        data(){
            return {
                selectedPaned: view,
            }
        },
        computed: {



        },
        methods: {
            handleClick(){
               /* var vm = this
                if(!(_.isEmpty(vm.lineLabel) || _.isEmpty(vm.lineLabel))){
                    vm.lineLabel = []
                    vm.lineData = []
                }*/

            }
        }
    }
</script>
