<template>
  Mysteries:
  <div v-for="(mystery, index) in mysteries" :key="index">
    <router-link :to="`/mystery/${mystery.id}`">{{ mystery.id }}</router-link>
    <button @click="deleteMystery(mystery.id)">X</button>
  </div>
  <button @click="newMystery">New mystery</button>
</template>

<script>
export default {
  data: () => ({
    mysteries: [],
  }),
  created() {
    this.loadMysteries();
  },
  methods: {
    loadMysteries() {
      this.$client.then((client) => {
        client.getMysteries().then((response) => {
          this.mysteries = response.data["data"];
        });
      });
    },
    async newMystery() {
      const client = await this.$client
      await client.newMystery()
      this.loadMysteries() 
    },
    async deleteMystery(id) {
      const client = await this.$client
      await client.deleteMystery(id)
      this.loadMysteries()
    }
  },
};
</script>

<style>
</style>