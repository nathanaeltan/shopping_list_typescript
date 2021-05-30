import {
  ShoppingItem,
  ShoppingItemActionType,
} from "../action-types/ShoppingListItemActionTypes";
import { ShoppingItemAction } from "../actions/ShoppingItemActions";

interface ShoppingItemState {
  loading: boolean;
  shoppingItems: Array<ShoppingItem>;
  error: string | null;
}

const initialState = {
  loading: true,
  shoppingItems: [],
  error: null,
};

const shoppinngItemReducer = (
  state: ShoppingItemState = initialState,
  action: ShoppingItemAction
) => {
  switch (action.type) {
    case ShoppingItemActionType.GET_SHOPPING_ITEM_SUCCESS:
      return {
        ...state,
        shoppingItems: action.payload,
        error: null,
        loading: false,
      };

    case ShoppingItemActionType.GET_SHOPPING_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default shoppinngItemReducer;
