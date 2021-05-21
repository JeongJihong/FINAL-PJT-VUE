import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Search from "../views/search/Search.vue";
import Member from "../views/member/Member.vue";
import MemberLogin from "../views/member/MemberLogin.vue";
import MemberInsert from "../views/member/MemberInsert.vue";
import MemberFindPassword from "../views/member/MemberFindPassword.vue";
import MemberInfo from "../views/member/MemberInfo.vue";
import ArticleList from "../views/ArticleList.vue";
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
