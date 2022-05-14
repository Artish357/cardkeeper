<template>
  <NGrid>
    <NGi span="8">
      <div class="card">
        <input-table>
          <tr v-for="([key, ], index) in sheetData.bio" :key="key">
            <shrink-cell style="font-size: 11px; font-weight: bold">
              {{key}}
            </shrink-cell>
            <td style="padding-left: 3px">
              <threat-input style="font-size: 11px; line-height: 1" v-model="sheetData.bio[index][1]" :placeholder="key"/>
            </td>
          </tr>
        </input-table> 
      </div>
      <div class="card">
        <div class="label">Ideals</div>
        <threat-input 
          v-for="(val, index) in sheetData.ideals"
          :key="index"
          v-model="sheetData.ideals[index]"
          :placeholder="`Ideal #${index+1}`"
        />
        <div>
          1xp for one, 2xp for all
        </div>
      </div>
      <div class="card">
        <div class="label">Ambitions</div>
        <input-table>
          <tr v-for="({maxValue}, index) in sheetData.ambitions" :key="index">
            <td>
              <threat-input v-model="sheetData.ambitions[index].text"/>
              <div>
                {{index+1}} xp
              </div>
            </td>
            <shrink-cell>
              <clock v-model="sheetData.ambitions[index].value" :maxSegments="maxValue"/>
            </shrink-cell>
          </tr>
        </input-table>
      </div>
      <div class="card">
        <div class="label">
          Actions
        </div>
        <input-table>
          <tr v-for="([action, ], index) in sheetData.actions" :key="index">
            <td style="font-size: 14px; font-weight: bold">
              {{action}}
            </td>
            <shrink-cell>
              <checkbox-counter v-model="sheetData.actions[index][1]" :maxValue="4"/>
            </shrink-cell>
          </tr>
        </input-table>
      </div>
    </NGi>
    <NGi span="16">
      <div class="card">
        <input-table>
          <tr>
            <shrink-cell style="font-size: 26px; font-weight: bold">
              BOND:
            </shrink-cell>
            <td style="padding-left: 6px">
              <threat-input />
            </td>
          </tr>
        </input-table>
      </div>
      <div>
        You can gain stress by pushing/aiding (1 stress), resisting (1 stress) or leading a team action (2 stress)     
      </div>
      <div class="card">
        Max stress
      </div>
    </NGi>
  </NGrid>
</template>

<script>
import { NGrid, NGi } from "naive-ui";
import ThreatInput from '../components/ThreatInput.vue';
import InputTable from '../components/InputTable.vue';
import ShrinkCell from "../components/ShrinkCell.vue";
import Clock from "../components/Clock.vue";
import CheckboxCounter from '../components/CheckboxCounter.vue';
export default {
  components: {
    NGrid,
    NGi,
    ThreatInput,
    InputTable,
    ShrinkCell,
    Clock,
    CheckboxCounter
  },
  data(){
    const bio = ['Name', 'Kintype', 'Culture', 'Pronouns', 'Look'].map(x=>[x, ''])
    const actions = [
      'Sneak', 
      'Excel', 
      'Survey', 
      'Channel', 
      'Charm', 
      'Command', 
      'Tinker', 
      'Study', 
      'Recall', 
      'Traverse', 
      'Smash', 
      'Endure', 
      'Crush', 
      'Snipe', 
      'Skirmish'
    ].map(x=>[x, 0])
    return {
      sheetData:{
        bio,
        ideals: ['', '', ''],
        ambitions: [4, 6, 10].map(x=>({
          text: '',
          value: 0,
          maxValue: x
        })),
        actions
      },
      clockValue: 0,
      clockMaxSegments: 6,
      counterValue: 2
    }
  }
}
</script>

<style scoped>
.label {
  font-size: 18px;
  text-align: center;
}
td {
  border-width: 0px;
  padding: 0px;
}
tr {
  border-width: 0px;
  padding: 0px;
}
</style>