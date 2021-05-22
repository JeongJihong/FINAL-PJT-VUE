import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Search from "../views/search/Search.vue";
import Member from "../views/member/Member.vue";
import MemberLogin from "../views/member/MemberLogin.vue";
import MemberInsert from "../views/member/MemberInsert.vue";
import MemberFindPassword from "../views/member/MemberFindPassword.vue";
import MemberInfo from "../views/member/MemberInfo.vue";
import Article from "../views/article/Article.vue";
import ArticleList from "../views/article/ArticleList.vue";
import ArticleModify from "../views/article/ArticleModify.vue";
import ArticleCreate from "../views/article/ArticleCreate.vue";
import ArticleWrite from "../views/article/ArticleWrite.vue";
import Qna from "../views/qna/Qna.vue";
import QnaList from "../views/qna/QnaList.vue";
import QnaModify from "../views/qna/QnaModify.vue";
import QnaCreate from "../views/qna/QnaCreate.vue";
import QnaWrite from "../views/qna/QnaWrite.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/mem",
    name: "mem",
    component: Member,
    redirect: "/mem/mvlogin",
    children: [
      {
        path: "mvlogin",
        name: "mvlogin",
        component: MemberLogin,
      },
      {
        path: "mvinsertmember",
        name: "mvinsertmember",
        component: MemberInsert,
      },
      {
        path: "mvfindpassword",
        name: "mvfindpassword",
        component: MemberFindPassword,
      },
      {
        path: "logout",
        name: "logout",
        component: Home,
      },
      {
        path: "mvuserinfo",
        name: "mvuserinfo",
        component: MemberInfo,
      },
      {
        path: "delete",
        name: "delete",
        component: Home,
      },
    ],
  },
  {
    path: "/qna",
    name: "qna",
    component: Qna,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: QnaList,
      },
      {
        path: "write",
        name: "qnawrite",
        component: QnaWrite,
      },
      {
        path: "create",
        name: "qnacreate",
        component: QnaCreate,
      },
      {
        path: "modify/:no",
        name: "qnamodify",
        component: QnaModify,
      },
      {
        path: "view/:no",
        name: "qnaview",
        component: () => import("@/components/qna/QnaListItem.vue"),
      },
    ],
  },
  {
    path: "/article",
    name: "article",
    component: Article,
    redirect: "/article/list",
    children: [
      {
        path: "list",
        name: "articlelist",
        component: ArticleList,
      },
      {
        path: "write",
        name: "articlewrite",
        component: ArticleWrite,
      },
      {
        path: "create",
        name: "articlecreate",
        component: ArticleCreate,
      },
      {
        path: "modify/:no",
        name: "articlemodify",
        component: ArticleModify,
      },
      {
        path: "view/:no",
        name: "articleview",
        component: () => import("@/components/article/ArticleListItem.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
