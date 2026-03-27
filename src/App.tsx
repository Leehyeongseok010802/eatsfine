import { useState, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ExperienceSection from "@/components/ExperienceSection";
import GallerySection from "@/components/GallerySection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import MyPage from "@/pages/MyPage";
import Reserve from "@/pages/Reserve";
import PartnerRegister from "@/pages/PartnerRegister";
import { getSession, logout, type User } from "@/utils/auth";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [user, setUser] = useState<User | null>(null);

  // 브라우저 뒤로가기/앞으로가기 지원을 위한 History API 연동
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    
    // 초기 로드 시 현재 상태를 history에 저장
    window.history.replaceState({ page: "home" }, "", "");

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({ page }, "", "");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setUser(getSession());
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigateTo("home");
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      {currentPage === "home" ? (
        <main className="bg-bg">
          <Header onNavigate={navigateTo} user={user} onLogout={handleLogout} />
          <HeroSection onNavigate={navigateTo} />
          <PhilosophySection />
          <ExperienceSection />
          <GallerySection />
          <CtaSection onNavigate={navigateTo} />
          <Footer />
        </main>
      ) : currentPage === "signup" ? (
        <SignUp onNavigate={navigateTo} onLogin={handleLogin} />
      ) : currentPage === "mypage" ? (
        <main className="bg-bg">
          <Header onNavigate={navigateTo} user={user} onLogout={handleLogout} />
          <MyPage user={user} onNavigate={navigateTo} />
          <Footer />
        </main>
      ) : currentPage === "partner-register" ? (
        <main className="bg-bg">
          <Header onNavigate={navigateTo} user={user} onLogout={handleLogout} />
          <PartnerRegister onNavigate={navigateTo} />
          <Footer />
        </main>
      ) : currentPage === "reserve" ? (
        <main className="bg-bg">
          <Header onNavigate={navigateTo} user={user} onLogout={handleLogout} />
          <Reserve />
          <Footer />
        </main>
      ) : (
        <Login onNavigate={navigateTo} onLogin={handleLogin} />
      )}
    </SmoothScroll>
  );
}
