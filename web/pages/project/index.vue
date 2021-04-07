<template>
    <div class="project-container">
        <v-row>
            <v-col cols="12" sm="6" md="6" lg='4' xl='3' v-for="(item,index) in projects" :key="index">
                <v-card min-height="200" elevation="8" style="display: flex;flex-direction: column;justify-content: space-between;">
                    <v-card-title class="headline">
                        {{item.title}}
                    </v-card-title>
                    <v-card-subtitle>{{item.description}}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn outlined color="purple" :href="item.link">
                            去看看
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            projects: [],
        };
    },
    mounted() {
        this.getProjectList();
    },
    methods: {
        async getProjectList() {
            const res = await this.$axios.get("/projects");
            this.projects = res.data.data;
        },
    },
};
</script>

<style lang='less' scoped>
.project-container {
    height: 100%;
    padding: 3rem 3rem;
    background: linear-gradient(#9795f0, #fbc8d4);
}
@media screen and (max-width: 980px) {
    .project-container {
        padding: 0rem;
    }
}
</style>