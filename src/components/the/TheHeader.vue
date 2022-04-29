<template>
  <header class="py-4">
    <div class="container">
      <div class="row row-cols-1">
        <div class="col">
          <div>
            <input
              v-model.lazy="state.search"
              type="search"
              class="form-control"
              placeholder="Type something"
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import useData from '@/hooks/useData';

const { state } = useData();
</script>

<style lang="scss" scoped></style>
