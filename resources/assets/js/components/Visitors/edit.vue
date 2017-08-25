<template>
    <el-dialog :title="'Edit ' + dialogFormVisibles.name"
               :visible.sync="dialogFormVisible.isToggle"
               :before-close="handleClose"
               size="large"
    >
        <el-row :gutter="20">
            <el-col :span="16">
                <el-form ref="validateForm" :model="dialogFormVisible.editData" :rules="rules" label-width="120px">

                    <el-form-item label="Name:" prop="name">
                        <el-input v-model="dialogFormVisible.editData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender"
                                  prop="gender"
                                  :rules="[
                              { required: true, message: 'The gender field is required.', trigger: 'blur' },
                            ]"
                                  :label-width="formLabelWidth">
                        <el-radio class="radio" v-model="dialogFormVisible.editData.gender" label="1">Male</el-radio>
                        <el-radio class="radio" v-model="dialogFormVisible.editData.gender" label="0">Female</el-radio>
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
                        <el-select id="year" v-model="dialogFormVisible.editData.year"
                                   placeholder="Please select a year">
                            <el-option label="1st year" value="1"></el-option>
                            <el-option label="2nd year" value="2"></el-option>
                            <el-option label="3rd year" value="3"></el-option>
                            <el-option label="4th year" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <picture-input
                        :prefill="dialogFormVisible.editData.photos ? '/images/' +dialogFormVisible.editData.photos : ''"

                        ref="pictureInput"
                        @change="onChanged"
                        @remove="onRemoved"
                        :width="500"
                        :removable="true"
                        removeButtonClass="ui red button"
                        :height="500"
                        accept="image/jpeg, image/png, image/gif"
                        buttonClass="ui button primary"
                        :customStrings="{
  upload: '<h1>Upload it!</h1>',
  drag: 'Drag and drop your image here'}">

                </picture-input>

                <!--<img v-else @click="onRemoved" width="500" :src="'/images/' +dialogFormVisible.editData.photos" :alt="dialogFormVisible.editData.photos">
                <button v-if="dialogFormVisible.editData.photos" @click="onChanged">Change Photo</button>
                <button v-if="dialogFormVisible.editData.photos" @click="onRemoved">Remove Photo</button>-->
                <button @click.prevent="attemptUpload" v-bind:class="{ disabled: !image }">
                    Upload
                </button>
            </el-col>
        </el-row>
        </el-row>
         <span slot="footer" class="dialog-footer">
   <button class="btn btn-primary" @click="postData('validateForm')">{{'Edit ' + dialogFormVisible.editData.name}}

   </button> <el-button @click="closeData">Cancel</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {isEdit, isToggle, dataUpdate} from './state'
    import {courses, fetchCourses} from './../Course/courses'
    import {fetchCategories, category} from './state_view'
    import {FormDataUpdate} from './../form_api/form'
    export default {

        data(){
            return {

                cloneData: null,

                image: '',
                courses: courses,
                categories: category,
                dialogFormVisible: isEdit,
                formLabelWidth: '120px',
                category_id: null,

                rules: {
                    name: [
                        {required: true, message: 'Please input name', trigger: 'blur'},
                    ],
                    schoolId: [
                        {required: true, message: 'Please input school I.D', trigger: 'blur'},
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
            },


        },
        filters: {
            ucFirstAllWords(str)
            {
                return _.upperFirst(str);
            },
            toString(int){
                return _.toString(int)
            }
        },
        mounted() {
            fetchCategories('api/categories');
            fetchCourses('api/courses');
            this.cloneData = _.cloneDeep(this.dialogFormVisible.editData)
        },
        methods: {
            checkedEdit(){
                var vm = this
                return !_.isEmpty(vm.cloneData) ? vm.cloneData.category.id === vm.dialogFormVisibles.category.id &&
                vm.cloneData.course.id === vm.dialogFormVisibles.course.id &&
                vm.cloneData.name === vm.dialogFormVisibles.name &&
                vm.cloneData.schoolId === vm.dialogFormVisibles.schoolId &&
                vm.cloneData.year === vm.dialogFormVisibles.year : ''
            },
            attemptUpload(){
                var vm = this.dialogFormVisible.editData
                var _this = this
                FormDataUpdate('/api/editPhoto', {avatar: _this.image, id: vm.id})
                        .then(function (response) {
                            _this.dialogFormVisible.editData.photos = response.data.photo_name;
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleClose(done) {
                var vm = this
                if (vm.checkedEdit()) {
                    vm.closeData()
                } else {
                    vm.$confirm('Are you sure to close this dialog without saving it?', 'Warning', {
                        confirmButtonText: 'Save',
                        cancelButtonText: 'Cancel',
                        type: 'info'
                    })
                            .then(function () {
                                vm.postData('validateForm')
                            })
                            .catch(function () {
                                var edit = vm.dialogFormVisible.editData
                                console.log(edit.category.id == vm.cloneData.category.id)
                                if (edit.category.id != vm.cloneData.category.id){
                                    edit.category.id = vm.cloneData.category.id
                                }
                                if (edit.course.id != vm.cloneData.course.id){
                                    edit.course.id = vm.cloneData.course.id
                                }

                                if (edit.name != vm.cloneData.name){
                                    console.log('name', vm.cloneData.name)
                                    edit.name = vm.cloneData.name
                                }
                                if (edit.schoolId != vm.cloneData.schoolId){
                                    edit.schoolId = vm.cloneData.schoolId
                                }
                                if (edit.year != vm.cloneData.year){
                                    edit.year = vm.year
                                }
                                vm.closeData()
                            });
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

            },
            onChanged() {
                console.log("New picture loaded");
                if (this.$refs.pictureInput.file) {
                    this.image = this.$refs.pictureInput.file;
                } else {
                    console.log("Old browser. No support for Filereader API");
                }
            },
            onRemoved() {
                this.image = '';
            },
        }
    }
</script>