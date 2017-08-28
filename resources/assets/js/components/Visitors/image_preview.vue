<template>
    <el-dialog v-model="dialogFormVisible.state_view" size="large">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</template>

<script>
    import {state_view} from './user_gallery_toggle_state'
    export default {
        props:['dialogImageUrl'],
        data(){
            return{
                dialogFormVisible: state_view
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
