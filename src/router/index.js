import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Member from "../views/Member.vue";
import MemberLogin from "../views/MemberLogin.vue";
import MemberInsert from "../views/MemberInsert.vue";
import MemberFindPassword from "../views/MemberFindPassword.vue";
import MemberInfo from "../views/MemberInfo.vue";
import ArticleList from "../views/ArticleList.vue";
import Qna from "../views/qna/Qna.vue";
import QnaList from "../views/qna/QnaList.vue";
import QnaModify from "../views/qna/QnaModify.vue";
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
    path: "/article/list",
    name: "articlelist",
    component: ArticleList,
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
        path: "modify/:no",
        name: "qnamodify",
        component: QnaModify,
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
