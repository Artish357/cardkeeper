<template>
  <div v-if="loaded" style="margin: auto; width: max-content; text-align: center">
    <h3>Mysteries:</h3>
    <table style="width: 300px">
      <tr v-for="(mystery, index) in mysteries" :key="index">
        <td>
          <router-link :to="`/mystery/${mystery.id}`"> 
            <div class="card card-clickable">
              {{ mystery.id }}
            </div>
          </router-link>
        </td>
        <td style="width:50px;">
          <div class="card card-clickable" @click="deleteMystery(mystery.id)">
            X
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="card card-clickable" @click="newMystery">New mystery</div>
        </td>
      </tr>
    </table>
  </div>
  <n-skeleton repeat="10" v-else/>
</template>

<script>
import { NSkeleton } from "naive-ui";
export default {
  components: {
    NSkeleton
  },
  data: () => ({
    mysteries: [],
    loaded: false
  }),
  created() {
    this.loadMysteries();
  },
  inject: ['client'],
  methods: {
    loadMysteries() {
      this.client.then((client) => {
        client.getMysteries().then((response) => {
          this.mysteries = response.data["data"];
        });
        this.loaded = true
      });
    },
    async newMystery() {
      const client = await this.client;
      await client.newMystery();
      this.loadMysteries();
    },
    async deleteMystery(id) {
      const client = await this.client;
      await client.deleteMystery(id);
      this.loadMysteries();
    },
  },
};
</script>

<style>
</style>