<template>

    <div  id="el">

        <nav class="navbar navbar-default navbar-static-top">
            <!--<nav class="navbar navbar-inverse navbar-static-top">-->
            <div class="container-fluid">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <p class="time shadow" v-text="currentTime"></p>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse" >
                    <!-- Left Side Of Navbar -->

                    <ul  class="nav navbar-nav navbar-right">

                    </ul>
                </div>
            </div>
        </nav>

            <router-view ></router-view>
        </transition>
        <!--<div class="navbar navbar-default navbar-fixed-bottom">
            <div class="container">
                <p class="navbar-text pull-left">Copyright &copy; {{dataDate}}
                </p>


            </div>


        </div>-->

    </div>
</template>
<style>

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    #particles-js {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -10;
    }
</style>

<script>

    export default {
        data(){
            return {
                currentTime: null
            }
        },
        computed:{
            dataDate(){
                var d = new Date();
                var vm = this
                return d.getFullYear()
            }
        },
        methods: {
            updateCurrentTime() {
                this.currentTime = this.$moment().format('MMMM Do YYYY, h:mm:ss a');
            }
        },
        created() {
            var vm = this
            vm.currentTime = this.$moment().format('MMMM Do YYYY, h:mm:ss a');
            setInterval(function () {
                return vm.updateCurrentTime();
            }, 1 * 1000);
        },
        mounted() {
        }
    }
</script>