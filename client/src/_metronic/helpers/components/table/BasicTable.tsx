import { useMemo } from "react";
import { Column, useTable } from "react-table";
import clsx from "clsx";

import { ListLoading } from "./components/loading/ListLoading";
import { Pagination } from "./components/pagination/ListPagination";
import { ListHeader } from "./components/header/ListHeader";

type BasicTableProps = {
  dataList: Array<Object>;
  columnsList: ReadonlyArray<Column<Object>>;
  isLoading: Boolean;

  page: number;
  setPage: (arg: any) => void;
  itemsPerPage: number;
  setItemsPerPage: (arg: any) => void;
  total: number;
  pages: number;

  children?: JSX.Element;
};

function BasicTable(props: BasicTableProps) {
  const { dataList, columnsList, isLoading, children } = props;


  const data = useMemo(() => dataList, [dataList]);
  const columns = useMemo(() => [...columnsList], [columnsList]);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <>
      <div className="card border-0 p-0 m-0">
        <ListHeader>
          {children ? children : null}
        </ListHeader>
      </div>

      <div className="px-10 pt-2">
        <div
          className=""
          style={{ maxHeight: "70vh", minHeight:"20vh", maxWidth: "100%", overflowX: "auto" }}
        >
          <table
            id="kt_table_users"
            className="table table-hover align-middle table-row-dashed"
            {...getTableProps()}
          >
            <thead >
              <tr
                className={"fw-bolder fs-7 text-uppercase gs-0 "}
              >
                {headers.map((column, index) => (
                  <>
                    {column.Header && typeof column.Header === "string"
                      ? (
                        <th
                          {...column.getHeaderProps({
                            className: column.id !== "actions"
                              ? "text-start"
                              : "text-end px-4",
                            style: (column.id !== "actions" && column.Header !== "No") ? { minWidth: "125px", maxWidth: "300px"  } : {},
                          })}
                          id="header-column"
                          key={index}
                          style={{ backgroundColor: "white !important"}}

                        >
                          {column.render("Header")}
                        </th>
                      )
                      : (
                        column.render("Header")
                      )}
                  </>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
              {rows.length > 0
                ? (
                  rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps({
                          className:
                            "border-bottom border-top border-dark ",
                        })}
                        key={i}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={clsx({
                                "text-end": cell.column.id === "actions",
                              })}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )
                : (
                  <tr>
                    <td colSpan={7}>
                      <div className="d-flex text-center w-100 align-content-center justify-content-center">
                        No hay datos
                      </div>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between pt-4">
          <div className="d-flex align-items-center h-100">
            <select
              value={props.itemsPerPage}
              onChange={(e) => {
                props.setItemsPerPage(Number(e.target.value));
              }}
              className="form-select form-select-sm form-select-solid w-75px me-4"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span>
              Página {props.page} de {props.pages}
            </span>
          </div>
          <Pagination
            totalCount={props.total}
            pageSize={props.itemsPerPage}
            currentPage={props.page}
            onPageChange={props.setPage}
          />
        </div>
        {isLoading && <ListLoading />}
      </div>
    </>
  );
}

export { BasicTable };
