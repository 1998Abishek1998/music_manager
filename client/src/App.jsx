import { ConfigProvider } from 'antd'
import Routers from './Routers'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NotificationProvider } from './components/shared/Notify'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b"

        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Routers />
        </NotificationProvider>
      </QueryClientProvider>

    </ConfigProvider>
  )
}

export default App
