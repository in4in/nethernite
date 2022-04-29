<template>
  <router-view />
</template>

<style lang="scss">
$body-bg: #eee;
@import "bootstrap";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

html,
body {
  min-width: 320px;
}

header,
main {
  background-color: $white;
}

footer {
  background-color: $body-bg;
}
</style>
