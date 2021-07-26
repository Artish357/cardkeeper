<template>
  <SheetCard v-if="modelValue" class="card">
    <table>
      <colgroup>
        <col style="width:25%"/>
        <col style="width:75%"/>
      </colgroup>
      <tr>
        <td class="shrink">Name:</td>
        <td>
          <n-input size="small" placeholder="Name" v-model:value="threatData.name"/>
        </td>
      </tr>
      <tr>
        <td class="shrink">Type:</td>
        <td>
          <n-input-group>
            <n-input
              size="small"
              v-model:value="threatData.type"
              placeholder="Type"
              style="width: 40%"
            />
            <n-input v-model:value="threatData.subtype" style="width:60%" size="small" placeholder="Subtype"/>
          </n-input-group>
        </td>
      </tr>
      <tr>
        <td class="shrink">Motivation:</td>
        <td>
          <n-input size="small" placeholder="Motivation" v-model:value="threatData.motivation"/>
        </td>
      </tr>
      <tr class="no-print">
          <td>
              <label :for="`monster-checkbox-${modelValue.id}`">Is it a monster?</label>
          </td>
          <td>
              <n-switch 
                size="small"
                :id="`monster-checkbox-${modelValue.id}`"
                type="checkbox"
                v-model:value="threatData.isMonster"
            />
          </td>
      </tr>
      <tbody :style="{visibility: modelValue.isMonster ? null : 'collapse'}">
        <tr>
          <td class="shrink">Powers:</td>
          <td>
            <n-input size="small" type="textarea" :autosize="{minRows: 1}" placeholder="Powers" v-model:value="threatData.powers"/>
          </td>
        </tr>
        <tr>
          <td class="shrink">Weaknesses:</td>
          <td>
            <n-input size="small" type="textarea" :autosize="{minRows: 1}" placeholder="Weaknesses" v-model:value="threatData.weaknesses"/>
          </td>
        </tr>
        <tr>
          <td class="shrink">Attacks:</td>
          <td>
            <n-input size="small" type="textarea" :autosize="{minRows: 1}" placeholder="Attacks" v-model:value="threatData.attacks"/>
          </td>
        </tr>
        <tr>
          <td class="shrink">Armor:</td>
          <td>
            <n-input size="small" type="textarea" :autosize="{minRows: 1}" placeholder="Armor" v-model:value="threatData.armor"/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
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
          </td>
        </tr>
      </tbody>
      <tr class="no-print">
        <td colspan="2">
          <n-button style="width:100%" type="warning" size="small" @click="$emit('delete')">
            Delete this Threat
          </n-button>
        </td>
      </tr>
    </table>
  </SheetCard>
</template>
<script>
import SheetCard from "@/components/SheetCard";
import { ref, reactive, watch } from "vue";
import { NInputGroup, NInput, NSwitch, NButton } from "naive-ui";
import { setupUpdate } from "../plugins/cardkeeper-client";

export default {
  components: {
    SheetCard,
    NInputGroup,
    NInput,
    NSwitch,
    NButton
  },
  props: {
    modelValue: null
  },
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
</style>