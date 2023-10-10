import './App.css'
import FirstPage from './pages/FirstPage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import GlobalStyle from './GlobalStyle';

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route 
          path='/' 
          element={<FirstPage 
            changeMode= {function (): void {
            throw new Error('Function not implemented.');
            }}
          />}
        />
        <Route 
          path='/main'
          element={<MainPage />}
          />
      </Routes>
    </BrowserRouter>
  )
}

export default App


