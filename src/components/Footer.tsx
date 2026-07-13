import { Link } from 'react-router-dom';
import DouyinIcon from './Icons/DouyinIcon';
import BilibiliIcon from './Icons/BilibiliIcon';
import { getAssetUrl } from '../config/paths';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-bilibili-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img src={getAssetUrl('icon.png')} alt="星渊博客" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold">星渊博客</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">星渊的个人网站</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4">导航</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-gray-400 hover:text-bilibili-pink transition-colors text-sm">首页</Link>
              <Link to="/videos" className="text-gray-400 hover:text-bilibili-pink transition-colors text-sm">视频</Link>
              <Link to="/articles" className="text-gray-400 hover:text-bilibili-pink transition-colors text-sm">文章</Link>
              <Link to="/about" className="text-gray-400 hover:text-bilibili-pink transition-colors text-sm">关于</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4">关注我</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://space.bilibili.com/645774959"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-bilibili-pink transition-colors"
              >
                <BilibiliIcon className="w-5 h-5" />
              </a>
              <a
                href="https://v.douyin.com/dlw52HSZrxI/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-bilibili-pink transition-colors"
              >
                <DouyinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 星渊博客 · 内容采用 CC BY 4.0 协议
          </p>
        </div>
      </div>
    </footer>
  );
}
