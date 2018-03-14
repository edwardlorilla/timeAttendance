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

                <el-button @click="importWordBook" :loading="loading" type="primary" style="float: right;">
                    Export Report
                </el-button>

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
        <div id="printArea">
            <all-courses class="rows" :sumValue="noStudentCourse"></all-courses>
        </div>
        <attendance-chart class="rows" :dataValue="filteredData"></attendance-chart>
        <time-stat class="rows" :sumValue="sumValue" :lineData="lineData" :lineLabel="lineLabel"
                   :lineValue="lineValue"></time-stat>
    </div>
</template>
<style>
    .rows {
        margin-top: 2vh
    }
</style>
<script>
    import jsPDF from 'jspdf'
    import jspdfAutotable from 'jspdf-autotable'
    import {timeFetch, eventlogs} from './event-log'
    import {workBookReport} from './report/excel'
    export default {
        data(){
            return {
                measure: 'Duration',
                aggregator: 'count',
                data: eventlogs,
                dateFilter: [],
                loading: false,

                lineLabel: [],
                lineData: []
            }
        },
        mounted(){
            timeFetch('/api/times')
        },
        computed: {
            noStudentCourse(){
                var vm = this
                return _(vm.filteredData)
                        .uniqBy('studentId')
                        .groupBy('course')
                        .map(function (items, course) {
                            return {course: !_.isNull(course) ? course : 'Other ', count: items.length}
                        }).value();
            },
            sumValue(){
                var vm = this

                var dataValue = vm.filteredData;
                return _(dataValue).map('Year').uniq().map(function (key) {
                    var duration = vm.$moment.duration(_(dataValue).filter({Year: key}).sumBy('Duration'), 'seconds');
                    var filter = _(dataValue).filter({Year: key});
                    return {
                        key: key,
                        val: filter.sumBy('Duration'),
                        timeValue: vm.$moment.utc(duration._milliseconds).format('HH:mm:ss'),
                        no: filter.size()
                    };
                }).value();
            },

            lineValue(){
                var vm = this
                var name = vm.filteredData;
                var uniq = _.uniqBy(name, 'studentId')
                var countBy = _.countBy(uniq, function (o) {
                    return vm.$moment(o.LocalDate).format('MMMM');
                });
                var data1 = vm.lineLabel;
                var data2 = vm.lineData;
                var array = [];
                for (var key in countBy) {
                    if (countBy.hasOwnProperty(key)) {
                        data1.push(key);
                        data2.push(countBy[key]);
                        array.push({month: key, count: countBy[key]})
                    }
                }

                return array

            },
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
                        LocalDate: data.LocalDate,
                        course: !_.isEmpty(data.course) ? data.course : null,
                        name: data.visitor,
                        studentId: data.schoolId

                    }
                    return obj
                }), 'Year')
            }
        },
        methods: {
            importWordBook(){
                var vm = this
                var pdf = new jsPDF()
                var ctx = document.getElementById("barChart2").getContext("2d");
                // details on this usage of this function:
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing


                // document.body.appendChild(canvas);
                var canvasDataURL = document.getElementById("barChart2").toDataURL("image/png", 1.0);

                //! now we add content to that page!

                const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                const d = new Date();
                pdf.text("Report " + MONTH_NAMES[d.getMonth()], 10, 10);

                pdf.addImage(canvasDataURL, 'PNG', 20, 20, 110, 110);
                for (var i = 0; i < vm.sumValue.length; i++) {
                    pdf.text(`${vm.sumValue[i].key}     ${vm.sumValue[i].timeValue} `, 20 , (i*10) + 150)
                }
                pdf.save("Report " + MONTH_NAMES[d.getMonth()] + ".pdf");


//
//                var doc = new jsPDF()
//                var vm = this
//                var ctx = document.getElementById("pie-chart").getContext("2d");
//                ctx.fillStyle = "rgb(200,0,0)";
//                var image = document.getElementById("pie-chart").toDataURL("image/png");
//
//                vm.loading = true
//                var pick = _.map(vm.sumValue, function (data) {
//                    return _.pick(data, 'key', 'timeValue')
//                })
//                const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
//                    "July", "August", "September", "October", "November", "December"
//                ];
//
//                const d = new Date();
//                doc.text("Report "+ MONTH_NAMES[d.getMonth()], 10, 10);
//
//                doc.addImage(image, 'PNG',15, 40, 100, 100);
//                doc.save("Report "+ MONTH_NAMES[d.getMonth()]+".pdf");
//
//                console.log(pick)
//
            }
        }

    }
</script>
