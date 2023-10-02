import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from './components/protectedRoute';
import { MainLayout } from '../pages/layout/app-layout';
import { SignUpPage } from '../pages/SignUpPage/SignUp';
import { LandingPage } from '../pages/MainContent/MainLayout';
import { CriarPet, PetProfile } from '../pages/Pet/';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cadastro"
            element={
              <SignUpPage />
            }
          />
          <Route path="/login"
            element={
              <LoginPage />
            }
          />
          <Route path="/colocar-para-adocao"
            element={
              <CriarPet />
            }
          />
          <Route path="/pet/:id"
            element={
              <PetProfile />
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes