<template>
    <div class="container-fluid">
            <el-tabs v-model="selectedPaned.tabs" type="border-card">
                <el-tab-pane name="time-tracker" label="Time Tracker">
                    <time-tracker v-show="selectedPaned.tabs == 'time-tracker'"></time-tracker>
                </el-tab-pane>
                <el-tab-pane name="event-log" label="Event Log">
                    <event-log v-if="selectedPaned.tabs == 'event-log'"></event-log>
                </el-tab-pane>
                <el-tab-pane name="event-report" label="Event Report">
                    <event-report v-if="selectedPaned.tabs == 'event-report'"></event-report>
                </el-tab-pane>
            </el-tabs>
    </div>
</template>

<script>
    import {view} from './tabs_state'
    export default {
        data(){
            return {
                selectedPaned: view
            }
        },
        methods: {}
    }
</script>
