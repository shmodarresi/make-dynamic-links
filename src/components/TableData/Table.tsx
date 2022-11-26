import {
  Box,
  Checkbox,
  Table,
  TableCaption,
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
import React, { ReactNode, useState } from "react";
import { JSONArray, JSONObject } from "../../types";

export interface ListProps {
  data: JSONArray;
  indexOfFirstData: number;
  Info: (obj: JSONObject) => ReactNode;
}

export const TableData: React.FC<ListProps> = ({
  data,
  indexOfFirstData,
  Info,
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, index]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    }
  };

  return (
    <>
      <Box position="sticky" top="0" p={8} bgColor="gray.50" zIndex="1">
        <HStack>
          <Heading size="md">Selected Items:</Heading>
          <Text as="span">
            {selectedItems.length === 0
              ? "No Item is Selected"
              : selectedItems.join(", ")}
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
                      onChange={(e) =>
                        handleChange(e, indexOfFirstData + index)
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
