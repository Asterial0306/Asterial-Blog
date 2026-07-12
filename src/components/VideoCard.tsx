import { Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link to={`/videos/${video.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]">
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          <img
            src={video.cover}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-7 h-7 text-bilibili-pink ml-1" />
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-bilibili-pink transition-colors text-lg">
            {video.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>{video.date}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {video.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}