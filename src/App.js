import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './store';
import Home from './pages/home';
import Detail from './pages/detail';
import Login from './pages/login';
import Register from './pages/register';
import WriteSource from './pages/writeSource';
import Search from './pages/search';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/writeSource" element={<WriteSource />}></Route>
            <Route path="/search/:title" element={<Search />}></Route>
          </Routes>
        </BrowserRouter>
      </div >
    </Provider >
  );
}

export default App;
