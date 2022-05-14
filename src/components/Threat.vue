<template>
  <SheetCard v-if="modelValue" class="card">
    <n-space justify="space-between" style="margin-bottom: 5px">
      <n-switch 
        class="no-print"
        size="small"
        :id="`monster-checkbox-${modelValue.id}`"
        type="checkbox"
        v-model:value="threatData.isMonster"
      />
      <div class="no-print">
        <n-button class="no-print corner-button" size="small">
          Up
        </n-button>
        <n-button class="no-print corner-button" size="small">
          Down
        </n-button>
        <n-button class="no-print corner-button" type="warning" size="small" @click="$emit('delete')">
          Delete
        </n-button>
      </div>
    </n-space>
    <n-input class="threat-input" size="small" placeholder="Name" v-model:value="threatData.name"/>
    <n-input-group class="threat-input">
            <n-input
              size="small"
              v-model:value="threatData.type"
              placeholder="Type"
              style="width: 50%"
            />
            <n-input v-model:value="threatData.subtype" style="width:50.1%" size="small" placeholder="Subtype"/>
          </n-input-group>
    <n-grid :cols="threatData.isMonster ? 3 : 2">
      <n-gi style="padding-right: 2px">
        <ThreatInput placeholder="Motivation" v-model="threatData.motivation" :prefix="icons.TargetIcon"/>
        <ThreatInput v-if="threatData.isMonster" placeholder="Notes" v-model="threatData.notes" :prefix="icons.NoteIcon"/>
      </n-gi>
      <n-gi v-if="threatData.isMonster" style="padding-left: 2px">
        <ThreatInput placeholder="Powers" v-model="threatData.powers" :prefix="icons.PowerIcon"/>
        <ThreatInput placeholder="Weaknesses" v-model="threatData.weaknesses" :prefix="icons.WeakIcon"/>
      </n-gi>
      <n-gi v-if="threatData.isMonster" style="padding-left: 2px">
        <ThreatInput placeholder="Attacks" v-model="threatData.attacks" :prefix="icons.ClawIcon" />
        <ThreatInput placeholder="Armor" v-model="threatData.armor" :prefix="icons.ShieldIcon"/>
      </n-gi>
      <n-gi v-else style="padding-left: 2px">
        <ThreatInput placeholder="Notes" v-model="threatData.notes" :prefix="icons.NoteIcon"/>
      </n-gi>
    </n-grid>
    <div class="hp-back">
      <div
        class="hp-fore"
        v-if="modelValue.harm !== modelValue.harmCap"
        :style="{
          left: hpPercentage,
          'border-top-left-radius': hpBorders,
          'border-bottom-left-radius': hpBorders,
        }"
      ></div>
      <div class="hp-content">
        <div>
          <input
            v-model.number="threatData.harm"
            type="number"
            min="0"
            :max="threatData.harmCap"
          />
          /
          <input
            v-model.number="threatData.harmCap"
            type="number"
            :min="0"
          />
        </div>
      </div>
    </div>
  </SheetCard>
</template>
<script>
import SheetCard from "@/components/SheetCard";
import ThreatInput from "@/components/ThreatInput";
import { ref, reactive, watch } from "vue";
import { NInputGroup, NGrid, NGi, NInput, NSwitch, NButton, NSpace } from "naive-ui";
import { setupUpdate } from "../plugins/cardkeeper-client";
import ClawIcon from "../assets/midnight-claw.svg";
import TargetIcon from "../assets/targeted.svg";
import NoteIcon from "../assets/notebook.svg";
import PowerIcon from "../assets/lightning-helix.svg";
import WeakIcon from "../assets/achilles-heel.svg";
import ShieldIcon from "../assets/checked-shield.svg";

export default {
  components: {
    SheetCard,
    ThreatInput,
    NInputGroup,
    NInput,
    NSwitch,
    NButton,
    NGrid,
    NGi,
    NSpace
  },
  props: {
    modelValue: null
  },
  data: () => ({
    icons: {
      ClawIcon,
      TargetIcon,
      NoteIcon,
      PowerIcon,
      WeakIcon,
      ShieldIcon
    }
  }),
  computed: {
    hpPercentage() {
      if (this.modelValue.harm <= 0 || this.modelValue.harmCap <= 0) {
        return "-1px";
      }
      return `${(this.modelValue.harm / this.modelValue.harmCap) * 100}%`;
    },
    hpBorders() {
      if (this.hpPercentage === "0%") {
        return "5px";
      } else {
        return "0px";
      }
    },
  },
  setup(props, {emit}) {
    const synced = ref(true)
    const threatData = reactive(Object.assign({}, props.modelValue))
    watch(threatData, ()=>{
      emit('update:modelValue', threatData)
      synced.value = false
    })
    return Object.assign({threatData, synced}, setupUpdate(threatData, synced, 'updateThreat'))
  }
};
</script>
<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
td > input:not([type]) {
  width: 100%;
  box-sizing: border-box;
}
.shrink {
  white-space: nowrap;
}
.hp-back {
  position: relative;
  background-color: #ddd;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  border: #555;
  border-width: 2px;
  border-style: solid;
  box-sizing: border-box;
}
.hp-fore {
  background-color: #555;
  position: absolute;
  right: -2px;
  top: 0px;
  bottom: 0px;
  z-index: 1;
  border-radius: 0px 5px 5px 0px;
  border-color: #555;
  border-style: solid;
}
.hp-content {
  position: relative;
  z-index: 2;
  padding: 3px;
}
.hp-content > div {
  min-width: 25%;
  max-width: max-content;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 3px;
  border-radius: 5px;
}
.hp-content > * > input {
  max-width: 4em;
}
.threat-input {
  margin-top: 2px;
  margin-bottom: 2px;
}
.corner-button {
  margin: 0 2px;
}
</style>