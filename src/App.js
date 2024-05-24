import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';
//import Home from './components/Home';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import GetBook from './components/GetBook';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignIn/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<GetBook/>}/>
          <Route path='/add' element={<AddBook/>}/>
          <Route path='/edit/:id' element={<UpdateBook/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
