import axios from "axios";
import { USER_DELETED } from "../actions/actions";

const deleteUser = (dispatch, userId, history) => {
  axios
    .delete(`/delete/${userId}`)
    .then(res => {
      console.log(dispatch);
      dispatch({ type: USER_DELETED });
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.authorization;
      history.push("/delete");
    })
    .catch(error => console.log(error.response.data.error));
};

export default { deleteUser };