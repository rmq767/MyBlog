<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}主题分类</h3>
        <el-form label-width="80px" style="width:600px">
            <el-form-item label="文章主题">
                <el-tag :key="tag" v-for="tag in theme" closable :disable-transitions="false" @close="handleCloseTheme(tag)" style="marginRight:10px">
                    {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible1" v-model="article.theme" ref="theme" size="small" @keyup.enter.native="handleThemeConfirm" @blur="handleThemeConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showTheme">+ 新增文章主题</el-button>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-tag :key="tag" v-for="tag in type" closable :disable-transitions="false" @close="handleCloseType(tag)" style="marginRight:10px">
                    {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible2" v-model="article.type" ref="type" size="small" @keyup.enter.native="handleTypeConfirm" @blur="handleTypeConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showType">+ 新增文章分类</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save()">立即保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {},
    },
    data() {
        return {
            article: {
                theme: "",
                type: "",
            },
            theme: [],
            type: [],
            inputVisible1: false,
            inputVisible2: false,
        };
    },
    methods: {
        save() {
            console.log(this.theme);
            console.log(this.type);
        },
        handleCloseTheme(tag) {
            this.theme.splice(this.theme.indexOf(tag), 1);
        },
        handleCloseType(tag) {
            this.type.splice(this.type.indexOf(tag), 1);
        },
        showTheme() {
            this.inputVisible1 = true;
            this.$nextTick(() => {
                this.$refs.theme.$refs.input.focus();
            });
        },
        showType() {
            this.inputVisible2 = true;
            this.$nextTick(() => {
                this.$refs.type.$refs.input.focus();
            });
        },
        handleThemeConfirm() {
            let inputValue = this.article.theme;
            if (inputValue) {
                this.theme.push(inputValue);
            }
            this.inputVisible1 = false;
            this.article.theme = "";
        },
        handleTypeConfirm() {
            let inputValue = this.article.type;
            if (inputValue) {
                this.type.push(inputValue);
            }
            this.inputVisible2 = false;
            this.article.type = "";
        },
    },
};
</script>

<style>
</style>