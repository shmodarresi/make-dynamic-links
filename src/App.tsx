import React, { useCallback, useState } from "react";
import data from "./data.json";
import { TableData } from "./components/TableData/TableData";
import { StackDirection, SimpleGrid, Box } from "@chakra-ui/react";
import { Pagination } from "./components/Pagination/Pagination";

function App() {
  const AppData = React.useMemo(() => data, []);
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentPageData = AppData.slice(indexOfFirstData, indexOfLastData);
  const NoPages = Math.ceil(AppData.length / rowsPerPage);

  const MakeInfo = useCallback(
    <T extends {_id: number},>(item: T, direction: StackDirection = "column") => {
      const vals = Object.values(item).slice(1);
      const cols = direction === "column" ? 1 : vals.length;
      const gap = direction === "row" ? 0 : 4;
      return (
        <SimpleGrid columns={cols} gap={gap}>
          {vals.map((itemKey, i) => (
            <Box key={i}>
              {typeof itemKey !== "object" ? itemKey : MakeInfo(itemKey)}
            </Box>
          ))}
        </SimpleGrid>
      );
    },
    []
  );
  return (
    <>
      <TableData
        Info={MakeInfo}
        data={currentPageData}
        indexOfFirstData={indexOfFirstData}
      />
      {AppData.length > rowsPerPage && (
        <Pagination
          noPages={NoPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default App;
