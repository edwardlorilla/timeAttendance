<template>
    <el-tabs  v-model="selectedPaned.tabs" type="border-card">
        <el-tab-pane name="time-tracker" label="Time Tracker">
            <time-tracker v-if="selectedPaned.tabs == 'time-tracker'"></time-tracker>
        </el-tab-pane>
        <el-tab-pane name="event-log" label="Event Log">
            <event-log v-if="selectedPaned.tabs == 'event-log'"></event-log>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {view} from './tabs_state'
    export default {
        data(){
            return {
                selectedPaned: view
            }
        },
        methods: {

        }
    }
</script>
