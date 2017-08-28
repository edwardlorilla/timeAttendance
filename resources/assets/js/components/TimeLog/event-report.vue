<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span style="line-height: 36px;"><el-date-picker
                    v-model="dateFilter"
                    type="daterange"
                    placeholder="Pick a range">
        </el-date-picker></span>

            <span style="line-height: 36px; padding-left: 1vh">
                <el-select v-model="measure" placeholder="Select Measure">
                    <el-option
                            v-for="(item, index) in measures"
                            :key="index"
                            :value="item"
                            :label="item">
                    </el-option>
                  </el-select>
            </span>
            <span style="line-height: 36px; padding-left: 1vh">
                <el-select v-model="aggregator" placeholder="Select aggregator">
                    <el-option
                            v-for="(item, index) in aggregators"
                            :key="index"
                            :value="item"
                            :label="item">
                    </el-option>
                  </el-select>
            </span>

                <el-button style="float: right;" type="primary">Operation button</el-button>
            </div>
            <cross-tabs
                    :data="filteredData"
                    :rows="['Category']"
                    :cols="[ 'Year']"
                    :aggregator="aggregator"
                    :cellWidth="200"
                    :height="100 * 4"
                    :measure="measure"
            >

            </cross-tabs>
        </el-card>
        <time-stat style="margin-top: 2vh" :dataValue="filteredData"></time-stat>
    </div>
</template>

<script>
    import {timeFetch, eventlogs} from './event-log'
    export default {
        data(){
            return {
                measure: 'Duration',
                aggregator: 'count',
                data: eventlogs,
                dateFilter: []
            }
        },
        mounted(){
            timeFetch('/api/times')
        },
        computed: {
            fields () {
                return _.reduce(this.filteredData[0], function (memo, value, key) {
                    if (Number.isNaN(Number.parseFloat(value))) {
                        return memo.concat(key);
                    }
                    return memo;
                }, []);
            },
            measures () {
                return _.difference(_.keys(this.filteredData[0]), this.fields)
            },
            aggregators () {
                return ['max', 'min', 'avg', 'sum', 'count']
            },
            filteredData(){
                var vm = this
                var startDateFilter = vm.dateFilter[0];
                var startDate = new Date(vm.$moment(startDateFilter).format('YYYY-MM-DD'));
                var endDateFilter = vm.dateFilter[1];
                var endDate = new Date(vm.$moment(endDateFilter).format('YYYY-MM-DD'));
                return _.filter(vm.dataCapitalize, (function (product) {
                    if (_.isEmpty(vm.dateFilter) || (_.isNull(startDateFilter) && _.isNull(endDateFilter))) {
                        return true
                    } else {
                        var date = new Date(vm.$moment(product.LocalDate).format('YYYY-MM-DD'));
                        return (date >= startDate && date <= endDate);
                    }
                }))
            },

            dataCapitalize(){
                var vm = this
                return _.sortBy(_.map(this.data.all, function (data) {
                    var obj = {
                        Category: _.toUpper(data.category),
                        Duration: vm.$moment.duration(data.duration, "HH:mm:ss").asSeconds(),
                        Year: _.toUpper(data.year),
                        LocalDate: data.LocalDate
                    }
                    return obj
                }), 'Year')
            }
        }

    }
</script>
