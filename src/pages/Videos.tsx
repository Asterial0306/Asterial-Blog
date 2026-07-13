import { Home, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';

const sortedVideos = [...videos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Videos() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    document.title = '视频 - 星渊博客';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="bilibili-pink-bg py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm">首页</span>
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-white/80 text-sm">视频</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">视频</h1>
          <p className="text-white/80">浏览星渊的视频</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-800">
              共 {sortedVideos.length} 个视频
            </h2>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Home className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无视频内容</h3>
              <p className="text-gray-400 mb-6">敬请期待更多视频更新</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bilibili-pink-bg text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Home className="w-5 h-5" />
                返回首页
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </section>

      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bilibili-pink-bg text-white shadow-lg flex items-center justify-center hover:opacity-90 hover:scale-110 active:scale-95 transition-all duration-200 z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}