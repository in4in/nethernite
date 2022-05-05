<template>
  <div class="list-group list-group-flush">
    <the-loader :loading="state.loading" />
    <template v-if="!state.loading && state.packages.length">
      <package-list-item
        v-for="item in state.packages"
        :key="item.name"
        v-bind="item"
      />
    </template>
    <template v-else>
      {{ resultText }}
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import TheLoader from "@/components/the/TheLoader.vue";
import PackageListItem from "@/components/package/PackageListItem.vue";
import useData from "@/hooks/useData";

const { state } = useData();
const resultText = computed(() => {

  if (!state.loading) {
    if (state.search.trim() === "") {
      return "Type something in the search bar";
    }

    if (!state.packages.length) {
      return "No matches found";
    }
  }
  
  return "";
});
</script>
