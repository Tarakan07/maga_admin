import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@/styles/theme/sizes.css'
import '@/styles/reset.scss'
import '@/styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
