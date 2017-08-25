<template>
    <el-dialog size="large" :title="'Add ' + categoryTitle.toUpperCase()" :visible.sync="dialogFormVisible.state_view">

        <el-row :gutter="20">
            <el-col :span="16">
                <el-form ref="validateForm" :model="formCreated">
                    <el-form-item label="Name"
                                  prop="name"
                                  :rules="[
                              { required: true, message: 'The name field is required.', trigger: 'blur' },
                            ]"
                                  :label-width="formLabelWidth">
                        <el-input v-model="formCreated.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-if="showItem" label="School ID" :label-width="formLabelWidth">
                        <el-input v-model="formCreated.schoolId" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item v-if="showItem" label="Course" :label-width="formLabelWidth">
                        <el-select v-model="formCreated.course.id" placeholder="Please select a Course">
                            <el-option v-for="(course, index) in courses.all" :key="index"
                                       :label="course.course" :value='course.id'></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="Category" :label-width="formLabelWidth">
                        <el-select v-model="formCreated.category.id" placeholder="Please select a Category">
                            <el-option v-for="category in categories.categories" :key="category.id"
                                       :label="category.name | ucFirstAllWords" :value='category.id'></el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="showItem" label="Level" :label-width="formLabelWidth">
                        <el-select v-model="formCreated.year" placeholder="Please select a year">
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


  <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="postData">{{'Add ' + categoryTitle | ucFirstAllWords }}</el-button>
<el-button @click="resetForm('validateForm')">Reset</el-button>
      <el-button @click="closeData">Cancel</el-button>
  </span>
    </el-dialog>
</template>
<style scoped>

</style>

<script>
    import FormDataPost from './../form_api/form'
    import {change_view, state_view, fetchCategories, category} from './state_view'
    import {data as DATA}from './state'
    import {fetchCourses, courses} from './../Course/courses'
    export default {

        data(){
            return {
                image: '',
                courses: courses,
                categories: category,
                dialogFormVisible: state_view,
                formCreated: {
                    name: '',
                    course: {id: 7, course: ''},
                    category: {
                        name: '',
                        id: 3
                    },
                    year: null,
                    schoolId: '',
                },
                formLabelWidth: '120px'
            }
        },
        computed: {
            showItem: function () {
                return this.formCreated.category.id === 3 || this.formCreated.category.id === 1;
            },

            categoryTitle: function () {
                var vm = this;
                var category_id = this.formCreated.category.id;
                var course_id = this.formCreated.course.id;
                var courseAll = this.courses.all
                var categories = this.categories.categories;
                var courseFound = _.findIndex(courseAll, {id: course_id});
                var found = _.findIndex(categories, {id: category_id});
                courseAll[courseFound] ? this.formCreated.course.course = courseAll[courseFound].course : ''
                categories[found] ? this.formCreated.category.name = categories[found].name : '';
                document.title = 'Create ' + this.formCreated.category.name;
                return categories[found] ? categories[found].name : ''
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
            fetchCourses('api/courses')
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeData(){
                change_view()
            },
            postData(){
                var vm = this;

                var addData = this.formCreated;
                FormDataPost('/api/visitors', {
                    name: addData.name,
                    course_id: addData.course.id,
                    category_id: addData.category.id,
                    year: addData.year,
                    schoolId: addData.schoolId,
                    photo_raw: vm.image
                })
                        .then(function (response) {
                            vm.image = ''
                            console.log({course: addData.course.course, id: addData.category.id})
                            DATA.data.unshift({
                                id: response.data.data.id,
                                schoolId: addData.schoolId,
                                name: addData.name,
                                category: {name: addData.category.name, id: addData.category.id},
                                course: {course: addData.course.course, id: addData.category.id},
                                year: addData.year
                            })
                            vm.$notify({
                                title: 'Success',
                                message: 'Create User Successfully',
                                type: 'success'
                            })


                        })
                        .catch(function (error) {

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