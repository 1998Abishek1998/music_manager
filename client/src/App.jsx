import { ConfigProvider } from 'antd'
import Routers from './Routers'
import { NotificationProvider } from './components/shared/Notify'

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b"

        }
      }}
    >
      <NotificationProvider>
        <Routers />
      </NotificationProvider>

    </ConfigProvider>
  )
}

export default App
