import uuid from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "./types";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
  console.info(msg, alertType);
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: {
        id,
      },
    });
  }, 5000);
};

// export const removeAlert = (msg, alertType) => (dispatch) => {
//   const id = uuid.v4();
//   console.info(msg, alertType);
//   dispatch({
//     type: SET_ALERT,
//     payload: {
//       msg,
//       alertType,
//       id,
//     },
//   });
// };
