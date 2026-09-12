import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function MarkdownContent({ content }) {
  if (typeof content !== "string") return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mt-10 mb-6 pb-3 border-b-2 border-indigo-200 flex items-center gap-3 text-gray-900">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-700 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 leading-relaxed text-[17px] mb-4">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-3 mb-6 ml-6">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="text-gray-700 leading-relaxed text-[17px] flex items-start gap-3">
            <span className="text-indigo-500 font-bold mt-1">•</span>
            <span className="flex-1">{children}</span>
          </li>
        ),
        ol: ({ children }) => (
          <ol className="space-y-3 mb-6 ml-6 list-decimal list-inside">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 pl-6 pr-4 py-4 my-6 rounded-r-lg">
            <div className="text-gray-800 font-medium text-lg">
              {children}
            </div>
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-t-2 border-gray-200" />,
        strong: ({ children }) => (
          <strong className="font-bold text-indigo-900 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-indigo-600">{children}</em>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-pink-600">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
