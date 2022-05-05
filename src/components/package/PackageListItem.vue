<template>
  <div
    class="list-group-item list-group-item-action"
    @click.prevent="onClick"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        {{ name }}
      </h5>
      <small>
        {{ version }}
      </small>
    </div>
    <p class="mb-1">
      {{ description }}
    </p>
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
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

interface Props {
  name: string;
  version: string;
  description?: string;
  keywords?: Array<string>;
  publisher: Record<string, string>;
}

const props = defineProps<Props>();
const router = useRouter();

const onClick = () => {
  const { name, query } = router.currentRoute.value;
  name && router.push({ 
    name,
    query,
    params: { packet: `${props.name}@${props.version}` }
  });
};
</script>

<style lang="scss" scoped>
.list-group-item {
  cursor: pointer;
}
</style>