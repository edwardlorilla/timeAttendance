<template>
    <el-dialog :title="'Add ' + categoryTitle.toUpperCase()" :visible.sync="dialogFormVisible.state_view">
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
  <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="postData">{{'Add ' + categoryTitle | ucFirstAllWords }}</el-button>
<el-button @click="resetForm('validateForm')">Reset</el-button>
      <el-button @click="closeData">Cancel</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {change_view, state_view, fetchCategories, category} from './state_view'
    import {data as DATA}from './state'
    export default {

        data(){
            return {
                categories: category,
                dialogFormVisible: state_view,
                formCreated: {
                    name: '',

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
                var vm = this
                var category_id = this.formCreated.category.id
                var categories = this.categories.categories;
                var found = _.findIndex(categories, {id: category_id})

                categories[found] ? this.formCreated.category.name = categories[found].name : ''
                document.title = 'Create ' +this.formCreated.category.name
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
            fetchCategories('api/categories')
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeData(){
                change_view()
            },
            postData(){
                var vm = this

                var addData = this.formCreated;
                axios.post('/api/visitors', {name: addData.name, category_id: addData.category.id, year: addData.year, schoolId: addData.schoolId})
                        .then(function (response) {
                            DATA.data.unshift({id: response.data.data.id , schoolId: addData.schoolId, name: addData.name, category: {name: addData.category.name, id:  addData.category.id }, year: addData.year})
                            vm.$notify({
                                title: 'Success',
                                message: response.data.success,
                                type: 'success'
                            });
                        })
                        .catch(function (error) {

                        });
            }
        }
    }
</script>