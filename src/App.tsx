import { store } from 'store'
import { Provider } from 'react-redux'
import DeviceList from 'pages/deviceList'

function App() {
  return (
    <Provider store={store}>
      <DeviceList />
    </Provider>
  )
}
export default App
