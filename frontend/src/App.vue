<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 5px;
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
</style>

<style>
@media print {
  .no-print { display: none; }
}
</style>