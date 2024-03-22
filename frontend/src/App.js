import { useState } from 'react';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/account/Login';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
            <Route path='https://vercel-deploy-vert-gamma.vercel.app/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='https://vercel-deploy-vert-gamma.vercel.app/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='https://vercel-deploy-vert-gamma.vercel.app/create' element={<CreatePost />} />
            </Route>

            <Route path='https://vercel-deploy-vert-gamma.vercel.app/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='https://vercel-deploy-vert-gamma.vercel.app/details/:id' element={<DetailView />} />
            </Route>

            <Route path='https://vercel-deploy-vert-gamma.vercel.app/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='https://vercel-deploy-vert-gamma.vercel.app/update/:id' element={<Update />} />
            </Route>

            <Route path='https://vercel-deploy-vert-gamma.vercel.app/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='https://vercel-deploy-vert-gamma.vercel.app/about' element={<About />} />
            </Route>

            <Route path='https://vercel-deploy-vert-gamma.vercel.app/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='https://vercel-deploy-vert-gamma.vercel.app/contact' element={<Contact />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
