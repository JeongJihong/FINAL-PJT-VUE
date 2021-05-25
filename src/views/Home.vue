<template>
  <div class="houseImg" style="text-align:center">
        <transition-group name="fade" tag="div" mode="in-out">
            <div v-for="i in [currentIndex]" :key="i">
                <img class="houseImg" :src="currentHouseImg"/>
            </div>
        </transition-group>
        <a class="prev" @click="prev" href="#">❮</a>
        <a class="next" @click="next" href="#">❯</a>
    <br>
  </div>
</template>

<script>
export default {
  data() {
        return {
            // 슬라이더 이미지 배열
            houseImg : [
              "https://www.gannett-cdn.com/presto/2019/10/17/USAT/5756be91-0cd0-4c2a-9091-aa1c6f5c0977-Press_HeroPhoto_01.jpg",
              "https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg",
              "https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg",
              "https://static.dezeen.com/uploads/2020/06/royal-william-kaven-portland-oregon_dezeen_hero.jpg",
            ],
            // 타이머
            timer : null,
            // 현재 활성화된 인덱스
            currentIndex : 0
        }
    },
    // 마운트시 실행 함수
    mounted() {
        this.startSlide();
    },
    methods : {
        // 슬라이드 시작
        startSlide : function() {
            this.timer = setInterval(this.next, 3000);

        },
        // 다음 슬라이드
        next : function () {
            this.currentIndex += 1;

        },
        // 이전 슬라이드
        prev : function () {
            this.currentIndex -= 1;
        }
    },
    computed : {
        // 활성화된 이미지 주소
        currentHouseImg : function() {
            return this.houseImg[Math.abs(this.currentIndex) % this.houseImg.length];
        }
    }
};
</script>

<style>

/* .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: 0;
} */

.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease;
    opacity: 1;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.fade-leave-to {
    display:none;
}
.houseImg {
    width:2300px;
    height:1500px;
}
.prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top : -25px;
    padding: 0 10px;
    color: white;
    line-height:50px;
    font-weight: bold;
    font-size: 18px;
    transition: 0.7s ease;
    border-radius: 0 4px 4px 0;
    text-decoration: none;
    user-select: none;
}
.next {
    right: 0;
}
.prev {
    left: 0;
}
</style>
