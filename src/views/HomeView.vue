<template>
  <div class="d-flex flex-column h-100">
    <the-header />
    <main class="flex-fill">
      <div class="container">
        <package-list />
        <the-pagination />
        <modal-package />
      </div>
    </main>
    <the-footer />
  </div>
</template>

<script lang="ts" setup>
import TheHeader from "@/components/the/TheHeader.vue";
import TheFooter from "@/components/the/TheFooter.vue";
import ThePagination from "@/components/the/ThePagination.vue";
import PackageList from "@/components/package/PackageList.vue";
import ModalPackage from "@/components/modal/ModalPackage.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { list } from "@/api/points/package";
import useData from "@/hooks/useData";
import usePagination from "@/hooks/usePagination";

const route = useRoute();
const { state } = useData();
const { state: pagination } = usePagination();

const getData = async () => {
  const params = route.query;
  state.loading = true;
  try {
    const result = await list(params);
    state.packages = result.data;
    pagination.total = result.meta.total;
  } catch (e) {
    console.error(e)
    state.packages = [];
    pagination.total = 0;
  } finally {
    state.loading = false;
  }
};

watch(
  () => route.query,
  (current, previous) => {
    if (!previous) {
      state.loading = false;
    }
    if (JSON.stringify(current) == JSON.stringify(previous)) {
      return;
    }
    
    getData();
  },
  { immediate: true },
);
</script>
