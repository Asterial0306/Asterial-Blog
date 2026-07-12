import { ArrowLeft, Calendar, Tag, Share2, Bookmark, Clock } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { articles } from '../data/articles';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - 星渊博客`;
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">文章不存在</h2>
          <Link
            to="/articles"
            className="text-bilibili-blue font-medium hover:underline"
          >
            返回文章列表
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('```')) {
        const codeBlock = lines.slice(index).find((l, i) => i > 0 && l.startsWith('```'));
        const codeIndex = lines.indexOf(codeBlock || '', index);
        const codeContent = lines.slice(index + 1, codeIndex).join('\n');
        return (
          <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            <code>{codeContent}</code>
          </pre>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-bold text-gray-800 mt-8 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-700 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-600 ml-4 mb-2">
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <strong key={index} className="text-gray-800 font-semibold">
            {line.replace(/\*\*/g, '')}
          </strong>
        );
      }
      if (line.trim()) {
        return (
          <p key={index} className="text-gray-600 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="bilibili-pink-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/articles"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{article.title}</h1>
              <p className="text-white/70 text-sm">文章详情</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
            <img
              src={article.cover}
              alt={article.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold text-white mb-2">{article.title}</h2>
              <p className="text-white/80 text-sm line-clamp-2">{article.summary}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Tag className="w-4 h-4" />
              <span>{article.category}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>阅读时间约 5 分钟</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-bilibili-blue/10 text-bilibili-blue text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose max-w-none">
            {renderContent(article.content)}
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-bold text-gray-800 mb-4">相关文章</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles
                .filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.id}
                    to={`/articles/${related.id}`}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={related.cover}
                      alt={related.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-gray-500 text-sm">{related.date}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
