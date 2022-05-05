<template>
  <header class="py-4">
    <div class="container">
      <div class="row row-cols-1">
        <div class="col">
          <div>
            <input
              :value="getQuery()?.text"
              type="search"
              class="form-control"
              placeholder="Type something"
              @change="onChange"
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import useQuery from '@/hooks/useQuery';
import useData from '@/hooks/useData';

const { state } = useData();
const { getQuery, setQuery } = useQuery();

const onChange = (e: Event) => {
  if (e.target) {
    const value = (e.target as HTMLInputElement).value;
    setQuery({ text: value, from: 0 });
  }
}

watch(
  getQuery,
  (query) => {
    let text = state.search;
    if (query?.text) {
      text = query.text as string;
    }
    if (text !== state.search) {
      state.search = text;
    }
  },
  { immediate: true },
);
</script>
