import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Member from "../views/Member.vue";
import MemberLogin from "../views/MemberLogin.vue";
import MemberInsert from "../views/MemberInsert.vue";
import MemberFindPassword from "../views/MemberFindPassword.vue";
import ArticleList from "../views/ArticleList.vue";
import QnA from "../views/QnA.vue";
import QnAList from "../views/QnAList.vue";
import QnAWrite from "../views/QnAWrite.vue";
import QnAModify from "../views/QnAModify.vue";
import MemberInfo from "../views/MemberInfo.vue";

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
    component: QnA,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: QnAList,
      },
      {
        path: "write",
        name: "qnawrite",
        component: QnAWrite,
      },
      {
        path: "modify/:no",
        name: "qnamodify",
        component: QnAModify,
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
