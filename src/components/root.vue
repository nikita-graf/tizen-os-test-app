<template>
    <div class="ui-page ui-page-active" id="main">
        <div class="ui-content ui-content-padding">
            {{count}}
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        data() {
            return {
                count: 0,
            };
        },
        created() {
            document.addEventListener('rotarydetent', (e) => {
                var direction = (e as any).detail.direction;

                if (direction === 'CW') {
                    this.count++;
                } else if (direction === 'CCW') {
                    this.count--;
                }
            });
            
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
    });
</script>