import { Types } from "./types";

const initState = {
  data: {},
};

export function rootReducer(state: any = initState, action: any): any {
  switch (action.type) {
    case Types.SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
