import { Youtube, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bilibili-pink-bg flex items-center justify-center">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">星渊博客</span>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-400 hover:text-bilibili-pink transition-colors">首页</Link>
            <Link to="/videos" className="text-gray-400 hover:text-bilibili-pink transition-colors">视频</Link>
            <Link to="/articles" className="text-gray-400 hover:text-bilibili-pink transition-colors">文章</Link>
            <Link to="/about" className="text-gray-400 hover:text-bilibili-pink transition-colors">关于</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://space.bilibili.com/645774959"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-bilibili-pink transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
