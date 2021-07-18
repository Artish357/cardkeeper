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
          <n-input placeholder="Name" :value="modelValue.name" @update:value="updateField('name', $event)"/>
        </td>
      </tr>
      <tr>
        <td class="shrink">Type:</td>
        <td>
          <n-input-group>
            <n-input
              size="small"
              :value="modelValue.type"
              @update:value="updateField('type', $event)"
              placeholder="Type"
              style="width: 40%"
            />
            <n-input style="width:60%" size="small" placeholder="Subtype"/>
          </n-input-group>
        </td>
      </tr>
      <tr>
        <td class="shrink">Motivation:</td>
        <td>
          <n-input size="small" placeholder="Motivation" :value="modelValue.motivation" @update:value="updateField('motivation', $event)"/>
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
                :value="modelValue.isMonster"
                @update:value="updateField('isMonster', Boolean($event))"
            />
          </td>
      </tr>
      <tbody :style="{visibility: modelValue.isMonster ? null : 'collapse'}">
        <tr>
          <td class="shrink">Powers:</td>
          <td>
            <n-input size="small" type="textarea" :autosize="{minRows: 1}" placeholder="Powers" :value="modelValue.powers" @update:value="updateField('powers', $event)"/>
          </td>
        </tr>
        <tr>
          <td class="shrink">Weaknesses:</td>
          <td>
            <n-input size="small" type="textarea" :autosize="{minRows: 1}" placeholder="Weaknesses" :value="modelValue.weaknesses" @update:value="updateField('weaknesses', $event)"/>
          </td>
        </tr>
        <tr>
          <td class="shrink">Attacks:</td>
          <td>
            <n-input size="small" type="textarea" :autosize="{minRows: 1}" placeholder="Attacks" :value="modelValue.attacks" @update:value="updateField('attacks', $event)"/>
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
                    :value="modelValue.harm"
                    type="number"
                    min="0"
                    :max="modelValue.harmCap"
                    @input="updateField('harm', parseInt($event.target.value))"
                  />
                  /
                  <input
                    :value="modelValue.harmCap"
                    type="number"
                    :min="0"
                    @input="updateField('harmCap', parseInt($event.target.value))"
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
import { NInputGroup, NInput, NSwitch, NButton } from "naive-ui";

export default {
  components: {
    SheetCard,
    NInputGroup,
    NInput,
    NSwitch,
    NButton
  },
  props: {
    modelValue: null,
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
  methods: {
    updateField(key, value) {
      const copy = Object.assign({}, this.modelValue);
      copy[key] = value;
      this.$emit("update:modelValue", copy);
    },
  },
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
  max-width: 100px;
}
</style>