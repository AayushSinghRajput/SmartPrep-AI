import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function MarkdownContent({ content, fontSize = "base" }) {
  if (typeof content !== "string") return null;

  const fontClasses = {
    sm: "text-[15px] leading-relaxed",
    base: "text-[17px] leading-relaxed",
    lg: "text-[19px] leading-loose",
    xl: "text-[21px] leading-loose",
  }[fontSize] || "text-[17px] leading-relaxed";

  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl sm:text-3xl font-bold mt-10 mb-6 pb-3 border-b-2 border-[var(--border-primary)] flex items-center gap-3 text-[var(--text-primary)]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-[var(--accent-text)] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className={`text-[var(--text-secondary)] mb-5 ${fontClasses}`}>
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-3 mb-6 ml-6">{children}</ul>
        ),
        li: ({ children }) => (
          <li className={`text-[var(--text-secondary)] flex items-start gap-3 ${fontClasses}`}>
            <span className="text-[var(--accent-primary)] font-bold mt-1">•</span>
            <span className="flex-1">{children}</span>
          </li>
        ),
        ol: ({ children }) => (
          <ol className="space-y-3 mb-6 ml-6 list-decimal list-inside text-[var(--text-secondary)]">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[var(--accent-primary)] bg-[var(--accent-light)] pl-6 pr-4 py-4 my-6 rounded-r-xl">
            <div className="text-[var(--text-primary)] font-medium text-lg">
              {children}
            </div>
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-t-2 border-[var(--border-primary)]" />,
        strong: ({ children }) => (
          <strong className="font-bold text-[var(--accent-text)] bg-[var(--accent-light)] px-1.5 py-0.5 rounded border border-[var(--border-primary)]">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-[var(--accent-primary)]">{children}</em>
        ),
        code: ({ children }) => (
          <code className="bg-[var(--code-bg)] text-[var(--code-text)] px-2 py-0.5 rounded text-sm font-mono border border-[var(--border-primary)]">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto my-4 border border-slate-800">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
