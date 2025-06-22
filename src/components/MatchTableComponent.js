import React from 'react';
import { useTable, useSortBy } from 'react-table';

const TableComponent = (input) => {
  const data = React.useMemo(
    () => input.data,
    []
  );
  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Score', accessor: 'score' },
      { Header: 'Expected Outcome', accessor: 'exOut' },
      { Header: 'Real Outcome', accessor: 'realOut' },
      { Header: 'Pregame ELO', accessor: 'pre' },
      { Header: 'Change', accessor: 'change' },
      { Header: 'Postgame ELO', accessor: 'post' },

    // { Header: 'First Name', accessor: 'firstName' },
    // { Header: 'Last Name', accessor: 'lastName' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{ borderBottom: 'solid 3px red', background: 'aliceblue', cursor: 'pointer' ,background: '#1e1e1e', color: '#f5f5f5'}}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{ padding: '10px', border: 'solid 1px gray', background: '#1e1e1e', color: '#f5f5f5' }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
