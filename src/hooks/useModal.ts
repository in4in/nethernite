import { ref, readonly, watch, Ref } from "vue";
import { useRouter, Router } from "vue-router";

let _router: Router;
const _paramName = "packet";
const isOpen = ref(false);
const initPath = ref("");

const setOpen = (value: boolean): void => {
  isOpen.value = value;
};

const show = (nameModal: string): void => {
  const currentValue = _router.currentRoute.value.params[_paramName];
  if (currentValue == nameModal) {
    setOpen(true);
    return;
  }
  const { name, query } = _router.currentRoute.value;
  name && _router.push({
    name,
    query,
    params: {
      [_paramName]: nameModal,
    },
  });
};

const hide = (): void => {
  if (initPath.value == _router.currentRoute.value.fullPath) {
    initPath.value = "";
    const { name, query } = _router.currentRoute.value;
    name && _router.push({
      name,
      query,
      params: {},
    });
    return;
  }
  _router.back();
};

interface Return {
  isOpen: Readonly<Ref>;
  show: (nameModal: string) => void;
  hide: () => void;
}

export default (): Return => {
  _router = useRouter();

  initPath.value = _router.currentRoute.value.fullPath;

  watch(
    () => _router.currentRoute.value.params,
    (params) => {
      const hasQueryParam = _paramName in params;
      const emptyQueryParam = params[_paramName] === "";
      setOpen(hasQueryParam && !emptyQueryParam);
    },
    { immediate: true },
  );

  return {
    isOpen: readonly(isOpen),
    show,
    hide,
  };
};
