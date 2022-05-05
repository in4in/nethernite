import { reactive } from "vue";

interface State {
  size: number;
  page: number;
  total: number;
  maxShow: number,
  divide: number,
}

interface Result {
  state: State;
}

const state = reactive<State>({
  size: 10,
  page: 1,
  total: 0,
  maxShow: 5,
  divide: 3
});

export type Pagination = State;

export default (initialState?: Partial<State>): Result => {
  initialState && Object.keys(initialState).forEach(
    (key) => {
      if (key in state && initialState[key as keyof State]) {
        state[key as keyof State] =
          initialState[key as keyof State] as number;
      }
    }
  );

  return { state };
};
