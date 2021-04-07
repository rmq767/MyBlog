<template>
    <div class="home">
        <el-container style="height: 100vh;">
            <el-aside width="200px" style="background-color: #DCDFE6;overflowX:hidden">
                <el-menu class="el-menu-vertical-demo" router background-color="#DCDFE6" text-color="#333" active-text-color="#61a0a8" :default-active="this.$route.path">
                    <el-menu-item index="/admin">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="article">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">文章</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/article/new">新增文章</el-menu-item>
                            <el-menu-item index="/article/list">文章列表</el-menu-item>
                            <el-menu-item index="/themetype/new">新增主题分类</el-menu-item>
                            <el-menu-item index="/themetype/list">主题分类列表</el-menu-item>
                            <!-- <el-menu-item index="/comment/new">新增评论</el-menu-item> -->
                            <el-menu-item index="/comment/list">评论列表</el-menu-item>
                            <el-menu-item index="/commentreply/list">评论回复列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="message">
                        <template slot="title">
                            <i class="el-icon-chat-dot-square"></i>
                            <span slot="title">留言</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/message/new">添加留言</el-menu-item>
                            <el-menu-item index="/message/list">留言列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="notice">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">公告</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/notice/new">添加公告</el-menu-item>
                            <el-menu-item index="/notice/list">公告列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="links">
                        <template slot="title">
                            <i class="el-icon-link"></i>
                            <span slot="title">学习链接</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/link/new">添加链接</el-menu-item>
                            <el-menu-item index="/link/list">链接列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="projects">
                        <template slot="title">
                            <i class="el-icon-link"></i>
                            <span slot="title">个人项目</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/project/new">添加项目</el-menu-item>
                            <el-menu-item index="/project/list">项目列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="information">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">个人信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/information/new">信息修改</el-menu-item>
                            <el-menu-item index="/admin/edit">账号密码修改</el-menu-item>
                            <!-- <el-menu-item index="/information/list">信息列表</el-menu-item> -->
                        </el-menu-item-group>
                    </el-submenu>
                    <!-- <el-submenu index="admin" v-if="is_super == 1 ? true : false">
                        <template slot="title">
                            <i class="el-icon-edit"></i>
                            <span slot="title">管理员</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin/edit">添加管理员</el-menu-item>
                            <el-menu-item index="/admin/list">管理员列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu> -->
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px;">
                    <el-dropdown @command="handleCommand" trigger="click">
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item command='info'>我的信息</el-dropdown-item> -->
                            <el-dropdown-item command='out'>退出</el-dropdown-item>
                        </el-dropdown-menu>
                        <span>{{ username }}</span>
                    </el-dropdown>
                </el-header>
                <el-main style="background:#fafafa">
                    <router-view :key="$route.path"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import api from "../api";
export default {
    data() {
        return {
            is_super: "",
            username: "",
        };
    },
    methods: {
        handleCommand(val) {
            switch (val) {
                case "info":
                    this.toInfo();
                    break;
                case "out":
                    this.loginOut();
                    break;
                default:
                    break;
            }
        },
        toInfo() {
            this.$router.push({
                path: "/admin/info",
            });
        },
        loginOut() {
            localStorage.removeItem("token");
            this.$router.go(0);
        },
        async fetch() {
            const res = await api.admin.getAdmin();
            this.is_super = res.data.data.is_super;
            this.username = localStorage.getItem("username");
        },
    },
    created() {
        this.fetch();
    },
};
</script>

<style>
.el-header {
    background-color: #dcdfe6;
    color: #333;
    line-height: 60px;
}
</style>
