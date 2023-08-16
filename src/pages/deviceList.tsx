import Table from 'components/Table/Table'
import { useGetAllQuery, useGetDeviceQuery } from 'services/device'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Column } from 'react-table'
import { Device } from 'types'
import { StatusColor } from 'constant/StatusColor'
import { throttle } from 'helpers/throttle'

function DeviceList() {
  const { data, isFetching } = useGetAllQuery()
  let arr: { current: Device[] | [] } = {
    current: []
  }
  const [list, setList] = useState<Device[] | []>([])
  const { data: detail } = useGetDeviceQuery({ id: 1 })

  useEffect(() => {
    if (data?.length) {
      arr.current = data ?? []
      setList(data)

      const eventSource = new EventSource(`http://localhost:4000/events`)
      eventSource.onmessage = (e) => {
        // TODO throttle
        handleDataMessage(JSON.parse(e?.data))
      }
      return () => {
        eventSource.close()
      }
    }
  }, [data])

  const handleDataMessage = (rowData: Device) => {
    let newList = arr.current.map((item) => {
      if (item.id === rowData.id) {
        item = rowData
      }
      return item
    })

    setList(Object.assign([], newList))
  }

  const columns: Column<Device>[] = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Location', accessor: 'location' },
      {
        Header: 'Current Temperature',
        accessor: 'currentTemperature'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => {
          return <span style={{ color: StatusColor[row.original.status] }}>{row.original.status}</span>
        }
      }
    ],
    []
  )

  return (
    <div className='App'>
      <h1>IoT Device Dashboard</h1>
      {isFetching ? <p>Loading...</p> : <Table data={list} columns={columns} />}
    </div>
  )
}

export default DeviceList
