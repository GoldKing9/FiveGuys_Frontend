import './App.css'
import FirstPage from './pages/FirstPage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import EditingPage from './pages/EditingPage';

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
          path='/editing'
          element={<EditingPage/>}
        />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App


