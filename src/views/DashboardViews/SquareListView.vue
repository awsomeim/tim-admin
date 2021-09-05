<!-- https://vuetifyjs.com/en/api/v-data-table/#api-props  -->
<template>
    <v-container fill-height> Square List </v-container>
</template>

<script>
export default {
    data: () => ({

        dialogDelete: false,
    }),
    // called when page is created before dom to load data from api
    created () {

        // this.$store.dispatch('autoRefreshToken')
        // .then(response => console.log(response))
        // .catch(error => console.log(error))
    },

    methods: {
        //uses axios to send get request to api in genericAPI

    },
};
</script>

<style>
</style>
