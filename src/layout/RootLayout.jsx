import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      {/* Header 여기가 홈페이지 상단 헤더고 */}
      {/* 아래 main 부분이 나머지 아래 부분임 */}
      <main>
        <Outlet />
      </main>
    </>
  );
}