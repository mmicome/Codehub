const getEnv = () => {
  /**
   * 这里写判断环境代码，
   * 最终返回对应的环境标识
   */
  return "prod";
};

const env = getEnv();

// 不同环境标识输出不同 host
export const submodule = {
  prod: "//prod.com",
  pre: "//pre.sh",
  test: "//test.com"
}[env];
