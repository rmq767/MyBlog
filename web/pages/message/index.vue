<template>
    <div class="message">
        <comment type="messages"></comment>
    </div>
</template>

<script>
import Comment from "../../components/Comment.vue";
export default {
    data() {
        return {
            message: "message",
            items: [],
        };
    },
    components: {
        Comment,
    },
};
</script>

<style>
.message {
    height: 100%;
    position: relative;
    background: -webkit-linear-gradient(45deg, #a99589 10%, #e7e9eb 70%);
    background: linear-gradient(45deg, #a99589 10%, #e7e9eb 70%);
    overflow: hidden;
    background-size: 200% 100%;
    -webkit-animation: move 10s ease infinite;
    animation: move 10s ease infinite;
}
@-webkit-keyframes move {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 100% 0;
    }
    100% {
        background-position: 0 0;
    }
}
@media screen and (min-width: 1200px) {
    .message {
        background: url("https://picsum.photos/1280/800?random");
        background-size: cover;
        animation: none;
        background-attachment: fixed;
    }
    .message .comment {
        width: 60%;
        margin: 20px auto 0px;
    }
}
/* .message {
  height: 100%;
  background: url("/pen2.jpg");
  background-size: cover;
} */
</style>
