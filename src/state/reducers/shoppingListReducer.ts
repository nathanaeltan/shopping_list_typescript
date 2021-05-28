import { ShoppingListActionType } from "../action-types/ShoppingListActionTypes";
import { ShoppingItem } from "../action-types/ShoppingListItemActionTypes";
import { ShoppingListAction } from "../actions/ShoppingListActions";
interface ShoppingList {
  listId: string;
  listName: string;
  items: Array<ShoppingItem>;
}

interface ShoppingListsState {
  loading: boolean;
  shoppinglists: Array<ShoppingList>;
  error: string | null;
}

const initialState = {
  loading: true,
  shoppinglists: [],
  error: null,
};
const shoppingListReducer = (
  state: ShoppingListsState = initialState,
  action: ShoppingListAction
) => {
  switch (action.type) {
    case ShoppingListActionType.GET_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        shoppinglists: action.payload,
        loading: false,
        error: null,
      };

    case ShoppingListActionType.GET_SHOPPING_LIST_FAIL:
      return {
        ...state,
        shoppinglists: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shoppingListReducer;
