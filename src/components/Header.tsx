import { useState, useEffect } from 'react';
import { Menu, X, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '视频', href: '/videos' },
  { label: '文章', href: '/articles' },
  { label: '关于', href: '/about' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bilibili-pink-bg flex items-center justify-center transition-transform group-hover:scale-110">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold text-bilibili-pink"
            >星渊博客</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-medium transition-all hover:text-bilibili-pink ${
                  location.pathname === item.href
                    ? 'text-bilibili-pink'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://space.bilibili.com/645774959"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bilibili-pink-bg text-white font-medium hover:opacity-90 transition-opacity"
            >前往B站</a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  location.pathname === item.href
                    ? 'bg-bilibili-pink/10 text-bilibili-pink'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://space.bilibili.com/645774959"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-3 rounded-lg bilibili-pink-bg text-white font-medium text-center"
            >
              前往B站
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
