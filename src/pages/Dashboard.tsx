import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useTypedSelector";
import { ShoppingItem } from "../state/action-types/ShoppingListItemActionTypes";

const Dashboard: React.FC = () => {
  const { fetchUsersShoppingLists } = useActions();

  const [selectedListItems, selectList] = useState<ShoppingItem[]>([]);
  const [selectedListId, selectListId] = useState<number | null>(null);
  useEffect(() => {
    fetchUsersShoppingLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading, shoppinglists, error } = useSelector(
    (state) => state.shoppingList
  );
  const onSelectList = (listIdx: number) => {
    selectList(shoppinglists[listIdx]["items"]);
    selectListId(listIdx);
  };
  return (
    <SimpleGrid
      columns={2}
      padding="5"
      height="100vh"
      spacing={4}
      backgroundColor="gray.100"
    >
      <VStack bg="green.100" height="70vh" padding="10" spacing={4}>
        <Heading>Shopping Lists</Heading>
        {!loading ? (
          shoppinglists.map((list, idx) => {
            return (
              <Box
                key={"BOX" + idx}
                onClick={() => onSelectList(idx)}
                _hover={{ bg: "green.200" }}
                cursor="pointer"
                padding="1.5"
                borderRadius={30}
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
      <VStack bg="green.100" height="70vh" padding="10" spacing={4}>
        <Heading>Shopping Items</Heading>
        {selectedListItems.length > 0
          ? selectedListItems.map((item: ShoppingItem) => {
              return <Box key={item.itemId}>{item.itemName}</Box>;
            })
          : null}
      </VStack>
    </SimpleGrid>
  );
};

export default Dashboard;
