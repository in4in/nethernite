<template>
  <div
    v-show="loading"
    class="text-center"
  >
    <div
      class="spinner-border"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface Props {
  loading: boolean,
}

defineProps<Props>();
</script>
