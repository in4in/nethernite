import { reactive } from "vue";

interface State {
  loading: boolean;
  search: string;
  packages: Array<any>;
}

interface Result {
  state: State;
}

const state = reactive<State>({
  search: "",
  loading: true,
  packages: [],
});

export default (): Result => {
  return { state };
};
