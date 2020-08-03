import axios from "axios";
import { submodule } from "@config/hosts";

// 导出 API 资源调用函数
export const getTop250Movies = params =>
  axios.get(`${submodule}/v2/movie/top250`, { params });
