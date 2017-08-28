<template>
    <div>
        <el-upload
                class="upload-demo"
                :action="'/api/postPhoto/' + userId"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="photoList"
                :list-type="listType">
            <i v-if="listType === 'picture-card'" class="el-icon-plus"></i>
            <el-button v-else size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
                <el-button @click="listType === 'picture'? listType = 'picture-card' : listType = 'picture'">Toggle
                </el-button>
                jpg/png files with a size less than 500kb
            </div>
        </el-upload>
        <image-preview v-if="dialogVisible.state_view" :dialogImageUrl="dialogImageUrl" ></image-preview>
    </div>
</template>

<script>
    import {change_view, state_view} from './user_gallery_toggle_state'
    import {FormDataUpdate} from './../form_api/form'
    export default {
        props: ['photos_url', 'userId'],
        data(){
            return {
                dialogImageUrl: '',
                dialogVisible: state_view,
                listType: 'picture'
            }
        },
        computed: {
            photoList(){
                return _.map(this.photos_url, function (o) {
                    return {
                        id: o.id,
                        name: o.file,
                        url: '/images/' + o.file
                    }
                })
            }
        },
        methods: {
            handleRemove(file) {
                axios.delete(`/api/photos/${file.id}`).then(function (response) {
                    console.log(response)
                });
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                change_view()
            }
        }
    }
</script>
