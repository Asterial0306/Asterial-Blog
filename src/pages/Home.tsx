import { ArrowRight, Play, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import ArticleCard from '../components/ArticleCard';
import { videos } from '../data/videos';
import { articles } from '../data/articles';

export default function Home() {
  useEffect(() => {
    document.title = '星渊博客';
  }, []);
  const latestVideos = videos.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">最新视频</h2>
              <p className="text-gray-500 mt-1">探索最新的游戏测评和视频内容</p>
            </div>
            <Link
              to="/videos"
              className="text-bilibili-pink font-medium hover:underline flex items-center gap-1"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {latestVideos.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <Play className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无视频内容</h3>
              <p className="text-gray-400">精彩内容即将上线，敬请期待</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">最新文章</h2>
              <p className="text-gray-500 mt-1">深入阅读技术文章和学习笔记</p>
            </div>
            <Link
              to="/articles"
              className="text-bilibili-pink font-medium hover:underline flex items-center gap-1"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {latestArticles.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无文章内容</h3>
              <p className="text-gray-400">深度文章即将发布，敬请期待</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}