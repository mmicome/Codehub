const loader = path =>
  import(/* webpackChunkName: "chunk-[request][index]" */ `${path}`);

export default {
  loader: loader
};
