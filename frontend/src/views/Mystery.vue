<template>
  <n-theme-editor>
    <n-config-provider :theme-overrides="themeOverride">
      <div class="mystery" v-if="value" style="padding: 5px">
        <div class="top">
          <NoteBlock v-model="value.concept" title="Concept" />
          <NoteBlock v-model="value.hook" title="Hook" />
        </div>
        <div class="top">
          <Countdown v-model="value.countdown" />
          <NoteBlock v-model="value.notes" title="Notes" />
        </div>
        <n-grid :cols="2">
          <n-gi v-for="(threat, i) in value.threats" :key="i">
            <Threat v-model="value.threats[i]" />
          </n-gi>
          <n-gi style="position: relative; min-height:330px">
            <div class="card newThreatCard" @click="newThreat">
              <h1 class="centerText">
                New Threat
              </h1>
            </div>
          </n-gi>
        </n-grid>
        <button @click="saveMystery">Save</button>
      </div>
    </n-config-provider>
    <n-global-style />
  </n-theme-editor>
</template>

<script>
import NoteBlock from "@/components/NoteBlock";
import Countdown from "@/components/Countdown";
import Threat from "@/components/Threat";
import {
  NGrid,
  NGi,
  NThemeEditor,
  NConfigProvider,
  NGlobalStyle
} from "naive-ui";



export default {
  name: "Mystery",
  components: {
    NoteBlock,
    Countdown,
    Threat,
    NGrid,
    NGi,
    NThemeEditor,
    NConfigProvider,
    NGlobalStyle
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
        border: "1px solid #999",
        paddingSmall: "0 8px"
      },
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

<style>
.card {
  margin: 5px;
  border-radius: 5px;
  background-color: #eee;
  border-width: 2px;
  border-style: solid;
  border-color: #555;
  padding: 5px;
}
.newThreatCard {
  text-align: center;
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
}
.newThreatCard:hover {
  border: 2px solid #999;
  color: black;
  background-color: #e5e5e5;
  cursor: pointer;
}
.centerText {
  right: 50%;
  bottom: 50%;
  transform: translate(50%,50%);
  position: absolute;
}
* {
  color-adjust: exact; 
  -webkit-print-color-adjust: exact;
}
</style>
