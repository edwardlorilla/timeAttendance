<template>
<div>
    <timeago
            v-if="addTd.time"
            :auto-update="autoUpdate"
            :max-time="maxTime"
            :locale="currentLang"
            class="timeago"
            :since="addTd.time.LocaleStartTime | parseInt">

    </timeago>
    <!--<button @click="finishRow(addTd.time)" class="w3-button w3-block w3-pink">Finish</button>-->
</div>
</template>

<script>
    var d = new Date();
    const now = d.getTime()
    var TIME = d.toLocaleTimeString();

    export default {
        props: ['addTd','currentLang', 'autoUpdate','loading', 'finishRow'],
        data(){
            return{
                maxTime: 1800,
            }
        },

        filters:{
            parseInt(str){
                return parseInt(str)
            }
        }
    }
</script>
