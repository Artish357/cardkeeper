<template>
  <n-config-provider :theme-overrides="themeOverride">
    <div class="mystery" v-if="modelValue.id" style="padding: 5px">
      <div class="" style="text-align:center">
        <input class="title" v-model="modelValue.name" placeholder="Mystery Name"/>
      </div>
      <div class="top">
        <NoteBlock v-model="modelValue.concept" title="Concept" placeholder="What is the mystery's basic concept?"/>
        <NoteBlock v-model="modelValue.hook" title="Hook" placeholder="How does the mystery start?"/>
      </div>
      <div class="top">
        <Countdown v-model="modelValue.countdown" />
        <NoteBlock v-model="modelValue.notes" title="Notes" placeholder="Additional notes"/>
      </div>
      <n-grid :cols="2">
        <n-gi v-for="(threat, i) in threats" :key="threat.id">
          <Threat v-model="threats[i]" @delete="deleteThreat(threats[i].id)"/>
        </n-gi>
        <n-gi class="no-print" style="position: relative; min-height:330px">
          <div class="card newThreatCard card-clickable" @click="newThreat">
            <h1 class="centerText">
              New Threat
            </h1>
          </div>
        </n-gi>
      </n-grid>
    </div>
    <div v-else class="mystery">
      <n-skeleton text :repeat="20"/>
    </div>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { defineAsyncComponent, ref, watch, reactive } from "vue";
import { useRoute } from 'vue-router'
import { setupUpdate } from "../plugins/cardkeeper-client";
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
  setup() {
    const modelValue = reactive({})
    const threats = reactive([])
    const synced = ref(true)
    const { client } = setupUpdate(modelValue, synced, 'updateMystery')
    const mysteryId = ref(useRoute().params.id);
    client.then((readyClient) => {
      readyClient.getMystery(mysteryId.value).then((response) => {
        Object.assign(modelValue, response.data["data"]);
        delete modelValue.threats
        threats.push(...response.data["data"].threats)
        watch(() => modelValue, () => {
            synced.value=false
        }, {'deep': true})
      });
    });
    return {modelValue, synced, client, mysteryId, threats}
  },
  methods: {
    async newThreat() {
      const client = await this.client;
      const response = await client.newThreat(this.mysteryId);
      this.threats.push(response.data["data"]);
    },
    async deleteThreat(threatId){
      console.log(threatId)
      const client = await this.client
      await client.deleteThreat(threatId)
      const removeIndex = this.threats.findIndex(threat=>threat.id===threatId)
      console.log(removeIndex)
      this.threats.splice(removeIndex, 1)
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

.title {
  width: 90%;
  font-size: 2rem;
  text-align: center;
  background: none;
  border-width: 0px 0px 2px 0px;
  border-style: solid;
  border-color: #555;
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
