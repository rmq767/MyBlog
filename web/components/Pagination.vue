<template>
  <div class="pagination">
    <div class="text-center">
      <v-pagination v-model="page" :length="length" v-if="data"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      page: 1,
      length: 1,
      data: [],
      a_id: this.$route.params.id
    };
  },
  methods: {
    async fecth() {
      const total = await this.$axios.get(`/${this.type}`);
      const res = await this.$axios.get(
        `/${this.type}/get/page?pageSize=${10}&currentPage=${1}`
      );
      this.data = res.data;
      this.length = Math.ceil(total.data.length / 10);
    }
  },
  watch: {
    async page(newValue) {
      const res = await this.$axios.get(
        `/${this.type}/get/page?pageSize=${10}&currentPage=${newValue}`
      );
      this.data = res.data;
      document.documentElement.scrollTop = 0;
    },
    async data() {
      this.$emit("getPagination", this.data);
    },
    type(newValue) {
      this.type = newValue;
      this.fecth();
    },
    $route(to, from) {
      this.a_id = to.params.id;
      this.fecth();
    }
  },
  created() {
    this.fecth();
  }
};
</script>

<style></style>
