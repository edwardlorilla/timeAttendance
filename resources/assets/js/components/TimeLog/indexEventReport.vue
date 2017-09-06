<template>
    <div class="container-fluid">
        <el-row>
            <el-col :span="24">
                <event-report></event-report>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
