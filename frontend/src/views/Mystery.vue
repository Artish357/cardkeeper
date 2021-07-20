<template>
  <n-config-provider :theme-overrides="themeOverride">
    <div class="mystery" v-if="value" style="padding: 5px">
      <div class="top">
        <NoteBlock v-model="value.concept" title="Concept" placeholder="What is the mystery's basic concept?"/>
        <NoteBlock v-model="value.hook" title="Hook" placeholder="How does the mystery start?"/>
      </div>
      <div class="top">
        <Countdown v-model="value.countdown" />
        <NoteBlock v-model="value.notes" title="Notes" placeholder="Additional notes"/>
      </div>
      <n-grid :cols="2">
        <n-gi v-for="(threat, i) in value.threats" :key="i">
          <Threat v-model="value.threats[i]" @delete="deleteThreat(value.threats[i].id)"/>
        </n-gi>
        <n-gi class="no-print" style="position: relative; min-height:330px">
          <div class="card newThreatCard card-clickable" @click="newThreat">
            <h1 class="centerText">
              New Threat
            </h1>
          </div>
        </n-gi>
      </n-grid>
      <button @click="saveMystery">Save</button>
    </div>
    <div v-else class="mystery">
      <n-skeleton text :repeat="20"/>
    </div>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { defineAsyncComponent } from "vue";
const NoteBlock = defineAsyncComponent(() => import("@/components/NoteBlock"));
const Countdown = defineAsyncComponent(() => import("@/components/Countdown"));
const Threat = defineAsyncComponent(() => import("@/components/Threat"));
import {
  NGrid,
  NGi,
  NConfigProvider,
  NGlobalStyle,
  NSkeleton
} from "naive-ui";



export default {
  name: "Mystery",
  components: {
    NoteBlock,
    Countdown,
    Threat,
    NGrid,
    NGi,
    NConfigProvider,
    NGlobalStyle,
    NSkeleton
  },
  data: () => ({
    value: null,
    mysteryId: null,
    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    themeOverride: {
      common: {
        primaryColor: "black",
      },
      Input: {
        caretColor: "black",
        borderHover: "1px solid black",
        borderFocus: "1px solid black",
        border: "1px solid #777",
        paddingSmall: "0 8px",
        placeholderColor: "#777"
      },
      Button: {
        textColorWarning: "black"
      }
    },
  }),
  created() {
    this.mysteryId = this.$route.params.id;
    this.$client.then((client) => {
      client.getMystery(this.mysteryId).then((response) => {
        this.value = response.data["data"];
      });
    });
  },
  methods: {
    async saveMystery() {
      const client = await this.$client;
      const update = await client.updateMystery(this.mysteryId, this.value);
      console.log(update.data);
    },
    async newThreat() {
      const client = await this.$client;
      const response = await client.newThreat(this.mysteryId);
      this.value.threats.push(response.data["data"]);
    },
    async deleteThreat(threatId){
      const client = await this.$client
      await client.deleteThreat(threatId)
      this.value.threats = this.value.threats.filter(threat => threat.id !== threatId)
    }
  },
};
</script>

<style scoped>
.mystery {
  height:297mm;
  width:210mm;
  margin-left:auto;
  margin-right:auto; 
}
.right-border {
  border-right: 1px;
  border-right-style: solid;
}

.top {
  width: 100%;
  display: flex;
}

.top > * {
  flex: 1;
  margin-top: 5px;
  margin-bottom: 5px;
}

.column {
  padding: 5px;
}
</style>
