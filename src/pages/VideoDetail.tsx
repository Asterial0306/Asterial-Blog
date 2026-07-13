import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { videos } from '../data/videos';
import { getAssetUrl } from '../config/paths';
import BilibiliIcon from '../components/Icons/BilibiliIcon';
import DouyinIcon from '../components/Icons/DouyinIcon';
import XiguaIcon from '../components/Icons/XiguaIcon';
import ProgressiveImage from '../components/ProgressiveImage';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';
import type { Heading } from '../components/TableOfContents';

const platformIcons: Record<string, React.ReactNode> = {
  B站: <BilibiliIcon className="w-5 h-5" />,
  YouTube: <ExternalLink className="w-5 h-5" />,
  抖音: <DouyinIcon className="w-5 h-5" />,
  西瓜视频: <XiguaIcon className="w-5 h-5" />,
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
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    if (video) {
      document.title = `${video.title} - 星渊博客`;
    }
  }, [video]);

  const headings: Heading[] = useMemo(() => {
    if (!video) return [];
    return video.transcript
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return { id: `heading-${index}`, text: line.replace('## ', '') };
        }
        return null;
      })
      .filter((item): item is Heading => item !== null);
  }, [video]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <div className="flex-1 min-w-0">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-6 group cursor-pointer">
                <ProgressiveImage
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
                {video.disclaimer && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-gray-400 italic">{video.disclaimer}</span>
                  </>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-bilibili-pink">
                <p className="text-gray-600 leading-relaxed">{video.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-bilibili-pink/10 text-bilibili-pink text-sm"
                  >
                    #{tag}
                  </span>
                ))}
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
            <div className="hidden lg:block w-56 flex-shrink-0"></div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">视频文字稿</h2>
                <MarkdownRenderer content={video.transcript} />
              </div>
            </div>
            <TableOfContents
              headings={headings}
              activeHeading={activeHeading}
              onHeadingClick={setActiveHeading}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
