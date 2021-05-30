import {
  Heading,
  HStack,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Box,
  Container,
  IconButton,
  ScaleFade,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useTypedSelector";
import { ShoppingItem } from "../state/action-types/ShoppingListItemActionTypes";
import { ShoppingList } from "../state/actions/ShoppingListActions";
import Select from "react-select";
import ShoppingItemComponent from "../components/ShoppingItem";
import ShoppingHeader from "../components/ShoppingHeader";
import { FaPlus } from "react-icons/fa";

interface itemOptions {
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
  const { shoppingItems, loading: shoppingItemLoading } = useSelector(
    (state) => state.shoppingItem
  );

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
          <VStack
            width="100%"
            divider={<StackDivider borderColor="gray.400" />}
          >
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
                shoppingLists[selectedListId].items.map(
                  (item: ShoppingItem) => {
                    return (
                      <ShoppingItemComponent key={item.itemId} item={item} />
                    );
                  }
                )}
            </VStack>
          </VStack>
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
        </VStack>
      </ScaleFade>
    </SimpleGrid>
  );
};

export default Dashboard;
