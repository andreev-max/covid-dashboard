import { Types } from "./types";

export function setData() {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      dispatch({
        type: Types.SET_DATA,
        payload: res.json(),
      });
      return res.json();
    } catch (e) {
      console.log(e);
    }
  };
}
