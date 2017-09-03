<template>
    <el-dialog v-if="dialogFormVisible.editData.schoolId" :title="'Edit ' + dialogFormVisibles.name"
               :visible.sync="dialogFormVisible.isToggle"
               :before-close="handleClose"
               size="large"
    >
        <el-tabs v-model="activeName">
            <el-tab-pane label="User Edit" name="first">
                <el-row v-if="activeName === 'first'" :gutter="20">
                    <el-col :span="16">
                        <form-edit :formLabelWidth="formLabelWidth" :rules="rules" :dialog="dialogFormVisible.editData"
                                   :isShow="isShow" :courses="courses.all"
                                   :categories="categories.categories"></form-edit>
                    </el-col>
                    <el-col :span="8">
                        <picture-input
                                :prefill="dialogFormVisible.editData.photo.file ? '/images/' +dialogFormVisible.editData.photo.file : ''"
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
                        <button @click.prevent="attemptUpload" v-bind:class="{ disabled: !image }">
                            Upload
                        </button>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="Gallery" name="second">
                <user-gallery v-if="activeName === 'second'" :userId="dialogFormVisible.editData.id"
                              :photos_url="dialogFormVisible.editData.photos"></user-gallery>
            </el-tab-pane>

        </el-tabs>

         <span slot="footer" class="dialog-footer">
   <button class="btn btn-primary" :disabled="notificationDialog" @click="handleClose()">{{'Edit ' + dialogFormVisible.editData.name}}

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
        props: ['pluckSchoolId'],
        data(){
            return {
                activeName: 'first',
                cloneData: '',
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
            exceptStudentId(){
                var vm = this
                return _.filter(vm.pluckSchoolId, function (num) {
                    return num !== vm.cloneData.schoolId
                })
            },
            alertNotification(){
                var vm = this
                return vm.notificationDialog ?  vm.$notify.info({
                    title: 'Info',
                    message: '"The school id has already been taken."'
                }) : false;
            },
            notificationDialog(){
                var vm = this
                return  _.includes(vm.exceptStudentId, vm.dialogFormVisible.editData.schoolId)
            },
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
                vm.cloneData.photo.id === vm.dialogFormVisibles.photo.id &&
                vm.cloneData.name === vm.dialogFormVisibles.name &&
                vm.cloneData.schoolId === vm.dialogFormVisibles.schoolId &&
                vm.cloneData.year === vm.dialogFormVisibles.year : ''
            },
            attemptUpload(){
                var vm = this.dialogFormVisible.editData
                var _this = this
                FormDataUpdate('/api/editPhoto', {avatar: _this.image, id: vm.id})
                        .then(function (response) {
                            _this.dialogFormVisible.editData.photo.file = response.data.photo_name;
                            _this.dialogFormVisible.editData.photo.id = response.data.photo_id;

                        })
                        .catch(function (err) {
                            console.error(err);
                        });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleClose() {
                var vm = this
                if (vm.checkedEdit()) {
                    vm.closeData()
                } else {
                    vm.$confirm('Are you sure to close this dialog without saving it?', 'Info', {
                        confirmButtonText: 'Save',
                        cancelButtonText: 'Cancel',
                        type: 'info'
                    })
                            .then(function () {
                                vm.postData()
                            })
                            .catch(function () {
                                var edit = vm.dialogFormVisible.editData
                                if (edit.category.id != vm.cloneData.category.id) {
                                    edit.category.id = vm.cloneData.category.id
                                }
                                if (edit.course.id != vm.cloneData.course.id) {
                                    edit.course.id = vm.cloneData.course.id
                                }

                                if (edit.name != vm.cloneData.name) {
                                    edit.name = vm.cloneData.name
                                }
                                if (edit.schoolId != vm.cloneData.schoolId) {
                                    edit.schoolId = vm.cloneData.schoolId
                                }
                                if (edit.year != vm.cloneData.year) {
                                    edit.year = vm.cloneData.year
                                }
                                if (edit.photo.id != vm.cloneData.photo.id) {
                                    edit.photo.id = vm.cloneData.photo.id
                                    edit.photo.file = vm.cloneData.photo.file
                                }
                                vm.closeData()
                            });
                }
            },
            closeData(){
                isToggle()
            },
            postData(){
                var _this = this
                var vm = _this.dialogFormVisible.editData
                this.cloneData = _.cloneDeep(this.dialogFormVisible.editData)
                console.log('postData', _this.dialogFormVisible.editData)
                dataUpdate(vm, _this.$notify({
                    title: 'Success',
                    message: 'Edit Successfully',
                    type: 'success'
                }))
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
                var edit = this.dialogFormVisible.editData
                if (edit.photo.id) {
                    edit.photo.file = '';
                    edit.photo.id = '';
                }
            },
        }
    }
</script>