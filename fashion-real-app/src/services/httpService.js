import axios from "axios";
import { toast } from "react-toastify";
import userService from "./userService";
 
axios.defaults.headers.common["x-auth-token"] = userService.getJwt();

//יירט כל בקשה שנענית בסטטוס לא רצוי ואז להציג הודעה לגולש בהתאם 
axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) toast.error("An unexpected error occurrred.");
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};
export default http;