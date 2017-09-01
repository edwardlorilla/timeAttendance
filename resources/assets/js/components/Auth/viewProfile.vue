<template>
<div>
    <timeago
            :auto-update="autoUpdate"
            :max-time="86400 * 365"
            :locale="currentLang"
            class="timeago"
            :since="addTd.LocaleStartTime | parseInt">

    </timeago>
    <button @click="finishRow(addTd)" class="w3-button w3-block w3-pink">Start</button>
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
            }
        },
        filters:{
            parseInt(str){
                return parseInt(str)
            }
        }
    }
</script>
