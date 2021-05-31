import { Box, StackDivider, VStack, Text, Spinner } from "@chakra-ui/react";
import React from "react";
import { ShoppingList } from "../state/actions/ShoppingListActions";
import ShoppingHeader from "./ShoppingHeader";

interface IShoppingListComponentProps {
  shoppingListLoading: boolean;
  shoppingLists: ShoppingList[];
  onSelectList: Function;
  selectedListId: number | null;
}
const ShoppingListComponent: React.FC<IShoppingListComponentProps> = ({
  shoppingListLoading,
  shoppingLists,
  selectedListId,
  onSelectList,
}) => {
  return (
    <VStack
      bg="green.100"
      height="70vh"
      padding="10"
      spacing={4}
      borderRadius={30}
      alignItems=""
      divider={<StackDivider borderColor="gray.400" />}
    >
      <ShoppingHeader header={"Shopping Lists"} />

      {!shoppingListLoading ? (
        shoppingLists?.map((list: ShoppingList, idx: number) => {
          return (
            <Box
              key={"BOX" + idx}
              onClick={() => onSelectList(idx)}
              _hover={{ bg: "green.200" }}
              cursor="pointer"
              padding="3"
              borderRadius={15}
              bg={selectedListId === idx ? "green.200" : ""}
            >
              <Text>{list.listName}</Text>
            </Box>
          );
        })
      ) : (
        <Spinner />
      )}
    </VStack>
  );
};

export default ShoppingListComponent;
