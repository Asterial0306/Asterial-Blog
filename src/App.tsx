import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = lazy(() => import("@/pages/Home"));
const Videos = lazy(() => import("@/pages/Videos"));
const VideoDetail = lazy(() => import("@/pages/VideoDetail"));
const Articles = lazy(() => import("@/pages/Articles"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));
const About = lazy(() => import("@/pages/About"));

const basename = '/Asterial-Blog';

export default function App() {
  return (
    <Router basename={basename}>
      <ErrorBoundary>
        <Header />
        <main>
          <Suspense fallback={<div className="min-h-screen pt-16 flex items-center justify-center"><LoadingSpinner text="加载中..." /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/videos/:id" element={<VideoDetail />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </ErrorBoundary>
    </Router>
  );
}
