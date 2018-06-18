<template>
    <div>
        <main-page/>
        <workout-page/>
    </div>
</template>

<script lang="ts">
    import WorkoutPage from './workout-page.vue'
    import MainPage from './main-page.vue'
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component({
        components: {
            MainPage,
            WorkoutPage
        }
    })
    export default class Root extends Vue {
        public created() {
            window.addEventListener("tizenhwkey", function (ev) {
                var activePopup = null,
                    page = null,
                    pageid = "";

                if ((ev as any).keyName === "back") {
                    activePopup = document.querySelector(".ui-popup-active");
                    page = document.getElementsByClassName("ui-page-active")[0];
                    pageid = page ? page.id : "";

                    if (pageid === "main" && !activePopup) {
                        try {
                            tizen.application.getCurrentApplication().exit();
                        } catch (ignore) {
                        }
                    } else {
                        window.history.back();
                    }
                }
            });
        }
    }
</script>