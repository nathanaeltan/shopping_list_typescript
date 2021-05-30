import axios from "axios";
import { Dispatch } from "redux";
import { ShoppingItemActionType } from "../action-types/ShoppingListItemActionTypes";
import { ShoppingItemAction } from "../actions/ShoppingItemActions";

export const fetchAllShoppingItems =
  () => async (dispatch: Dispatch<ShoppingItemAction>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/shoppingItems`,
        config
      );
      dispatch({
        type: ShoppingItemActionType.GET_SHOPPING_ITEM_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response, "ERROR")
      // if(error.response) {
        dispatch({
          type: ShoppingItemActionType.GET_SHOPPING_ITEM_FAIL,
          payload:
            error.response?.data.message || "Server Error Please try again later",
        });
      // }
   
    }
  };
