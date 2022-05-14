<template>
  <n-config-provider :theme-overrides="themeOverride">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </n-config-provider>
</template>

<script>
import { NConfigProvider } from "naive-ui";
export default {
  components: {
    NConfigProvider
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
        paddingSmall: "0 8px 0 8px",
        placeholderColor: "#777"
      },
      Button: {
        textColorWarning: "black",
        borderWarning: "2px solid #555",
        border: "2px solid #555"
      }
    },
  })
}
</script>

<style>
body {
  line-height: 1.2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 5px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.note-title {
  font-size: 22px;
  text-align: left;
  width: 100%;
  display: block;
  border-right: 1px;
}

.border {
  border-style: solid;
  border-width: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.card {
  margin: 5px;
  border-radius: 5px;
  background-color: #ddd;
  border-width: 2px;
  border-style: solid;
  border-color: #555;
  padding: 5px;
}
.card-clickable:hover{
  border: 2px solid #999;
  color: black;
  background-color: #e5e5e5;
  cursor: pointer;
}
.newThreatCard {
  text-align: center;
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
}
.centerText {
  right: 50%;
  bottom: 50%;
  transform: translate(50%,50%);
  position: absolute;
  justify-content: center;
}
* {
  color-adjust: exact; 
  -webkit-print-color-adjust: exact;
}

@media print {
  .no-print { display: none; }
}
</style>