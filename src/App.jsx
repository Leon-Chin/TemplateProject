import './index.less'
import MyRouter from './router/routers.jsx'
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

const App = () => {
    return (
        <ConfigProvider locale={enUS}>
            <MyRouter />
        </ConfigProvider>
    )
}
export default App
