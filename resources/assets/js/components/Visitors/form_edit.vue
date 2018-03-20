<template>
    <el-form ref="validateForm" :model="dialog" :rules="rules" label-width="120px">

        <el-form-item label="Name:" prop="name">
            <el-input v-model="dialog.name"></el-input>
        </el-form-item>
        <el-form-item label="Gender"
                      prop="gender"
                      :rules="[
                              { required: true, message: 'The gender field is required.', trigger: 'blur' },
                            ]"
                      :label-width="formLabelWidth">
            <el-radio class="radio" v-model="dialog.gender" label="1">Male</el-radio>
            <el-radio class="radio" v-model="dialog.gender" label="0">Female</el-radio>
        </el-form-item>
        <el-form-item v-if="isShow" label="School ID:" prop="schoolId">
            <el-input v-model="dialog.schoolId"></el-input>
        </el-form-item>
        <el-form-item v-if="dialog.category.id === 3" label="Course" required>
            <el-select v-model="dialog.course_id" placeholder="Please select a Course">
                <el-option  v-for="(course, index) in courses" :key="index"
                            v-if="course.id > 0 && course.id < 8"
                           :label="course.course" :value='course.id'></el-option>

            </el-select>
        </el-form-item>

        <el-form-item v-if="" label="Category" required>
            <el-select v-model="dialog.category.id" id="Category">
                <el-option  v-for="category in categories" :key="category.id"
                           :label="category.name | ucFirstAllWords" :value='category.id'></el-option>
            </el-select>

        </el-form-item>

        <el-form-item v-if="isShow" label="Year" required>
            <el-select id="year" v-model="dialog.year"
                       placeholder="Please select a year">
                <el-option v-if="dialog.category.id === 3" label="1st year" value="1"/>
                <el-option v-if="dialog.category.id === 3" label="2nd year" value="2"/>
                <el-option v-if="dialog.category.id === 3" label="3rd year" value="3"/>
                <el-option v-if="dialog.category.id === 3" label="4th year" value="4"/>
                <el-option v-if="dialog.category.id === 1 " label="GRADE 11" value="11"/>
                <el-option v-if="dialog.category.id === 1" label="GRADE 12" value="12"/>
                <el-option v-if="dialog.category.id === 4" label="Faculty" value="13"/>
                <el-option v-if="dialog.category.id === 4" label="Admin" value="14"/>
                <el-option v-if="dialog.category.id === 4" label="Board" value="15"/>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        computed:{
            restrictedCategory(){

            }
        },
        props:['formLabelWidth','dialog', 'isShow', 'categories', 'courses', 'rules'],
        filters: {
            ucFirstAllWords(str)
            {
                return _.upperFirst(str);
            }
        },
    }
</script>
