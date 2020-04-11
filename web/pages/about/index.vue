<template>
  <div class="about">
    <div class="bg">WELCOME</div>
    <div class="pc">
      <v-parallax
        src="/pen2.jpg"
        height="650"
        style="backgroundSize:cover"
        class="d-none d-sm-none d-md-flex"
      >
        <div class="mb-12 display-1">我想说</div>
        <div class="display-3 shine">{{ info.my_message }}</div>
      </v-parallax>
      <v-parallax
        src="/computer.jpg"
        height="650"
        style="backgroundSize:cover"
        class="d-none d-sm-none d-md-flex"
      >
        <div class="mb-12 display-1">这是我</div>
        <div class="display-3 shine">{{ info.my_info }}</div></v-parallax
      >
      <v-parallax
        src="/road.jpg"
        height="650"
        style="backgroundSize:cover"
        class="d-none d-sm-none d-md-flex"
      >
        <div class="mb-12 display-1">我梦想</div>
        <div class="display-3 shine">{{ info.my_hope }}</div></v-parallax
      >
    </div>
    <div class="phone d-md-none" ref="phone">
      <div class="shine d-inline d-sm-inline" ref="movefont1">
        {{ info.my_message }}
      </div>
      <div class="shine d-inline d-sm-inline" ref="movefont2">
        {{ info.my_info }}
      </div>
      <div class="shine d-inline d-sm-inline" ref="movefont3">
        {{ info.my_hope }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time1: "",
      time2: "",
      time3: "",
      color_num1: "",
      color_num2: "",
      color_num3: ""
    };
  },
  async asyncData({ $axios }) {
    const info = await $axios.$get("/informations");
    return {
      info
    };
  },
  methods: {
    move1() {
      let son = this.$refs.movefont1;
      this.move(son, 10);
    },
    move2() {
      let son = this.$refs.movefont2;
      this.move(son, 16);
    },
    move3() {
      let son = this.$refs.movefont3;
      this.move(son, 20);
    },
    changeColor(son) {
      this.color_num1 = Math.floor(Math.random() * 255 + 1);
      this.color_num2 = Math.floor(Math.random() * 255 + 1);
      this.color_num3 = Math.floor(Math.random() * 255 + 1);
      let change_color = son;
      change_color.style.backgroundImage = `-webkit-linear-gradient(left, rgb(${this.color_num1}, ${this.color_num2}, ${this.color_num3}) 25%, rgb(${this.color_num2}, ${this.color_num3}, ${this.color_num1}) 50%`;
    },
    move(son, time) {
      let parent = this.$refs.phone;
      //让元素动起来
      // 添加两个变量，用于更换运动方向
      var a = 1;
      var b = 1;
      // 获取元素的可运动空间，用父元素的宽高减去子元素的宽高
      var w = parent.offsetWidth - son.offsetWidth;
      var h = parent.offsetHeight - son.offsetHeight;

      this.time3 = setInterval(() => {
        // 获取元素当前left
        var l = son.offsetLeft;
        if (l == w || l <= -1) {
          // 如果到达可运动空间最大值和最小值的时候，a 变成负值
          a *= -1;
          this.changeColor(son);
        }
        // 把元素距离左边的值每30ms加3px
        // a变成负值可以改变运动方向
        son.style.left = l + a + "px";

        // 垂直方向同水平方向
        var t = son.offsetTop;
        if (t == h || t <= -1) {
          b *= -1;
          this.changeColor(son);
        }
        son.style.top = t + b + "px";
      }, time);
    }
  },
  mounted() {
    this.move1();
    this.move2();
    this.move3();
  },
  destroyed() {
    clearInterval(this.time1);
    clearInterval(this.time2);
    clearInterval(this.time3);
  }
};
</script>

<style>
.about .bg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: fantasy;
  font-size: 3.8em;
  white-space: nowrap;
  font-weight: bold;
  background: url("../../static/phone1.jpg") no-repeat 100% 100%;
  background-size: cover;
  background-origin: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.about .shine {
  background: white;
  cursor: pointer;
  background-image: -webkit-linear-gradient(
    left,
    #cddc39,
    #ff9800 25%,
    #b388ff 50%,
    #7c4dff 75%,
    #cddc39
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 200%;
  -webkit-animation: masked-animation 2s infinite linear;
}
.about .shine:hover {
  transform: scale(1.2, 1.2);
  font-weight: bold;
}
@-webkit-keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: -50% -50%;
  }
  100% {
    background-position: 0 0;
  }
}
.pc {
  height: 100%;
}
.phone {
  height: 100vh;
  position: relative;
  box-sizing: border-box;
}
.phone div:nth-child(1) {
  position: absolute;
  top: 10vh;
  left: 2vw;
}
.phone div:nth-child(2) {
  position: absolute;
  top: 20vh;
  left: 2vw;
}
.phone div:nth-child(3) {
  position: absolute;
  top: 30vh;
  left: 2vw;
}
</style>
