<template>
    <div class="ui-page" data-role="page" id="workout">
        <div class="ui-content">
            <p>Reps</p>
            <p>{{ reps }}</p>
            <progress ref="progress" class="ui-circle-progress" id="circleprogress" :min="minReps" :max="maxReps" :value="reps"></progress>
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
        private progressBar?: any;

        private minReps = 0;

        private maxReps = 50;

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
            this.$el.addEventListener('pageshow', () => {
                this.progressBar = new tau.widget.CircleProgressBar(this.$refs.progress, { size: "full" });
                document.addEventListener('rotarydetent', this.handleBezelRotate);
            });
            this.$el.addEventListener('pagehide', () => {
                if (this.progressBar) {
                    this.progressBar.destroy();
                }
                document.removeEventListener('rotarydetent', this.handleBezelRotate);
            });
        }

        private handleBezelRotate (e: any) {
            const step = e.detail.direction === "CW" ? 1 : -1;
            this.reps = this.normalizeReps(this.reps + step);
            if (this.progressBar) {
                this.progressBar.value(this.reps);
            }
        }

        private normalizeReps (reps: number) {
            return Math.min(Math.max(reps, this.minReps), this.maxReps);
        }
    }
</script>