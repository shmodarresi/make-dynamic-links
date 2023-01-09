import {
  Box,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
  HStack,
  Container,
} from "@chakra-ui/react";
import React, { ReactNode, useMemo, useState } from "react";

export interface TableDataProps<T extends {_id: number}> {
  data: T[];
  indexOfFirstData: number;
  Info: (item: T) => ReactNode;
}

export const TableData = <T extends {_id: number},>({
  data,
  indexOfFirstData,
  Info,
}: TableDataProps<T>) => {

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleChange = (index: number) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(index)) {
        return prevCheckedItems.filter((itemIndex) => itemIndex !== index);
      } else {
        return [...prevCheckedItems, index];
      }
    });
  };

  const checkedItemIndexes = useMemo(
    () => checkedItems.join(", "),
    [checkedItems]
  );

  return (
    <>
      <Box position="sticky" top="0" p={8} bgColor="gray.50" zIndex="1">
        <HStack>
          <Heading size="md">Selected Items:</Heading>
          <Text as="span">
            {checkedItemIndexes.length === 0
              ? "No Item is Selected"
              : checkedItemIndexes}
          </Text>
        </HStack>
      </Box>
      <Container maxW="container.xl">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Info</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr className="row" key={indexOfFirstData + index}>
                  <Td>
                    <Checkbox
                      onChange={() =>
                        handleChange(indexOfFirstData + index)
                      }
                    />
                  </Td>
                  <Td>{Info(item)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
