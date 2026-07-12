import { Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-bilibili-blue text-white text-xs font-medium">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-bilibili-pink transition-colors text-lg">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">
            {article.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Tag className="w-4 h-4" />
              <span>{article.tags.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
