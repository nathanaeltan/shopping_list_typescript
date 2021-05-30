import { HStack, IconButton, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { ShoppingItem } from "../state/action-types/ShoppingListItemActionTypes";

const ShoppingItemComponent: React.FC<{ item: ShoppingItem }> = ({ item }) => {
  return (
    <Fragment >
      <HStack
        justifyContent="space-between"
        _hover={{ bg: "green.200" }}
        padding={2}
        borderRadius={20}
        cursor="pointer"
        key={item.itemId}
      >
        <HStack justifyContent="space-between" width="50%">
          <Text>{item.itemName}</Text>

          <Text>${item.price}</Text>
        </HStack>

        <IconButton isRound={true} icon={<FaTrash />} aria-label="delete" />
      </HStack>
    </Fragment>
  );
};

export default ShoppingItemComponent;
