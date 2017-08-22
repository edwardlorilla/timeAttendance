<template>
    <div>
        <el-form :inline="true">

            <el-form-item>
                <el-select v-model="selectedValue" clearable filterable placeholder="Select">
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

            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" @click="addRow" icon="plus">
                    Add
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="Please input" v-model="searchValue"></el-input>
            </el-form-item>
            <!--<el-checkbox-group  v-model="checkList">-->
            <!--<el-checkbox v-for="pluckYear in pluckYears" :label="pluckYear" :key="pluckYear">{{pluckYear | year_suffix}}</el-checkbox>-->

            <!--</el-checkbox-group>-->
        </el-form>
        <p v-if="!filteredData.length"><strong>No time entries yet</strong></p>
        <!-- List group -->
        <div class="row">

            <portfolio-item v-for="(addTd, index) in filteredData" :finishRow="finishRow"
                            :loading="loading" :autoUpdate="autoUpdate" :currentLang="currentLang"
                            :key="index" :addTd="addTd">

            </portfolio-item>
        </div>
        <!--
        cause an error when cant place in the virtual view
    -->
        {{foundFetch}}
</div>
</template>
<style>

</style>
<script>
    import qs from './qs'
    import {fetch, data, findIndex, found, disableSelected} from './../Visitors/state'
    import {utcDate, updateEvent, addEvent} from './event-log'
    import {timelogs, timeFetch, disableAutoUpdate, addEndTime, addTimeId} from './state'
    var d = new Date();

    export default {

        data() {

            return {
                activeName: 'first',

                searchValue: '',
                autoUpdate: 1,
                currentLang: qs().lang || 'en-US',
                data: data,
                selectedValue: null,
                addRows: timelogs,
                foundUser: found,
                loading: false,
//                categories: '',
//                checkList:[]
            };
        },
        mounted() {
            fetch('/api/visitors')
            timeFetch('/api/times')

        },
        computed: {
            foundFetch(){
                return findIndex(this.selectedValue)
            },
            filteredData () {
                return this.addRows.all.filter(function (country) {
                    return ((!country.LocaleEndTime) && (country.visitor.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1 ||
                    country.visitor.schoolId.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1))
                }.bind(this))
            },

        },

        methods: {
            addRow(){
                var vm = this
                if (vm.foundUser) {
                    var userDetail = vm.foundUser.user
                    disableSelected(userDetail, true)
                }
                vm.loading = true
                var addTime = {
                    id: userDetail ? userDetail.id : '',
                    visitor_id: vm.selectedValue,
                    visitor: {
                        name: userDetail ? userDetail.name : '',
                        schoolId: userDetail ? userDetail.schoolId : '',
                        year: userDetail ? userDetail.year : ''
                    },


                    LocaleDate: this.$moment().format('YYYY-MM-DD'),
                    LocaleStartTime: new Date().getTime() - 1000,
                    LocaleEndTime: null,
                    tempStartTime: utcDate()
                }
                setTimeout(function () {
                    vm.loading = false
                    vm.selectedValue = ''
                    timelogs.all.push(addTime)
                }, 500);
//                'LocaleDate','visitor_id','LocaleStartTime','LocaleEndTime'
                if (addTime) {
                    setTimeout(function () {
                        axios.post('/api/times', {
                            LocaleDate: addTime.LocaleDate,
                            tempStartTime: addTime.tempStartTime,
                            visitor_id: addTime.visitor_id,
                            LocaleStartTime: addTime.LocaleStartTime,
                            LocaleEndTime: addTime.LocaleEndTime,

                        })
                                .then(function (response) {

                                    addEvent(response.data.data)
                                    addTimeId(response.data.data.id, addTime.visitor_id)
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                    }, 500);
                }
            }
            ,
            finishRow(userId)
            {
                addEndTime(userId)
                console.log(userId)
                setTimeout(function () {
                    axios.patch('/api/times/' + userId.id, userId)
                            .then(function (response) {
                                console.log('update', response.data.data)
                                updateEvent(response.data.data)
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }, 500);
            }
        },

    }
</script>
