import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import CommentList from '../views/CommentList.vue'
import CommentEdit from '../views/CommentEdit.vue'
import MessageList from '../views/MessageList.vue'
import MessageEdit from '../views/MessageEdit.vue'
import NoticeList from '../views/NoticeList.vue'
import NoticeEdit from '../views/NoticeEdit.vue'
import LinkList from '../views/LinkList.vue'
import LinkEdit from '../views/LinkEdit.vue'
import InformationList from '../views/InformationList.vue'
import InformationEdit from '../views/InformationEdit.vue'
import AdminList from '../views/AdminList.vue'
import AdminEdit from '../views/AdminEdit.vue'
import LifeList from '../views/LifeList.vue'
import LifeEdit from '../views/LifeEdit.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home,
    children: [{
        path: '/admin',
        component: Admin
      },
      {
        path: '/article/new',
        component: ArticleEdit
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/article/edit/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/comment/new',
        component: CommentEdit
      },
      {
        path: '/comment/list',
        component: CommentList
      },
      {
        path: '/comment/edit/:id',
        component: CommentEdit,
        props: true
      },
      {
        path: '/message/new',
        component: MessageEdit
      },
      {
        path: '/message/list',
        component: MessageList
      },
      {
        path: '/message/edit/:id',
        component: MessageEdit,
        props: true
      },
      {
        path: '/notice/new',
        component: NoticeEdit
      },
      {
        path: '/notice/list',
        component: NoticeList
      },
      {
        path: '/notice/edit/:id',
        component: NoticeEdit,
        props: true
      },
      {
        path: '/link/new',
        component: LinkEdit
      },
      {
        path: '/link/list',
        component: LinkList
      },
      {
        path: '/link/edit/:id',
        component: LinkEdit,
        props: true
      },
      {
        path: '/information/new',
        component: InformationEdit
      },
      {
        path: '/information/list',
        component: InformationList
      },
      {
        path: '/information/edit/:id',
        component: InformationEdit,
        props: true
      },
      {
        path: '/life/new',
        component: LifeEdit
      },
      {
        path: '/life/list',
        component: LifeList
      },
      {
        path: '/life/edit/:id',
        component: LifeEdit,
        props: true
      },
      {
        path: '/admin/edit',
        component: AdminEdit,
      },
      {
        path: '/admin/list',
        component: AdminList
      },
      {
        path: '/admin/edit/:id',
        component: AdminEdit,
        props: true
      },
    ]
  },
  {
    path: '/login',
    component: Login,
  },
]

const router = new VueRouter({
  routes
})

export default router