import {
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
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
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import ShoppingItemComponent from "../components/ShoppingItem";
import ShoppingHeader from "../components/ShoppingHeader";
const Dashboard: React.FC = () => {
  const { fetchUsersShoppingLists } = useActions();

  const [selectedListItems, selectList] = useState<ShoppingItem[]>([]);
  const [selectedListId, selectListId] = useState<number | null>(null);
  const { onClose, isOpen, onOpen } = useDisclosure();
  // const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    fetchUsersShoppingLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading, shoppinglists, error } = useSelector(
    (state) => state.shoppingList
  );
  const onSelectList = (listIdx: number) => {
    if (isOpen) {
      onClose();
    }
    selectListId(listIdx);
    setTimeout(() => {
      selectList(shoppinglists[listIdx]["items"]);

      onOpen();
    }, 250);
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

        {!loading ? (
          shoppinglists.map((list, idx) => {
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
            >
              <HStack justifyContent="space-between" padding={2}>
                <HStack justifyContent="space-between" width="50%">
                  <Text fontWeight="bold">Name</Text>
                  <Text fontWeight="bold">Price</Text>
                </HStack>
              </HStack>
              {selectedListItems?.map((item: ShoppingItem) => {
                return <ShoppingItemComponent item={item} />;
              })}
            </VStack>
          </VStack>
          <VStack width="100%">
            <Heading size="md">Add an Item</Heading>
            <HStack width="100%" alignItems="stretch" justifyContent="center">
              <Container>
                <Select width="100%" />
              </Container>
            </HStack>
          </VStack>
        </VStack>
      </ScaleFade>
    </SimpleGrid>
  );
};

export default Dashboard;
