import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/**
 * Normalizes inline tables (e.g. models using '||' as row separators) and
 * ensures clean spacing before/after table blocks so GFM parses them cleanly.
 */
export function normalizeMarkdownTables(text) {
  if (!text || typeof text !== "string") return text;

  const lines = text.split(/\r?\n/);
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line contains an inline table using '||'
    if (line.includes("||") && line.includes("|")) {
      const tableStartIdx = line.indexOf("|");
      const prefix = line.slice(0, tableStartIdx).trim();
      const tablePart = line.slice(tableStartIdx).trim();

      if (prefix) {
        processedLines.push(prefix);
        processedLines.push(""); // Blank line before table
      }

      // Split table rows by '||'
      const rawRows = tablePart.split("||").map((r) => r.trim()).filter(Boolean);
      const formattedRows = [];
      let hasDivider = false;

      rawRows.forEach((r) => {
        let cleanRow = r.trim();
        if (cleanRow === "|" || !cleanRow) return;

        // Ensure leading and trailing pipe
        if (!cleanRow.startsWith("|")) cleanRow = "| " + cleanRow;
        if (!cleanRow.endsWith("|")) cleanRow = cleanRow + " |";

        // Check if divider row
        if (/^\|\s*[-:]+[-| :]*\|$/.test(cleanRow)) {
          hasDivider = true;
        }

        formattedRows.push(cleanRow);
      });

      // If divider row is missing, insert one after the header
      if (!hasDivider && formattedRows.length >= 2) {
        const colCount = formattedRows[0].split("|").filter((c) => c.trim().length > 0).length;
        if (colCount > 1) {
          const divider = "| " + Array(colCount).fill("---").join(" | ") + " |";
          formattedRows.splice(1, 0, divider);
        }
      }

      if (formattedRows.length > 0) {
        processedLines.push(...formattedRows);
        processedLines.push(""); // Blank line after table
      }
    } else {
      processedLines.push(line);
    }
  }

  // Ensure any contiguous table block has blank lines before and after it
  const outputLines = [];
  for (let i = 0; i < processedLines.length; i++) {
    const curr = processedLines[i];
    const isTableLine = /^\s*\|.*\|\s*$/.test(curr);
    const prev = i > 0 ? processedLines[i - 1] : null;
    const isPrevTableLine = prev !== null && /^\s*\|.*\|\s*$/.test(prev);

    // If entering a table block and previous line is non-empty, insert blank line
    if (isTableLine && !isPrevTableLine && prev !== null && prev.trim() !== "") {
      outputLines.push("");
    }

    outputLines.push(curr);

    // If leaving a table block and next line is non-empty and non-table, insert blank line
    const next = i + 1 < processedLines.length ? processedLines[i + 1] : null;
    const isNextTableLine = next !== null && /^\s*\|.*\|\s*$/.test(next);
    if (isTableLine && !isNextTableLine && next !== null && next.trim() !== "") {
      outputLines.push("");
    }
  }

  return outputLines.join("\n");
}

export default function MarkdownContent({ content, fontSize = "base" }) {
  if (typeof content !== "string") return null;

  const formattedContent = useMemo(() => normalizeMarkdownTables(content), [content]);

  const fontClasses = {
    sm: "text-[15px] leading-relaxed",
    base: "text-[17px] leading-relaxed",
    lg: "text-[19px] leading-loose",
    xl: "text-[21px] leading-loose",
  }[fontSize] || "text-[17px] leading-relaxed";

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
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
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-2xl border border-[var(--border-primary)] shadow-xs bg-[var(--bg-card)]">
            <table className="w-full text-left border-collapse min-w-[500px]">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[var(--bg-card-muted)] border-b border-[var(--border-primary)] text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-[var(--border-primary)] text-[var(--text-secondary)]">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-[var(--accent-light)]/40 transition-colors">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3.5 font-bold text-[var(--text-primary)] whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className={`px-4 py-3 align-top leading-relaxed text-sm ${fontClasses}`}>
            {children}
          </td>
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
      {formattedContent}
    </ReactMarkdown>
  );
}
