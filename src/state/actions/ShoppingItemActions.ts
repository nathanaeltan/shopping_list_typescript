import {
  ShoppingItem,
  ShoppingItemActionType,
} from "../action-types/ShoppingListItemActionTypes";

interface GetShoppingItemsSuccessAction {
  type: ShoppingItemActionType.GET_SHOPPING_ITEM_SUCCESS;
  payload: Array<ShoppingItem>;
}

interface GetShoppingItemsFailAction {
  type: ShoppingItemActionType.GET_SHOPPING_ITEM_FAIL;
  payload: string;
}

export type ShoppingItemAction =
  | GetShoppingItemsSuccessAction
  | GetShoppingItemsFailAction;
