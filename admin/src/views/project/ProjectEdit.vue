<template>
    <div>
        <h3>{{ id ? '编辑' : '新建' }}项目</h3>
        <el-form label-width="120px" style="width:45rem;" ref="projectForm" :rules='rules' :model='project'>
            <el-form-item label="标题" prop='title'>
                <el-input v-model="project.title"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop='link'>
                <el-input v-model="project.link"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop='description'>
                <el-input v-model="project.description" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('projectForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from "../../api/index";
export default {
    props: {
        id: {},
    },
    data() {
        return {
            project: {},
            typeOptions: [],
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入题目",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 100,
                        message: "长度在 1 到 100 个字符",
                        trigger: "blur",
                    },
                ],
                link: [
                    {
                        required: true,
                        message: "请输入链接",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 240,
                        message: "长度在 1 到 240 个字符",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "请输入描述",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        async save(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.id) {
                        const res = await api.project.editProject(
                            this.id,
                            this.project
                        );
                        if (res.data.success) {
                            this.$message.success("保存成功");
                            this.$router.push("/project/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    } else {
                        const res = await api.project.addProject(this.project);
                        if (res.data.success) {
                            this.$message.success("添加成功");
                            this.$router.push("/project/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }
                } else {
                    return false;
                }
            });
        },
        async fetch() {
            const res = await api.project.ProjectInfo(this.id);
            this.project = res.data.data;
            this.project = Object.assign({}, this.project, res.data.data); //把 this.project{}中，再把res.data.data添加到{}中，如果有覆盖，没有保存
        },
    },
    created() {
        this.id && this.fetch();
    },
};
</script>

<style>
</style>
