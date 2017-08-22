<template>
    <el-dialog :title="'Edit ' + dialogFormVisibles.name"
               :visible.sync="dialogFormVisible.isToggle"
               :before-close="handleClose"
    >
        <el-form ref="validateForm" :model="dialogFormVisible.editData" :rules="rules" label-width="120px">

            <el-form-item label="Name:"  prop="name">
                <el-input v-model="dialogFormVisible.editData.name"></el-input>
            </el-form-item>

            <el-form-item v-if="isShow" label="School ID:" prop="schoolId">
                <el-input v-model="dialogFormVisible.editData.schoolId"></el-input>
            </el-form-item>

            <el-form-item v-if="isShow" label="Course" required>
                <el-select v-model="dialogFormVisible.editData.course.id" placeholder="Please select a Course">
                    <el-option v-for="(course, index) in courses.all" :key="index"
                               :label="course.course" :value='course.id'></el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="Category" required>
                <el-select v-model="dialogFormVisible.editData.category.id" id="Category">
                    <el-option v-for="category in categories.categories" :key="category.id"
                               :label="category.name | ucFirstAllWords" :value='category.id'></el-option>
                </el-select>

            </el-form-item>

            <el-form-item v-if="isShow" label="Year" required>
                <el-select id="year" v-model="dialogFormVisible.editData.year" placeholder="Please select a year">
                    <el-option label="1st year" value="1"></el-option>
                    <el-option label="2nd year" value="2"></el-option>
                    <el-option label="3rd year" value="3"></el-option>
                    <el-option label="4th year" value="4"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
         <span slot="footer" class="dialog-footer">
   <button class="btn btn-primary" @click="postData('validateForm')">{{'Edit ' + dialogFormVisible.editData.name}}

   </button> <el-button @click="closeData">Cancel</el-button><el-button @click="resetForm('validateForm')">Reset</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {isEdit, isToggle, dataUpdate} from './state'
    import {courses, fetchCourses} from './../Course/courses'
    import {fetchCategories, category} from './state_view'
    export default {

        data(){
            return {
                courses: courses,
                categories: category,
                dialogFormVisible: isEdit,
                formLabelWidth: '120px',
                category_id: null,

                rules: {
                    name: [
                        { required: true, message: 'Please input name', trigger: 'blur' },
                    ],
                    schoolId: [
                        { required: true, message: 'Please input school I.D', trigger: 'blur' },
                    ],
                }

            }
        },
        computed: {
            dialogFormVisibles(){
                return this.dialogFormVisible ? this.dialogFormVisible.editData : ''
            },
            isShow(){

                var category_id = this.dialogFormVisibles.category.id;
                var course_id = this.dialogFormVisibles.course.id;
                var courseAll = this.courses.all
                var categories = this.categories.categories;
                var courseFound = _.findIndex(courseAll, {id: course_id});
                var found = _.findIndex(categories, {id: category_id});
                /*
                 * reference the category id and course id and then use that id to find the index of data state.js
                 * */

                /*
                 * and assign each respective data */
                courseAll[courseFound] ? this.dialogFormVisibles.course.course = courseAll[courseFound].course : ''
                categories[found] ? this.dialogFormVisibles.category.name = categories[found].name : '';


                return (this.dialogFormVisibles.category.id == 3) || (this.dialogFormVisibles.category.id == 1)
            },
            isReady(){
                return !_.isEmpty(this.dialogFormVisibles.category.id && this.dialogFormVisibles.course.id && this.dialogFormVisibles.name && this.dialogFormVisibles.schoolId && this.dialogFormVisibles.year)
            }


        },
        filters: {
            ucFirstAllWords(str)
            {
                var pieces = str.split(" ");
                for (var i = 0; i < pieces.length; i++) {
                    var j = pieces[i].charAt(0).toUpperCase();
                    pieces[i] = j + pieces[i].substr(1);
                }
                return pieces.join(" ");
            }
        },
        mounted() {
            fetchCategories('api/categories');
            fetchCourses('api/courses');
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleClose(done) {
                var vm = this
                if(vm.isReady){
                    vm.closeData()
                }
            },
            closeData(){
                isToggle()
            },
            postData(formName){
                var _this = this
                var vm = _this.dialogFormVisible.editData
                _this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        dataUpdate(vm, _this.$notify({
                            title: 'Success',
                            message: 'Edit Successfully',
                            type: 'success'
                        }))
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>