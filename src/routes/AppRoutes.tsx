import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Home } from '@/pages/Home'
import { MyPage } from '@/pages/MyPage'
import { RequireAuth } from '@/routes/RequireAuth'
import { OrderPage } from '@/pages/OrderPage/OrderPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemePage } from '@/pages/ThemePage'

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={ROUTE_PATH.HOME} element={<Home />} />
        <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path={ROUTE_PATH.MY} element={<MyPage />} />
          <Route path={ROUTE_PATH.ORDER} element={<OrderPage />} />
        </Route>
        <Route path={ROUTE_PATH.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={ROUTE_PATH.THEMES} element={<ThemePage />} />
      </Routes>
      <ToastContainer position="bottom-center" hideProgressBar />
    </>
  )
}

export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  MY: '/my',
  ORDER: '/order/:id',
  THEMES: '/themes/:themeId',
  NOT_FOUND: '*',
}
