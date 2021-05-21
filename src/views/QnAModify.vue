<template>
    <div class="container" align="center">
        <div class="col-lg-6" align="center">
            <h2>QnA 작성</h2>
            <div class="form-group" align="left">
                <label for="subject">제목:</label>
                <input type="text" class="form-control" v-model="subject">
            </div>
            <div class="form-group" align="left">
                <label for="content">내용:</label>
                <textarea class="form-control" rows="7" v-model="content"></textarea>
            </div>
            <div class="form-group" align="left">
                <label for="content">답변:</label>
                <textarea class="form-control" rows="10" v-model="answer"></textarea>
            </div>
            <button class="btn btn-primary" @click.prevent="updateQna">글수정</button>
            <router-link to="/qna/list" class="btn btn-warning">취소</router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            qnAno: '',
            subject: '',
            content: '',
            answer: '',
        };
    },

    methods: {
        ...mapActions({
            modifyQna: "modifyQna",
        }),

        updateQna() {
            this.modifyQna({ qnAno: this.qnAno, subject: this.subject, content: this.content, answer: this.answer});
            this.$router.replace("/qna");
        },
    },

    created() {
        let qnaData = this.qnaData;
        //console.log(this.$route.params.no);
        for(let idx in qnaData.list) {
            //console.log(qnaData.list[idx].qnAno);
            if(qnaData.list[idx].qnAno == this.$route.params.no) {
                this.qnAno = qnaData.list[idx].qnAno;
                this.subject = qnaData.list[idx].subject;
                this.content = qnaData.list[idx].content;
                this.answer = qnaData.list[idx].answer;
            }
        }
    },

    computed: {
        ...mapGetters({"qnaData": "qnaData"})
    },
}
</script>

<style>

</style>