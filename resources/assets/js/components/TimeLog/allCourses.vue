<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{selectedPaned.tabs}} # of Students</span>
        </div>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-tabs @tab-click="handleClick" v-model="selectedPaned.tabs" type="border-card">

                    <el-tab-pane v-if="sumValue.length" name="Bar Chart" label="Bar Chart">
                        <all-courses-bar v-if="selectedPaned.tabs == 'Bar Chart'" type="bar" :dataSet="sumValue"></all-courses-bar>
                    </el-tab-pane>
                </el-tabs>

            </el-col>
            <el-col :span="8">
                <el-table
                        :data="sumValue"
                        show-summary
                        style="width: 100%"
                >
                    <el-table-column
                            prop="course"
                            label="Course"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="Count">
                    </el-table-column>
                </el-table>
            </el-col>


        </el-row>


    </el-card>
</template>

<script>
    import {view} from './allCourseState'
    export default {
        props:['sumValue'],
        data(){
          return{
              selectedPaned: view
            }
        },
        computed: {


        },
        methods:{
            handleClick(){
                var vm = this
                if(!(_.isEmpty(vm.lineLabel) || _.isEmpty(vm.lineLabel))){
                    vm.lineLabel = []
                    vm.lineData = []
                }

            }
        }
    }
</script>
