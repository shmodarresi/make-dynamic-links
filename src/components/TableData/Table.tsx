import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { JSONArray, JSONObject } from "../../types";

export interface ListProps {
  data: JSONArray;
  indexOfFirstData: number;
  Info: (obj: JSONObject) => ReactNode;
}

export const TableData: React.FC<ListProps> = ({ data, indexOfFirstData, Info }) => {
  return (
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
              <Td>{indexOfFirstData + index}</Td>
              <Td>{Info(item)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
