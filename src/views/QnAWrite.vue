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
            <button class="btn btn-primary" @click.prevent="writeQna">글작성</button>
            <router-link to="/qna/list" class="btn btn-warning">취소</router-link>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            subject: '',
            content: '',
            answer: '',
        };
    },

    methods: {
        ...mapActions({
            registerQna: "registerQna",
            getQnaList: "getQnaList",
        }),

        writeQna() {
            this.registerQna({ subject: this.subject, content: this.content, answer: this.answer});
            this.$router.replace("/qna");
        },
    }
}
</script>

<style>

</style>