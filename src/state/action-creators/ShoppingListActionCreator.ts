import axios from "axios";
import { Dispatch } from "redux";
import { ShoppingListActionType } from "../action-types/ShoppingListActionTypes";
import { ShoppingListAction } from "../actions/ShoppingListActions";

export const fetchUsersShoppingLists =
  () => async (dispatch: Dispatch<ShoppingListAction>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    };
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/shoppingLists/${userId}`,
        config
      );
      dispatch({
        type: ShoppingListActionType.GET_SHOPPING_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ShoppingListActionType.GET_SHOPPING_LIST_FAIL,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: ShoppingListActionType.GET_SHOPPING_LIST_FAIL,
          payload: "Failed to fetch shopping lists, please try again later",
        });
      }
    }
  };
