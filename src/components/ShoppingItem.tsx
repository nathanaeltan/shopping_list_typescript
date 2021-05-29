import { HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { ShoppingItem } from "../state/action-types/ShoppingListItemActionTypes";

const ShoppingItemComponent: React.FC<{ item: ShoppingItem }> = ({ item }) => {
  return (
    <>
      <HStack
        key={item.itemId}
        justifyContent="space-between"
        _hover={{ bg: "green.200" }}
        padding={2}
        borderRadius={20}
        cursor="pointer"
      >
        <HStack justifyContent="space-between" width="50%">
          <Text>{item.itemName}</Text>

          <Text>${item.price}</Text>
        </HStack>

        <IconButton isRound={true} icon={<FaTrash />} aria-label="delete" />
      </HStack>
    </>
  );
};

export default ShoppingItemComponent;
