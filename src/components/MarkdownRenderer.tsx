import ProgressiveImage from './ProgressiveImage';
import { getAssetUrl } from '../config/paths';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderContent = () => {
    const lines = content.split('\n');
    const renderedLines: React.ReactNode[] = [];
    
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      
      if (line.startsWith('```')) {
        const codeBlockEndIndex = lines.slice(index + 1).findIndex(l => l.startsWith('```'));
        if (codeBlockEndIndex !== -1) {
          const codeContent = lines.slice(index + 1, index + 1 + codeBlockEndIndex).join('\n');
          renderedLines.push(
            <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
              <code>{codeContent}</code>
            </pre>
          );
          index += codeBlockEndIndex + 1;
          continue;
        }
      }
      
      const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const alt = imageMatch[1];
        const src = imageMatch[2];
        renderedLines.push(
          <div key={index} className="my-6 shadow-md rounded-xl overflow-hidden">
            <ProgressiveImage src={getAssetUrl(src)} alt={alt} />
            {alt && (
              <p className="text-center text-sm text-gray-400 mt-2">{alt}</p>
            )}
          </div>
        );
        continue;
      }
      
      if (line.startsWith('## ')) {
        renderedLines.push(
          <h2 key={index} id={`heading-${index}`} className="text-xl font-bold text-gray-800 mt-8 mb-4 scroll-mt-20">
            {line.replace('## ', '')}
          </h2>
        );
        continue;
      }
      
      if (line.startsWith('### ')) {
        renderedLines.push(
          <h3 key={index} className="text-lg font-semibold text-gray-700 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
        continue;
      }
      
      if (line.startsWith('- ')) {
        renderedLines.push(
          <li key={index} className="text-gray-600 ml-4 mb-2">
            {line.replace('- ', '')}
          </li>
        );
        continue;
      }
      
      if (line.trim()) {
        let processedLine = line;
        processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
        renderedLines.push(
          <p key={index} className="text-gray-600 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
        );
      }
    }
    
    return renderedLines;
  };

  return <div className="prose max-w-none">{renderContent()}</div>;
}
