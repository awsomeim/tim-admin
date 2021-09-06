<template>
    <v-container fluid>
        <v-row no-gutters class="mb-2">
            <v-col cols="6">
                <span class="text-h6">生活记列表</span>
            </v-col>
            <v-col cols="6"> </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <v-data-table
                    :headers="table.headers"
                    :items="squareList"
                    class="elevation-1"
                    hide-default-footer
                    :item-class="itemRowBackground"
                >
                    <template v-slot:[`item.owner_nickname`]="{ item }">
                        <div>
                            <v-avatar class="mr-2">
                                <img :src="item.owner_pic" />
                            </v-avatar>
                            <span>{{ item.owner_nickname }}</span>
                        </div>
                    </template>
                    <template v-slot:[`item.memo`]="{ item }">
                        <div class="memo-container">
                            <span>{{ item.memo }}</span>
                        </div>
                    </template>
                    <template v-slot:[`item.media`]="{ item }">
                        <div :elevation="4" style="height: 168px; width: 400px">
                            <v-img
                                v-for="img in item.media"
                                :key="img"
                                :src="img"
                                max-height="168"
                                max-width="64"
                            />
                        </div>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-dialog v-model="dialog" width="600px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon small> mdi-delete </v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5"
                                        >Use Google's location service?</span
                                    >
                                </v-card-title>
                                <v-card-text> 确定要封禁 </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="green darken-1"
                                        text
                                        @click="dialog = false"
                                    >
                                        取消
                                    </v-btn>
                                    <v-btn
                                        color="green darken-1"
                                        text
                                        @click="() => forbit(item)"
                                    >
                                        确定
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                    <template v-slot:[`item.create_time`]="{ item }">
                        {{ item.create_time }}
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="() => {}"> Reset </v-btn>
                    </template>
                    <template v-slot:footer>
                        <v-container style="height: 64px">
                            <v-row>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-end align-center"
                                >
                                    <span>PAGE: {{ page }}</span>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="mr-2"
                                        elevation="2"
                                        small
                                        fab
                                        :class="{
                                            'disable-events': page === 1,
                                        }"
                                        @click="prevPage"
                                    >
                                        <v-icon dark> mdi-chevron-left </v-icon>
                                    </v-btn>
                                    <v-btn
                                        elevation="2"
                                        small
                                        fab
                                        @click="nextPage"
                                    >
                                        <v-icon dark>
                                            mdi-chevron-right
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {


    data: () => ({
        dialog: false,
        model: true,
        page: 1,
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
        // 上一页
        prevPage () {
            if (this.page === 1) {
                return;
            }
            this.page -= 1;
            this.$store.dispatch('square/list', { page: this.page })
        },
        // 下一页
        nextPage () {
            this.page += 1;
            this.$store.dispatch('square/list', { page: this.page })
        },
        // table每行颜色
        itemRowBackground: function (item) {
            let colors = {
                0: 'green lighten-4',
                1: '',
                2: 'red lighten-4',
            }
            return colors[item.status]
        },
        forbit (item) {
            this.dialog = false;
            this.$store.dispatch('square/forbid', { id: item.id });
        }
    },
};
</script>

<style>
.memo-container {
    max-width: 120px;
}
</style>
