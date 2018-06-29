<template>
    <div class="ui-page" data-role="page" id="workout">
        <div class="ui-content">
            <p>Reps</p>
            <p>{{ reps }}</p>
            <progress ref="progress" class="ui-circle-progress" id="circleprogress" max="50" value="0"></progress>
        </div>
        <footer class="ui-footer ui-bottom-button ui-fixed">
		    <button class="ui-btn" @click="handleSave">Save</button>
	    </footer>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Provide } from 'vue-property-decorator';

    @Component
    export default class WorkoutPage extends Vue {
        private slider: any;

        @Provide() reps = 0;
    
        private handleSliderChange (e: Event) {
            if (e.target) {
                this.reps = Number((e.target as HTMLInputElement).value);
            }
        }

        private handleSave () {
            this.reps = 0;
            tau.engine.getRouter().open('main');
        }

        public mounted() {
            const progressBarWidget = new tau.widget.CircleProgressBar(this.$refs.progress, { size: "full" });
            document.addEventListener('rotarydetent', (e: any) => {
                const step = e.detail.direction === "CW" ? 1 : -1;
                this.reps += step;
                progressBarWidget.value(this.reps);
            });
        }
    }
</script>