<template>
  <div class="home">
      <el-row>
        <el-col :span="8" class="column">
          <NoteBlock title="Concept"/>
          <NoteBlock title="Hook"/>
          <Countdown />
          <NoteBlock title="Notes"/>
        </el-col>
        <el-col :span="8" class="column">
          <EnemyThreat v-for="i in monsterCount" :key="i"/>
          <button v-on:click="monsterCount++">Add monster threat</button>
        </el-col>
        <el-col :span="8" class="column">
          <OtherThreat  v-for="i in threatCount" :key="i"/>
          <button v-on:click="threatCount++">Add non-monster threat</button>
        </el-col>
      </el-row>

  </div>
</template>

<script>

import NoteBlock from '@/components/NoteBlock'
import Countdown from '@/components/Countdown'
import EnemyThreat from '@/components/EnemyThreat'
import OtherThreat from '@/components/OtherThreat'

export default {
  name: 'Home',
  components: {
    NoteBlock,
    Countdown,
    EnemyThreat,
    OtherThreat
  },
  data: () => ({
    monsterCount: 1,
    threatCount: 1
  })
}
</script>

<style scoped>
.right-border {
  border-right: 1px;
  border-right-style: solid;
}
.column {
  padding: 5px;
}
</style>
