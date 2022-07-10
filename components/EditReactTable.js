import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import GlobalFilter from "./GlobalFilter";
import PaginationButton from "./PaginationButton";

const EditReactTable = ({ columns, data, setCsv }) => {
  // https://react-table.tanstack.com/docs/examples/editable-data
  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
      setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value);
    };

    // // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input value={value} onChange={onChange} onBlur={onBlur} />;
  };

  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: EditableCell,
  };

  const updateMyData = (rowIndex, columnId, value) => {
    setCsv((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      /* editable data */
      defaultColumn,
      updateMyData,
      /* pagination */
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="d-flex justify-content-end mt-3">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>

      <Table {...getTableProps()} className="table-bordered mt-3" responsive>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      {...cell.getCellProps({
                        style: {
                          minWidth: 200,
                        },
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="pagination mt-3">
        <PaginationButton text="<<" onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
        <PaginationButton text="<" onClick={() => previousPage()} disabled={!canPreviousPage} />
        <PaginationButton text=">" onClick={() => nextPage()} disabled={!canNextPage} />
        <PaginationButton
          text=">>"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />

        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{
              width: "100px",
              marginLeft: "5px",
              marginRight: "10px",
            }}
          />
        </span>

        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default EditReactTable;
