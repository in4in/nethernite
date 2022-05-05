<template>
  <teleport to="body">
    <div
      id="modal"
      ref="modalInstance"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="modalLabel"
              class="modal-title"
            >
              {{ state.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <the-loader :loading="state.loading" />
            <template v-if="!state.loading && state.data">
              <h3>Default</h3>
              <div class="mb-3">
                {{ state.data.default }}
              </div>
              <h3>Files</h3>
              <div
                v-for="file in state.data.files"
                :key="file.name"
              >
                {{ file.name }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import useModal from "@/hooks/useModal";
import { item } from "@/api/points/package";
import Modal from "bootstrap/js/dist/modal";
import TheLoader from "@/components/the/TheLoader.vue"

interface State {
  title: string;
  loading: boolean;
  data: any;
}

const modalInstance = ref(null);
const route = useRoute();
const state = reactive<State>({
  title: "",
  loading: true,
  data: null,
});

const { isOpen, hide } = useModal();

const getData = async () => {
  const { packet } = route.params;
  state.title = packet as string;
  state.loading = true;

  try {
    const res = await item(state.title);
    const data = res?.data;
    data.files = data.files.filter((file: any) => file.type === "file");
    state.data = data;
  } catch (e) {
    state.data = null;
  } finally {
    state.loading = false;
  }
};

watch(
  isOpen,
  (value) => {
    if (!modalInstance.value) {
      return;
    }
    const modal = Modal.getOrCreateInstance(modalInstance.value);
    modal[value ? "show" : "hide"]();
    value && getData();
  },
  { immediate: true },
);

onMounted(() => {
  if (!modalInstance.value) {
    return;
  }
  const modal = Modal.getOrCreateInstance(modalInstance.value);
  if (isOpen.value) {
    modal.show();
    getData();
  }

  (modalInstance.value as HTMLElement).addEventListener(
    "hidden.bs.modal", 
    () => hide()
  );
});
</script>
