<template>
  <div class="d-flex flex-column h-100">
    <the-header />
    <main class="flex-fill">
      <div class="container">
        <package-list />
        <the-pagination />
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
import { onMounted, watch } from "vue";
import { list } from "@/api/points/package";
import useData from "@/hooks/useData";

const { state, setLoading, setPackages } = useData();

const getData = async (text: string) => {
  setLoading(true);
  const result = await list({
    text,
    size: 10,
  });
  setPackages(result.data);
  setLoading(false);
};

onMounted(getData);

watch(
  () => state.search,
  (value) => getData(value)
);
</script>

<style lang="scss" scoped></style>