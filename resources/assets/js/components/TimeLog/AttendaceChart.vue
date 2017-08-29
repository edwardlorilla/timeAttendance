<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">Attendance Chart</span>
        </div>
        <el-row class="tac" :gutter="20">
            <el-col :span="8">
                <el-menu @select="selectedMenu" default-active="0" class="el-menu-vertical-demo">
                    <el-menu-item v-for="(course, index) in groupBy" :key="index" :index="index | toString">
                        {{course.course}}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="16">
                <el-tabs type="border-card" v-if="selectedCourse"  >
                    <el-tab-pane :label="selectedCourse.course" >
                        <el-table
                                :data="selectedCourse.name"
                                height="250"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="Name">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        props: ['dataValue'],
        data(){
            return {
                selected: 0
            }
        },
        filters: {

            toString(str){
                return _.toString(str)
            }
        },
        computed: {
            groupBy(){
                var vm = this
                return _(vm.dataValue).groupBy(function (x) {
                    return x.course;
                }).map(function (value, key) {
                    return {course: key, name: value};
                }).value();
            },
            selectedCourse(){
                var vm = this;
                return vm.groupBy[vm.selected]
            }

        },
        methods:{
            selectedMenu(selected){
                this.selected = selected
            }
        }
    }
</script>
