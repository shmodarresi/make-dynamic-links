import { Button, Center, Flex, HStack, Stack } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  noPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  noPages,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = Array.from(Array(noPages + 1).keys()).slice(1);

  const nextPage = () => {
    if (currentPage !== noPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <Center py={8}>
      <HStack gap={1}>
        <Button onClick={prevPage}>Prev</Button>
        {pageNumbers.map((pgNumber) => (
          <Button
            key={pgNumber}
            onClick={() => setCurrentPage(pgNumber)}
            colorScheme={currentPage === pgNumber ? "green" : undefined}
          >
            {pgNumber}
          </Button>
        ))}
        <Button onClick={nextPage}>Next</Button>
      </HStack>
    </Center>
  );
};
