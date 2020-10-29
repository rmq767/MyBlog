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
    background: -webkit-linear-gradient(45deg, #c973ff 10%, #aebaf8 70%);
    background: linear-gradient(45deg, #c973ff 10%, #aebaf8 70%);
    padding-top: 20px;
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
        margin: 0px auto;
    }
}
/* .message {
  height: 100%;
  background: url("/pen2.jpg");
  background-size: cover;
} */
</style>
