<template>
    <v-data-table
        :headers="table.headers"
        :items="squareList"
        class="elevation-1"
        hide-default-footer
    >
        <template v-slot:item.owner_nickname="{ item }">
            <v-col>
                <v-avatar>
                    <img :src="item.owner_pic" />
                </v-avatar>
                <span>{{ item.owner_nickname }}</span>
            </v-col>
        </template>
        <template v-slot:item.memo="{ item }">
            <div class="memo-container">
                <span>{{ item.memo }}</span>
            </div>
        </template>
        <template v-slot:item.media="{ item }">
            <v-sheet class="mx-auto" elevation="8" max-width="400">
                <v-slide-group
                    v-model="model"
                    class="pa-4"
                    active-class="success"
                    show-arrows
                >
                    <v-slide-item
                        v-for="url in item.media"
                        :key="url"
                        v-slot="{ active, toggle }"
                    >
                        <v-card
                            :color="active ? undefined : 'grey lighten-1'"
                            class="ma-4"
                            height="200"
                            width="100"
                            @click="toggle"
                        >
                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                                <v-img :src="url" />
                            </v-row>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:item.create_time="{ item }">
            {{ item.create_time }}
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
        <template v-slot:footer>
            <div>This is a footer</div>
        </template>
    </v-data-table>
</template>

<script>

import { mapGetters } from 'vuex'

export default {


    data: () => ({
        table: {
            headers: [
                {
                    text: 'User',
                    align: 'start',
                    sortable: 'false',
                    value: 'owner_nickname',
                },
                {
                    text: 'Content',
                    align: 'start',
                    sortable: 'false',
                    value: 'memo',
                },
                {
                    text: 'Images',
                    align: 'start',
                    sortable: 'false',
                    value: 'media',
                },
                {
                    text: 'Time',
                    align: 'start',
                    sortable: 'false',
                    value: 'create_time',
                },
                {
                    text: 'Like Num',
                    align: 'start',
                    sortable: 'false',
                    value: 'like_num',
                },
                {
                    text: 'Reply Num',
                    align: 'start',
                    sortable: 'false',
                    value: 'reply_num',
                },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        },
        dialogDelete: false,
    }),
    computed: {
        ...mapGetters('square', ['squareList']),
    },
    created () {
        this.$store.dispatch('square/load')
    },

    methods: {

    },
};
</script>

<style>
.memo-container {
    max-width: 120px;
}
</style>
