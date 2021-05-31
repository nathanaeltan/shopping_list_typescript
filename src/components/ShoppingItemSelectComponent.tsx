import {
  Container,
  Heading,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import { itemOptions } from "../pages/Dashboard";
interface IShoppingItemsSelectComponent {
  itemOptions: itemOptions[];
  onItemChange: (data: itemOptions | null) => void;
  shoppingItem: itemOptions | null;
  addItemToList: () => void;
}
const ShoppingItemSelectComponent: React.FC<IShoppingItemsSelectComponent> = ({
  itemOptions,
  onItemChange,
  shoppingItem,
  addItemToList,
}) => {
  return (
    <VStack width="100%">
      <Heading size="md">Add an Item</Heading>
      <HStack width="100%" alignItems="stretch" justifyContent="center">
        <Container>
          <Select
            width="100%"
            options={itemOptions}
            onChange={onItemChange}
            value={shoppingItem}
          />
        </Container>
        <IconButton
          isRound={true}
          icon={<FaPlus />}
          aria-label="addItem"
          bg="green.400"
          onClick={addItemToList}
        />
      </HStack>
    </VStack>
  );
};

export default ShoppingItemSelectComponent;
