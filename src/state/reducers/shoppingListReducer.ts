import { ShoppingItem } from "../action-types/ShoppingListItemTypes";

interface ShoppingList {
  listId: string;
  listName: string;
  items: Array<ShoppingItem>;
}

interface ShoppingListsState {
  loading: boolean;
  shoppinglists: Array<ShoppingList>;
}

const initialState = {
  loading: true,
  shoppinglists: [],
};
const shoppingListReducer = (
  state: ShoppingListsState = initialState,
  action: any
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shoppingListReducer;
