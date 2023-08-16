import { useMemo } from 'react'
import { Column, useTable } from 'react-table'
import { Device } from 'types'

interface TableProps {
  data: Device[]
  error?: Object
  columns: Column<Device>[]
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  // console.log('tql props', props)
  // Create a table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Device>({
    columns: props.columns,
    data: props.data
  })

  if (props.error) {
    return <div>Error</div>
  }

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows?.length
            ? rows.map((row: any) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })
            : 'No data'}
        </tbody>
      </table>
    </div>
  )
}
export default Table
