import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { RoomContextProvider } from './context/RoomContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <RoomContextProvider>
      <App />
    </RoomContextProvider>
  </BrowserRouter>
);
