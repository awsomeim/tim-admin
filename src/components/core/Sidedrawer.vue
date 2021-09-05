<template>
    <v-navigation-drawer
        v-model="drawerShown"
        app
        clipped
        color="primary"
        height="100%"
    >
        <v-list dense height="100%">
            <v-img :src="image" height="100%">
                <v-row>
                    <v-divider class="mb-2" />
                    <!-- this section builds the links by use a for loop and iterating through links section
            the v-for iterates through the links in data(), i stands for index
            we use the paths in the links array-->
                    <v-list>
                        <v-list-group
                            v-for="item in links"
                            :key="item.icon"
                            v-model="item.active"
                            :prepend-icon="item.icon"
                            class="ms-4 tertiary--text"
                            no-action
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="item.text"
                                    ></v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item
                                v-for="child in item.children"
                                :key="child.to"
                                :to="child.to"
                            >
                                <v-list-item-title
                                    v-text="child.text"
                                ></v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <v-divider class="mt-2" />
                </v-row>
            </v-img>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "SideDrawer",
    data () {
        return {
            group: false,
            drawerShown: true, /* controls the opening and closing of drawer */
            drawer: this.drawerState, /* this is just here for the watcher to wrok */
            colorWatch: this.color, /* this is just here for the color watcher to wrok */
            activeColor: "secondary",
            alwaysClosed: true, /* controls if side drawer is in temp mode or not */
            links: [
                /* builds the list of links using v-for and this array */
                {
                    to: "/",
                    icon: "mdi-view-dashboard",
                    text: "Home",
                    children: [
                        {
                            to: "/",
                            icon: "mdi-view-dashbaord",
                            text: "分析"
                        },
                        {
                            to: "/data-tables",
                            icon: "mdi-view-dashbaord",
                            text: "登陆"
                        },
                    ]
                },
                {
                    to: "/square",
                    icon: "mdi-account",
                    text: "生活记管理",
                    children: [
                        {
                            to: "/square-list",
                            icon: "mdi-view-dashbaord",
                            text: "生活记列表"
                        },
                    ]
                },
                {
                    to: "/user",
                    icon: "mdi-application",
                    text: "用户管理",
                    children: [
                        {
                            to: "/user-list",
                            icon: "mdi-view-dashbaord",
                            text: "用户列表"
                        },
                    ]
                },
                {
                    to: "/blank",
                    icon: "mdi-ab-testing",
                    text: "Blank",
                },
            ],
        };
    },

    watch: {
        /* watches for changes in drawerState, you cant watch state directly, 
        its assigned to drawer as a work around to indriectly watch the state.
        once it updates, you update drawerShown which is used in v-model for drawer opening/closing */
        drawerState: function () {

            this.drawerShown = this.drawerState;


        },
        /* this watches the Vuex state color, which is assigned to colorWatch which allows you to watch color state indirectly */
        colorWatch: function () {
            this.activeColor = this.color;
        },
        /* when the drawer closes it emits am event with a value of false, that updates drawerShown,
         which causes this to run. its used to udpate vuex state back to false */
        drawerShown () {
            /* this should be replaced with a mutation*/
            this.$store.state.drawertoggle.drawerState = this.drawerShown;
        },
    },
    computed: {
        /* this was used to check state with a getter and setter. Now its used in watcher */
        ...mapState("drawertoggle", ["drawerState", "image", "color"]),
    },
    methods: {
        persistantDrawer () {
            this.alwaysClosed = !this.alwaysClosed;
        },
    },
};
</script>

<style></style>
