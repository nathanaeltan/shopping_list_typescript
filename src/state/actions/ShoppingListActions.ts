import { ShoppingListActionType } from "../action-types/ShoppingListActionTypes";
import { ShoppingItem } from "../action-types/ShoppingListItemActionTypes";

export interface ShoppingList {
  listId: string;
  listName: string;
  items: Array<ShoppingItem> | [];
}

interface GetShoppingListSuccessAction {
  type: ShoppingListActionType.GET_SHOPPING_LIST_SUCCESS;
  payload: Array<ShoppingList>;
}
interface GetShoppingListFailAction {
  type: ShoppingListActionType.GET_SHOPPING_LIST_FAIL;
  payload: string;
}

export type ShoppingListAction =
  | GetShoppingListSuccessAction
  | GetShoppingListFailAction;
