import { List } from 'lucide-react';

export interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  activeHeading: string;
  onHeadingClick: (id: string) => void;
}

export default function TableOfContents({ headings, activeHeading, onHeadingClick }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <List className="w-4 h-4 text-bilibili-pink" />
            目录
          </h3>
          <nav className="flex flex-col gap-1">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={() => onHeadingClick(heading.id)}
                className={`text-sm py-2 px-3 rounded-lg transition-colors border-l-2 ${
                  activeHeading === heading.id
                    ? 'text-bilibili-pink bg-bilibili-pink/5 border-bilibili-pink font-medium'
                    : 'text-gray-500 hover:text-bilibili-pink border-transparent'
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
