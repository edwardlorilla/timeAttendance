<template>

    <div class="col-lg-4 col-sm-6 portfolio-item">
        <div class="list-group-item card h-100">


            <a href="#"><img class="card-img-top" width="200px"
                             :src="addTd.visitor.photo ? '/images/' +  addTd.visitor.photo.file : 'http://placehold.it/700x400'" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">
                    <a href="#">{{addTd.visitor.name}}</a>
                    <el-button :loading="loading" type="primary"
                               @click="finishRow(addTd)">
                        <i class='glyphicon glyphicon-check'></i>
                        Finish

                    </el-button>
                    <h4 class="list-group-item-text ">
                        <i class='glyphicon glyphicon-time'></i>
                        <timeago
                                @maxMinute="finishRow(addTd)"
                                :auto-update="addTd.autoUpdate ?  addTd.autoUpdate  : autoUpdate"
                                :max-time="maxTime"
                                :locale="currentLang"
                                class="timeago"
                                :since="addTd.LocaleStartTime | parseInt">

                        </timeago>
                    </h4>
                </h4>
                <p class="card-text">School ID: {{addTd.visitor.schoolId}}</p>

                <h4 class="card-text">{{addTd.visitor.year | year_suffix}}</h4>
            </div>
        </div>
    </div>
</template>
<style scoped>
    body {
        padding-top: 54px;
    }

    @media (min-width: 992px) {
        body {
            padding-top: 56px;
        }
    }

    .portfolio-item {
        margin-bottom: 30px;
    }
</style>
<script>

    var d = new Date();
    const now = d.getTime()
    var TIME = d.toLocaleTimeString();

    export default {
        props: ['addTd','currentLang', 'autoUpdate','loading', 'finishRow'],
        data() {

            return {
                maxTime: 1800
            };
        },
        filters: {
            year_suffix(year){
                var level
                if (year == 1) {
                    level = year + 'st year'
                } else if (year == 2) {
                    level = year + 'nd year'
                } else if (year == 3) {
                    level = year + 'rd year'
                } else if( year == 4) {
                    level = year + 'th year'
                }else if( year == 11) {
                    level = 'GRADE ' +  year
                }else if( year == 12) {
                    level = 'GRADE ' +  year
                }else if( year == 13) {
                    level = 'FACULTY'
                }else if( year == 14) {
                    level = 'ADMINISTRATOR'
                }else if( year == 15) {
                    level = 'BOARD'
                }
                return level
            },
            parseInt(str){
                return parseInt(str)
            }
        },
    }
</script>
