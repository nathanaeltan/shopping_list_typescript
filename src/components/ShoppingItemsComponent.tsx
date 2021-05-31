import {
  HStack,
  ScaleFade,
  StackDivider,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { ShoppingItem } from "../state/action-types/ShoppingListItemActionTypes";
import { ShoppingList } from "../state/actions/ShoppingListActions";
import ShoppingHeader from "./ShoppingHeader";
import ShoppingItemComponent from "./ShoppingItem";
import ShoppingItemSelectComponent from "./ShoppingItemSelectComponent";
import { itemOptions } from "../pages/Dashboard";

interface IShoppingItemsComponent {
  isOpen: boolean;
  selectedListId: number | null;
  shoppingLists: ShoppingList[];
  itemOptions: itemOptions[];
  onItemChange: (data: itemOptions | null) => void;
  shoppingItem: itemOptions | null;
  addItemToList: () => void;
}

const ShoppingItemsComponent: React.FC<IShoppingItemsComponent> = ({
  isOpen,
  selectedListId,
  shoppingLists,
  itemOptions,
  onItemChange,
  shoppingItem,
  addItemToList,
}) => {
  return (
    <ScaleFade in={isOpen} unmountOnExit={true}>
      <VStack
        divider={<StackDivider borderColor="gray.400" />}
        bg="green.100"
        height="70vh"
        padding="10"
        spacing={5}
        borderRadius={30}
        justifyContent="space-between"
      >
        <VStack width="100%" divider={<StackDivider borderColor="gray.400" />}>
          <ShoppingHeader header={"Shopping Item"} />
          <VStack
            spacing={2}
            divider={<StackDivider borderColor="gray.200" />}
            alignItems="stretch"
            width="100%"
            overflow="auto"
            height="40vh"
          >
            <HStack justifyContent="space-between" padding={2}>
              <HStack justifyContent="space-between" width="50%">
                <Text fontWeight="bold">Name</Text>
                <Text fontWeight="bold">Price</Text>
              </HStack>
            </HStack>
            {selectedListId !== null &&
              shoppingLists &&
              shoppingLists[selectedListId].items.map((item: ShoppingItem) => {
                return <ShoppingItemComponent key={item.itemId} item={item} />;
              })}
          </VStack>
        </VStack>

        <ShoppingItemSelectComponent
          itemOptions={itemOptions}
          onItemChange={onItemChange}
          shoppingItem={shoppingItem}
          addItemToList={addItemToList}
        />
      </VStack>
    </ScaleFade>
  );
};

export default ShoppingItemsComponent;
