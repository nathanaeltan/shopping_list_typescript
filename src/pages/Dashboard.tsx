import { SimpleGrid } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useTypedSelector";
import { ShoppingItem } from "../state/action-types/ShoppingListItemActionTypes";
import { ShoppingList } from "../state/actions/ShoppingListActions";

import ShoppingListComponent from "../components/ShoppingListComponent";
import ShoppingItemsComponent from "../components/ShoppingItemsComponent";

export interface itemOptions {
  value: string;
  label: string;
}

const Dashboard: React.FC = () => {
  // ACTIONS
  const { fetchUsersShoppingLists, fetchAllShoppingItems } = useActions();
  // STATE
  const [selectedListId, selectListId] = useState<number | null>(null);
  const [shoppingItem, selectShoppingItem] = useState<itemOptions | null>(null);
  const [shoppingLists, setShoppingList] = useState<ShoppingList[]>([]);
  const { onClose, isOpen, onOpen } = useDisclosure();

  // REDUX
  const { loading: shoppingListLoading, shoppinglists } = useSelector(
    (state) => state.shoppingList
  );
  const { shoppingItems } = useSelector((state) => state.shoppingItem);

  useEffect(() => {
    if (shoppingListLoading) {
      fetchUsersShoppingLists();
      fetchAllShoppingItems();
    }

    if (shoppinglists) {
      setShoppingList(shoppinglists);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListLoading]);

  const onSelectList = (listIdx: number) => {
    selectShoppingItem(null);
    if (isOpen) {
      onClose();
    }
    selectListId(listIdx);
    setTimeout(() => {
      onOpen();
    }, 250);
  };

  const itemOptions = shoppingItems?.map((shoppingItem): itemOptions => {
    return { value: shoppingItem.itemId, label: shoppingItem.itemName };
  });

  const onItemChange = (data: itemOptions | null) => {
    selectShoppingItem(data);
  };

  const addItemToList = () => {
    if (shoppingItem && selectedListId) {
      const shoppingItemFound: ShoppingItem | undefined = shoppingItems.find(
        (item) => item.itemId === shoppingItem.value
      );
      if (shoppingItemFound) {
        setShoppingList((prevState) => {
          return prevState.map((list, idx) => {
            if (idx === selectedListId) {
              return {
                ...prevState[selectedListId],
                items: [...prevState[selectedListId].items, shoppingItemFound],
              };
            } else {
              return list;
            }
          });
        });
      }
    }
  };

  return (
    <SimpleGrid
      columns={2}
      padding="5"
      height="100vh"
      spacing={4}
      backgroundColor="gray.100"
      border={30}
    >
      <ShoppingListComponent
        shoppingListLoading={shoppingListLoading}
        shoppingLists={shoppingLists}
        onSelectList={onSelectList}
        selectedListId={selectedListId}
      />

      <ShoppingItemsComponent
        isOpen={isOpen}
        selectedListId={selectedListId}
        shoppingLists={shoppingLists}
        itemOptions={itemOptions}
        onItemChange={onItemChange}
        shoppingItem={shoppingItem}
        addItemToList={addItemToList}
      />
    </SimpleGrid>
  );
};

export default Dashboard;
