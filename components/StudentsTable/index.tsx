import {
  TableView,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  ProgressBar,
  Flex,
  TooltipTrigger,
  Tooltip,
  ActionButton,
  NumberField,
  Text,
} from "@adobe/react-spectrum";
import StudentsTableActions from "./StudentsTableActions";
import ReactPaginate from "react-paginate";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";
import ChevronRight from "@spectrum-icons/workflow/ChevronRight";
import { useMediaQuery } from "react-responsive";
import { Key } from "react";
import useStudentsTableState from "./hooks/useStudentsTableState";

const columns = [
  { name: "Name", key: "name" },
  { name: "Module", key: "module" },
  { name: "Progress", key: "progress" },
  { name: "Lesson", key: "lesson" },
  { name: "Actions", key: "actions" },
];

const columnKeys = ["name", "module", "progress", "lesson", "actions"] as const;

const isColumnKey = (key: Key): key is (typeof columnKeys)[number] =>
  typeof key === "string" && (columnKeys as readonly string[]).includes(key);

const StundentsTable = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 625px)" });

  const pageRangeDisplayed = isMobile ? 0 : 5;
  const marginPagesDisplayed = isMobile ? 0 : 3;

  const {
    students,
    totalCount,
    sortDescriptor,
    limit,
    setSortDescriptor,
    handlePageClick,
    handleLimitChange,
  } = useStudentsTableState();

  const pageCount = Math.ceil(totalCount / limit);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <NumberField
          label="Limit"
          value={limit}
          minValue={10}
          maxValue={50}
          onChange={handleLimitChange}
          step={10}
          width={75}
        />
        <ReactPaginate
          className="flex gap-3 items-center self-end mb-2 text-lg"
          breakLabel="..."
          nextLabel={<ChevronRight height={30} width={18} />}
          onPageChange={handlePageClick}
          activeClassName="font-black"
          pageCount={pageCount}
          pageRangeDisplayed={pageRangeDisplayed}
          marginPagesDisplayed={marginPagesDisplayed}
          previousLabel={<ChevronLeft height={30} width={18} />}
          renderOnZeroPageCount={null}
        />
      </Flex>
      <TableView
        onSortChange={setSortDescriptor}
        sortDescriptor={sortDescriptor}
        aria-label="Student table"
        renderEmptyState={() => <Text>No students</Text>}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <Column
              minWidth={150}
              hideHeader={column.key === "actions"}
              align={column.key === "actions" ? "end" : "start"}
              allowsSorting={column.key !== "actions"}
            >
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={students}>
          {(item) => (
            <Row key={item.id}>
              {(key) => {
                if (!isColumnKey(key)) {
                  throw new Error("Column key is incorrect!");
                }
                if (key === "actions") {
                  return (
                    <Cell>
                      <StudentsTableActions student={item} />
                    </Cell>
                  );
                }
                if (key === "progress") {
                  return (
                    <Cell>
                      <TooltipTrigger delay={0}>
                        <ActionButton isQuiet aria-label="progress button">
                          <Flex>
                            <ProgressBar
                              value={item[key]}
                              aria-label="progress bar"
                            />
                          </Flex>
                        </ActionButton>
                        <Tooltip>{item[key]}</Tooltip>
                      </TooltipTrigger>
                    </Cell>
                  );
                }
                return <Cell>{item[key]}</Cell>;
              }}
            </Row>
          )}
        </TableBody>
      </TableView>
    </>
  );
};

export default StundentsTable;
