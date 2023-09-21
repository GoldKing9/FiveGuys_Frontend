import './App.css'
import GlobalStyle from './GlobalStyle';
import FirstPage from './pages/FirstPage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <GlobalStyle/>
        <Route 
          path='/' 
          element={<FirstPage 
            changeMode= {function (): void {
            throw new Error('Function not implemented.');
            }}
          />}
        />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App


