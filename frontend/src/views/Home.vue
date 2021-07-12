<template>
  <div class="home">
    <div class="top">
      <NoteBlock title="Concept" />
      <NoteBlock title="Hook" />
      <Countdown />
      <NoteBlock title="Notes" />
    </div>
    <div>
      <div class="column">
        <EnemyThreat v-for="i in monsterCount" :key="i" />
        <button v-on:click="monsterCount++">Add monster threat</button>
      </div>
      <div class="column">
        <OtherThreat v-for="i in threatCount" :key="i" />
        <button v-on:click="threatCount++">Add non-monster threat</button>
      </div>
    </div>
  </div>
</template>

<script>
import NoteBlock from "@/components/NoteBlock";
import Countdown from "@/components/Countdown";
import EnemyThreat from "@/components/EnemyThreat";
import OtherThreat from "@/components/OtherThreat";

export default {
  name: "Home",
  components: {
    NoteBlock,
    Countdown,
    EnemyThreat,
    OtherThreat,
  },
  data: () => ({
    monsterCount: 1,
    threatCount: 1,
  }),
};
</script>

<style scoped>
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
  margin-top: 0;
  margin-bottom: 0;
}

.column {
  padding: 5px;
}
</style>
