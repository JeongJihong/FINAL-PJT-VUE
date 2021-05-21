<template>
    <div>
        <tr>
            <th>번호</th>
            <td>{{ qna.qnAno }}</td>
        </tr>
        <tr>
            <th>제목</th>
            <td>{{ qna.subject }}</td>
        </tr>
        <tr>
            <th>작성일</th>
            <td>{{ qna.regtime }}</td>
        </tr>
        <tr>
            <th>내용</th>
            <td>{{ qna.content }}</td>
        </tr>
        <tr>
            <th>답변</th>
            <td>{{ qna.answer }}</td>
        </tr>
        <tr>
            <td colspan="2" align="center" class="tfoot tspacial">
                <router-link :to="'/qna/modify/' + qna.qnAno" class="btn btn-sm btn-warning mr-2">수정</router-link>
                <button class="btn btn-sm btn-danger mr-2" @click.prevent="removeQna" :name="qna.qnAno">삭제</button>
            </td>
        </tr>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'QnaListItem',

    props: ['qna'],

    methods: {
        ...mapActions({
            deleteQna: "deleteQna",
        }),

        removeQna() {
            // console.log(this.qna);
            this.deleteQna(this.qna.qnAno);
            this.$router.replace("/");
        },
    },
}
</script>

<style>
</style>