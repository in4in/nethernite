<template>
  <div class="list-group list-group-flush">
    <div
      v-show="state.loading"
      class="text-center"
    >
      <div
        class="spinner-border"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-if="!state.loading">
      <package-list-item
        v-for="item in state.packages"
        :key="item.name"
        v-bind="item"
      />
    </template>
    <template v-else-if="!state.packages.length">
      No matches found
    </template>
  </div>
</template>

<script lang="ts" setup>
import PackageListItem from "@/components/package/PackageListItem.vue";
import useData from "@/hooks/useData";

const { state } = useData();
</script>
