<template>
    <div class="ui-page" data-role="page" id="workout">
        <div class="ui-content">
            <p>Reps</p>
            <p>{{ reps }}</p>
             <input ref="sliderElement" type="range" min="0" max="50" @change="handleSliderChange"/>
        </div>
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

        public mounted() {
            this.slider = new tau.widget.Slider(this.$refs.sliderElement, {
                type: "circle",
                step: 1
            });
            this.slider._onRotary = function (event: any) {
				this.value(this.value() + (event.detail.direction === "CW" ? this._step : -this._step));
			};
            this.slider.value(this.reps);
        }
    }
</script>