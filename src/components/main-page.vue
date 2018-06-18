<template>
    <div class="ui-page" data-role="page" id="main">
        <div class="ui-content">
            <ul class="ui-listview">
                <li @click="navigate('workout')">Start workout</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component
    export default class MainPage extends Vue {
        private navigate(route: string) {
            tau.changePage(route, { transition: 'slide' });
        }
    }
</script>