<template>
  <nav
    v-show="!app.loading && pages.length"
    class="mt-4"
    aria-label="Page navigation"
  >
    <ul class="pagination pagination-sm">
      <li
        class="page-item first"
        :class="{ 'disabled': state.page === 1 }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="() => onClick(1)"
        >{{ "<<" }}</a>
      </li>
      <li
        class="page-item prev"
        :class="{ 'disabled': state.page === 1 }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="() => onClick(state.page - 1)"
        >{{ "<" }}</a>
      </li>
      <li
        v-for="item in pages"
        :key="item"
        class="page-item"
        :class="{ 'active': state.page === item }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="() => onClick(item)"
        >{{ item }}</a>
      </li>
      <li
        class="page-item next"
        :class="{ 'disabled': state.page === pageCount }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="() => onClick(state.page + 1)"
        >
          {{ ">" }}
        </a>
      </li>
      <li
        class="page-item last"
        :class="{ 'disabled': state.page === pageCount }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="() => onClick(pageCount)"
        >
          {{ ">>" }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { defineProps, computed, watch } from "vue";
import useData from '@/hooks/useData';
import useQuery from '@/hooks/useQuery';
import usePagination, { Pagination } from "@/hooks/usePagination";

const { getQuery, setQuery } = useQuery();

interface Props extends Partial<Pagination> { }

const props = defineProps<Props>();

const { state: app } = useData();
const { state } = usePagination(props);

const pageCount = computed<number>(() => Math.ceil(state.total / state.size) || 1);
const pages = computed<Array<number>>(() => {
  const result: Array<number> = [];

  if (pageCount.value === 1) {
    return result;
  }
  if (pageCount.value <= state.maxShow) {
    for (let i = 1; i <= pageCount.value; i++) {
      result.push(i);
    }
    return result;
  }
  let p = state.page - state.divide;
  let m = state.page + state.divide
  if (state.page === 1 || p <= 1) {
    p = 1
    for (let i = 1; i <= state.maxShow; i++) {
      result.push(i);
    }
    return result;
  }
  if (m >= pageCount.value) {
    m = pageCount.value;
  } 
  for (let i = 1; i <= state.maxShow; i++) {
    let n = state.maxShow - i;
    result.push(m - n);
  }

  return result;
});

const onClick = (page: number) => {
  state.page = page;
  const from = (state.page - 1) * state.size;
  setQuery({ from });
}

watch(
  getQuery,
  (query) => {
    let page = state.page;
    if (query?.from) {
      page = +query.from / state.size;
    } else {
      page = 1;
    }
    if (page !== state.page) {
      state.page = page;
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
@import "bootstrap";
@include media-breakpoint-down(sm) {
  .page-item:not(.active, .first, .prev, .next, .last) {
    display: none;
  }
}
</style>