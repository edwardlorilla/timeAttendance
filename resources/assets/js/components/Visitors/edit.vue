<template>
    <el-dialog :title="'Edit ' + categoryTitle" :visible.sync="dialogFormVisible.isToggle" _>
        <el-form ref="validateForm" :model="dialogFormVisible.editData">
            <el-form-item label="Name"
                          prop="name"
                          :rules="[
                              { required: true, message: 'The name field is required.', trigger: 'blur' },
                            ]"
                          :label-width="formLabelWidth">
                <el-input v-model="dialogFormVisible.editData.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="showItem" label="School ID" :label-width="formLabelWidth">
                <el-input v-model="dialogFormVisible.editData.schoolId" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="Category" :label-width="formLabelWidth">
                <el-select v-model="dialogFormVisible.editData.category.id" placeholder="Please select a Category">
                    <el-option v-for="category in categories.categories" :key="category.id"
                               :label="category.name | ucFirstAllWords" :value='category.id'></el-option>

                </el-select>
            </el-form-item>

            <el-form-item v-if="showItem" label="Level" :label-width="formLabelWidth">
                <el-select v-model="dialogFormVisible.editData.year" placeholder="Please select a year">
                    <el-option label="1st year" value="1"></el-option>
                    <el-option label="2nd year" value="2"></el-option>
                    <el-option label="3rd year" value="3"></el-option>
                    <el-option label="4th year" value="4"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
  <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="postData">{{'Edit ' + categoryTitle}}</el-button>
<el-button @click="resetForm('validateForm')">Reset</el-button>
      <el-button @click="closeData">Cancel</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {isEdit, isToggle, dataUpdate} from './state'
    import {fetchCategories, category} from './state_view'
    export default {

        data(){
            return {
                categories: category,
                dialogFormVisible: isEdit,
                formLabelWidth: '120px'
            }
        },
        computed: {
            showItem: function () {
                return this.createItem === 3 || this.createItem === 1;
            },
            categoryTitle: function () {
                var vm = this
                var category_id = this.dialogFormVisible.editData.category.id
                var categories = this.categories.categories;
                var found = _.findIndex(categories, {id: category_id})

                categories[found] ? this.dialogFormVisible.editData.category.name = categories[found].name : ''
                document.title = 'Edit ' +this.dialogFormVisible.editData.category.name
                return categories[found] ? categories[found].name : ''
            },
            createItem(){
                var category_id = this.dialogFormVisible.editData.category.id
                return category_id
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
                isToggle()
            },
            postData(){
                var vm = this
                var addData = this.dialogFormVisible, category = vm.category;
                axios.patch('/api/visitors/' + addData.editData.id, {
                    id: addData.editData.id,
                    category_id: addData.editData.category.id,
                    name: addData.editData.name,
                    schoolId: addData.editData.schoolId,
                    year: addData.editData.year
                })

                        .then(function (response) {
                            dataUpdate(addData.editData)
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