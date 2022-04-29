<template>
  <a
    href="#"
    class="list-group-item list-group-item-action"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ name }}</h5>
      <small>{{ version }}</small>
    </div>
    <p class="mb-1">{{ description }}</p>
    <small>
      <a
        :href="`mailto:${publisher.email}`"
        target="_blank"
      >
        {{ publisher.username }}
      </a>
    </small>
    <div
      v-if="(keywords ?? []).length"
      class="mt-2"
    >
      <span
        v-for="keyword in keywords"
        :key="keyword"
        class="badge rounded-pill bg-secondary me-1"
      >
        {{ keyword }}
      </span>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface Props {
  name: string;
  version: string;
  description?: string;
  keywords?: Array<string>;
  publisher: Record<string, string>;
}

defineProps<Props>();
</script>
