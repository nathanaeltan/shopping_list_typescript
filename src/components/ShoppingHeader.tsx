import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

const ShoppingHeader: React.FC<{ header: string }> = ({ header }) => {
  return (
    <VStack>
      <Heading>{header}</Heading>
    </VStack>
  );
};

export default ShoppingHeader;
