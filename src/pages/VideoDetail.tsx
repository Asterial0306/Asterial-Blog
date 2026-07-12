import { ArrowLeft, Calendar, ExternalLink, Youtube } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { videos } from '../data/videos';
import { getAssetUrl } from '../config/paths';

const platformIcons: Record<string, React.ReactNode> = {
  B站: <Youtube className="w-5 h-5" />,
  YouTube: <Youtube className="w-5 h-5" />,
  抖音: <Youtube className="w-5 h-5" />,
  西瓜视频: <Youtube className="w-5 h-5" />,
};

const platformColors: Record<string, string> = {
  B站: 'bg-[#FB7299]',
  YouTube: 'bg-[#FF0000]',
  抖音: 'bg-[#000000]',
  西瓜视频: 'bg-[#FF6034]',
};

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const video = videos.find((v) => v.id === id);

  useEffect(() => {
    if (video) {
      document.title = `${video.title} - 星渊博客`;
    }
  }, [video]);

  if (!video) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">视频不存在</h2>
          <Link
            to="/videos"
            className="text-bilibili-pink font-medium hover:underline"
          >
            返回视频列表
          </Link>
        </div>
      </div>
    );
  }

  const renderTranscript = (transcript: string) => {
    const lines = transcript.split('\n');
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
              to="/videos"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{video.title}</h1>
              <p className="text-white/70 text-sm">视频详情</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-6 group cursor-pointer">
            <img
              src={getAssetUrl(video.cover)}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{video.date}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="px-2 py-0.5 rounded-full bg-bilibili-pink/10 text-bilibili-pink text-xs font-medium">
              {video.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-gray-400 italic">个人观点，仅供参考</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-bilibili-pink">
            <p className="text-gray-600 leading-relaxed">{video.description}</p>
          </div>

          {video.links.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-bilibili-pink" />
                在各大平台观看
              </h3>
              <div className="flex flex-wrap gap-3">
                {video.links.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${platformColors[link.platform] || 'bg-gray-600'} text-white font-medium hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md`}
                  >
                    {platformIcons[link.platform] || <ExternalLink className="w-4 h-4" />}
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">视频文字稿</h2>
            <div className="prose max-w-none">
              {renderTranscript(video.transcript)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}