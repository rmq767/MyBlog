import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import ArticleEdit from "../views/article//ArticleEdit.vue";
import ArticleList from "../views/article//ArticleList.vue";
import ThemeTypeEdit from "../views/article/ThemeTypeEdit.vue";
import ThemeTypeList from "../views/article/ThemeTypeList.vue";
import CommentList from "../views/article/CommentList.vue";
import CommentEdit from "../views/article/CommentEdit.vue";
import MessageList from "../views/message/MessageList.vue";
import MessageEdit from "../views/message/MessageEdit.vue";
import NoticeList from "../views/notice/NoticeList.vue";
import NoticeEdit from "../views/notice/NoticeEdit.vue";
import LinkList from "../views/link/LinkList.vue";
import LinkEdit from "../views/link/LinkEdit.vue";
import ProjectEdit from "../views/project/ProjectEdit.vue";
import ProjectList from "../views/project/ProjectList.vue";
import InformationEdit from "../views/information/InformationEdit.vue";
import AdminEdit from "../views/information/AdminEdit.vue";
import Login from "../views/Login.vue";
import CommentReplyList from "../views/article/CommentReplyList";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: Home,
		redirect: "/admin",
		children: [
			{
				path: "/admin",
				component: Admin,
			},
			{
				path: "/article/new",
				component: ArticleEdit,
			},
			{
				path: "/article/list",
				component: ArticleList,
			},
			{
				path: "/article/edit/:id",
				component: ArticleEdit,
				props: true,
			},
			{
				path: "/themetype/new",
				component: ThemeTypeEdit,
			},
			{
				path: "/themetype/list",
				component: ThemeTypeList,
			},
			{
				path: "/themetype/edit/:id",
				component: ThemeTypeEdit,
				props: true,
			},
			{
				path: "/comment/new",
				component: CommentEdit,
			},
			{
				path: "/comment/list",
				component: CommentList,
			},
			{
				path: "/commentreply/list",
				component: CommentReplyList,
			},
			{
				path: "/comment/edit/:id",
				component: CommentEdit,
				props: true,
			},
			{
				path: "/message/new",
				component: MessageEdit,
			},
			{
				path: "/message/list",
				component: MessageList,
			},
			{
				path: "/message/edit/:id",
				component: MessageEdit,
				props: true,
			},
			{
				path: "/notice/new",
				component: NoticeEdit,
			},
			{
				path: "/notice/list",
				component: NoticeList,
			},
			{
				path: "/notice/edit/:id",
				component: NoticeEdit,
				props: true,
			},
			{
				path: "/link/new",
				component: LinkEdit,
			},
			{
				path: "/link/list",
				component: LinkList,
			},
			{
				path: "/link/edit/:id",
				component: LinkEdit,
				props: true,
			},
			{
				path: "/project/new",
				component: ProjectEdit,
			},
			{
				path: "/project/list",
				component: ProjectList,
			},
			{
				path: "/project/edit/:id",
				component: ProjectEdit,
				props: true,
			},
			{
				path: "/information/new",
				component: InformationEdit,
			},
			{
				path: "/information/edit/:id",
				component: InformationEdit,
				props: true,
			},
			{
				path: "/admin/edit",
				component: AdminEdit,
			},
		],
	},
	{
		path: "/login",
		component: Login,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
