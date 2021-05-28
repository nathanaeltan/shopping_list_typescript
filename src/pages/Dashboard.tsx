import { Heading, SimpleGrid, VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <SimpleGrid columns={2} padding="5" spacing={4} backgroundColor="gray.100">
      <VStack bg="green.100" height="100vh" padding="10" spacing={10}>
        <Heading>Shopping Lists</Heading>
        <Box bg="green.200">Shopping Lists</Box>
        <Box bg="green.200">Shopping Lists</Box>
        <Box bg="green.200">Shopping Lists</Box>
        <Box bg="green.200">Shopping Lists</Box>
        <Box bg="green.200">Shopping Lists</Box>
      </VStack>
      <VStack bg="green.100" height="100vh" padding="10" spacing={10}>
        <Heading>Shopping Items</Heading>
        <Box bg="red.200">Shopping Items</Box>
        <Box bg="red.200">Shopping Items</Box>
        <Box bg="red.200">Shopping Items</Box>
        <Box bg="red.200">Shopping Items</Box>
        <Box bg="red.200">Shopping Items</Box>
      </VStack>
    </SimpleGrid>
  );
};

export default Dashboard;
