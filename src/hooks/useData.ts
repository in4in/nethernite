import { reactive } from "vue";

interface State {
  loading: boolean;
  search: string;
  packages: Array<any>;
}

interface Result {
  state: State;
  setLoading: (loading: boolean) => void;
  setPackages: (packages: Array<any>) => void;
}

const state = reactive<State>({
  search: "",
  loading: true,
  packages: [],
});

const setLoading = (loading: boolean) => {
  state.loading = loading;
};

const setPackages = (packages: Array<any>) => {
  state.packages = packages;
};

export default (): Result => {
  return { state, setLoading, setPackages };
};