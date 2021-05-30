export interface ShoppingItem {
  itemId: string;
  itemName: string;
  price: number;
}

export enum ShoppingItemActionType {
  GET_SHOPPING_ITEM_SUCCESS = "GET_SHOPPING_ITEM_SUCCESS",
  GET_SHOPPING_ITEM_FAIL = "GET_SHOPPING_ITEM_FAIL",
}
