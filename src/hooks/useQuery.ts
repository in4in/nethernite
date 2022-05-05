import { ref, Ref } from "vue";
import {
  useRouter,
  LocationQueryRaw,
  RouteParams,
  Router,
} from "vue-router";

interface Result {
  getQuery: () => LocationQueryRaw;
  getParams: () => RouteParams;
  setQuery: (value: LocationQueryRaw) => void;
}

let _router: Router;

const setQuery = (
  value: LocationQueryRaw,
  pushState = true
): void => {
  const { name, params, query } = _router.currentRoute.value;
  const newQuery = {
    ...query,
    ...value,
  };
  pushState && name && _router.push({
    name,
    params,
    query: Object.keys(newQuery).reduce((result, key) => {
      if (newQuery[key]) {
        result[key] = newQuery[key];
      }
      return result;
    }, {} as typeof newQuery),
  });
};

const getQuery = () => _router.currentRoute.value.query;
const getParams = () => _router.currentRoute.value.params;

export default (): Result => {
  _router = useRouter();

  return {
    getQuery,
    getParams,
    setQuery,
  };
};
