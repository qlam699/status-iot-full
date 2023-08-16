import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Device } from 'types'

// Create a new RTK Query API
export const devicesApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['Devices'],
  endpoints: (builder) => ({
    getAll: builder.query<Device[], void>({
      query: () => `gendevices`,
      providesTags: [{ type: 'Devices', id: 'LIST' }]
    }),
    getDevice: builder.query<Device, { id: number }>({
      query: (arg) => {
        return {
          url: 'device/',
          params: { id: arg.id }
        }
      },
      providesTags: [{ type: 'Devices', id: 'LIST' }]
    })
    // addTodo: builder.mutation<string, string>({
    //   query(text) {
    //     return {
    //       url: `todos`,
    //       method: 'POST',
    //       body: {
    //         text
    //       }
    //     }
    //   },
    //   invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    // }),
    // updateTodo: builder.mutation<Device, Device>({
    //   query(todo) {
    //     return {
    //       url: `todos/${todo.id}`,
    //       method: 'PUT',
    //       body: todo
    //     }
    //   },
    //   invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    // }),
    // deleteTodo: builder.mutation<Device, Device>({
    //   query(todo) {
    //     return {
    //       url: `todos/${todo.id}`,
    //       method: 'DELETE',
    //       body: todo
    //     }
    //   },
    //   invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    // })
  })
})
export const { useGetAllQuery, useGetDeviceQuery } = devicesApi
