<template>
    <el-row :gutter="20">
        <el-col :span="16">
            <el-tabs v-model="selectedPaned.tabs" type="border-card">


                <el-tab-pane label="Year"
                             name="groupByYear">
                    <all-courses-bar v-if="selectedPaned.tabs == 'groupByYear'"
                                     type="bar"
                                     :dataSet="groupByYear">

                    </all-courses-bar>


                </el-tab-pane>
                <el-tab-pane label="Gender"
                             name="groupByGender"
                >
                    <all-courses-bar type="bar" v-if="selectedPaned.tabs == 'groupByGender'"
                                     :dataSet="groupByGender"></all-courses-bar>
                </el-tab-pane>
                <el-tab-pane label="Course"
                             name="groupByCourse"
                >
                    <all-courses-bar type="bar" v-if="selectedPaned.tabs == 'groupByCourse'"
                                     :dataSet="groupByCourse"></all-courses-bar>
                </el-tab-pane>
                <el-tab-pane label="Category"
                             name="groupByCategory"
                >
                    <all-courses-bar type="bar" v-if="selectedPaned.tabs == 'groupByCategory'"
                                     :dataSet="groupByCategory"></all-courses-bar>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="8">
            <el-table
                    :data="selectedData"
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
</template>

<script>
    import {view} from './reportVisitorState'
    export default {
        data(){
            return {
                selectedPaned: view
            }
        },
        computed:{
            selectedData(){
                var vm = this
                var value = []
                if(vm.selectedPaned.tabs == 'groupByYear'){
                    value = vm.groupByYear
                }else if(vm.selectedPaned.tabs == 'groupByGender'){
                    value = vm.groupByGender
                }else if(vm.selectedPaned.tabs == 'groupByCourse'){
                    value = vm.groupByCourse
                }else if(vm.selectedPaned.tabs == 'groupByCategory'){
                    value = vm.groupByCategory
                }
                return value
            }
        },
        props: ['groupByYear', 'groupByGender', 'groupByCourse', 'groupByCategory']
    }
</script>
