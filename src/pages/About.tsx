import { Youtube } from 'lucide-react';
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    document.title = '关于 - 星渊博客';
  }, []);
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">关于我</h1>
          <p className="text-gray-500">了解更多关于我的信息</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-full bg-gray-100 p-2">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-sm">
                  <img
                    src="/avatar.png"
                    alt="头像"
                    className="w-56 h-56 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">你好，我是星渊</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">是一名游戏区UP，欢迎来到我的个人网站!</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://space.bilibili.com/645774959"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-bilibili-pink/10 flex items-center justify-center hover:bg-bilibili-pink/20 transition-colors"
                >
                  <Youtube className="w-6 h-6 text-bilibili-pink" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}