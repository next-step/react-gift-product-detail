import { Home, Login, MyPage, NotFound, Order } from '@/pages'
import { Routes, Route } from 'react-router-dom'
import { Themes } from '@/pages/Themes'
import { Layout } from '@/shared/components'
import { ROUTE_PATH } from '@/shared/constants'
import { withAuth } from '@/hoc'
import { Product } from '@/pages/Product'

// * 라우터 컴포넌트
const Router = () => {
  return (
    <Routes>
      {/* 레이아웃 (Nav바) */}
      <Route path={ROUTE_PATH.HOME} element={<Layout />}>
        {/* 홈 페이지 */}
        <Route index element={<Home />} />
        {/* 로그인 페이지 */}
        <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
        {/* 마이 페이지 */}
        <Route path={ROUTE_PATH.MY} element={<AuthPages.MyPage />} />
        {/* 주문하기 페이지 */}
        <Route path={`${ROUTE_PATH.ORDER}/:id`} element={<AuthPages.Order />} />
        {/* 테마 상품 목록 페이지 */}
        <Route path={`${ROUTE_PATH.THEMES}/:id`} element={<Themes />} />
        {/* 상품 상세 페이지 */}
        <Route path={`${ROUTE_PATH.PRODUCT}/:id`} element={<Product />} />

        {/* 404 NotFound 페이지 - 기타 구현되지 않은 경로 페이지 */}
        <Route path={ROUTE_PATH.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default Router

// * 인증 요구 페이지
const AuthPages = {
  MyPage: withAuth(MyPage),
  Order: withAuth(Order),
}
