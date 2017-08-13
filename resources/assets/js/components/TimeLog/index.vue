<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading">Time Logs</div>
                    <div class="panel-body">
                        <el-select  clearable filterable v-model="selectedValue" placeholder="Select">
                            <el-option
                                    v-for="item in data.data"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    :disabled="item.disabled"

                            >
                                <span style="float: left">{{ item.name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.schoolId }}</span>
                            </el-option>
                        </el-select>
                        <el-button type="primary" slot="append" @click="addRow" icon="plus">Add </el-button>
                    </div>

                    <!-- List group -->
                    <ul class="list-group" v-for="(addTd, index) in addRows">
                        <li class="list-group-item">{{addTd.visitor_id}}</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import qs from './qs'
    import {fetch, data} from './../Visitors/state'
    var d = new Date();
    const now = d.getTime()
    var TIME = d.toLocaleTimeString();
    var DATE = d.toLocaleDateString()

    const people = [
        {
            name: 'egoist',
            birth: now - 60000
        },
        {
            name: 'chelly',
            birth: now - 60000 * 22
        },
        {
            name: 'aimer',
            birth: now - 60000 * 102
        },
        {
            name: 'young boy',
            birth: now - 1000
        },
        {
            name: 'old man',
            birth: new Date('2014-01-01')
        }
    ]
    export default {

        data() {

            return {
                data: data,
                selectedValue: null,
                addRows:[]
            };
        },
        mounted() {
            fetch('/api/visitors')
        },
        methods: {
            addRow(){
                var vm = this
                vm.addRows.push({visitor_id: vm.selectedValue, LocaleDate:DATE, LocaleStartTime: TIME,LocaleEndTime: null })
            }
        }
    }
</script>
