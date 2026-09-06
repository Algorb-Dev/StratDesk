"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
  badge?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "python",
  filename,
  showLineNumbers = true,
  className,
  badge,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#080b11] overflow-hidden font-mono text-xs shadow-2xl transition-all",
        className
      )}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10 select-none">
        <div className="flex items-center gap-3">
          {/* Window control dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
          </div>

          {/* Filename / Label */}
          {filename ? (
            <div className="flex items-center gap-1.5 text-text-muted text-[11px]">
              <FileCode className="w-3.5 h-3.5 text-accent" />
              <span className="text-white font-bold">{filename}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-text-muted text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span className="text-slate-300 uppercase tracking-wider">{language}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {badge && (
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-accent/15 text-accent border border-accent/30 uppercase">
              {badge}
            </span>
          )}
          <button
            onClick={handleCopy}
            className={cn(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1.5 border",
              copied
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-white/5 text-text-muted hover:text-white border-white/10 hover:border-white/20"
            )}
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="p-4 overflow-x-auto text-[12px] leading-relaxed select-text font-mono">
        <pre className="table w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                {showLineNumbers && (
                  <td className="table-cell pr-4 text-right select-none text-slate-600 font-mono text-[11px] w-8">
                    {idx + 1}
                  </td>
                )}
                <td className="table-cell whitespace-pre text-slate-300">
                  {formatSyntaxLine(line, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </pre>
      </div>
    </div>
  );
};

// Line-level syntax token coloring helper
function formatSyntaxLine(line: string, language: string): React.ReactNode {
  const trimmed = line.trim();

  // 1. Comments
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // 2. Decorators / CLI commands
  if (trimmed.startsWith("@")) {
    return <span className="text-purple-400 font-semibold">{line}</span>;
  }

  // 3. For cURL / bash lines
  if (language === "bash" || language === "curl") {
    if (trimmed.startsWith("curl") || trimmed.startsWith("pip") || trimmed.startsWith("npm") || trimmed.startsWith("docker")) {
      const parts = line.split(" ");
      return (
        <span>
          <span className="text-sky-400 font-bold">{parts[0]} </span>
          <span className="text-slate-200">{parts.slice(1).join(" ")}</span>
        </span>
      );
    }
  }

  // 4. Tokenize generic lines for Python, TypeScript, and JSON
  const tokens = tokenizeLine(line);
  return <>{tokens}</>;
}

function tokenizeLine(line: string): React.ReactNode[] {
  // Regex to split by strings, comments, numbers, keywords, and identifiers
  const regex = /(".*?"|'.*?'|f".*?"|`.*?`|\b(?:import|from|as|async|await|def|class|return|if|else|try|except|finally|while|for|in|True|False|None|const|let|var|function|export|interface|type|true|false|null)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*(?=\()|[^\s\w"']+|\s+|[A-Za-z_]\w*)/g;
  const matches = line.match(regex) || [line];

  return matches.map((token, i) => {
    // String literals
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      token.startsWith('f"') ||
      (token.startsWith('`') && token.endsWith('`'))
    ) {
      return <span key={i} className="text-emerald-300">{token}</span>;
    }

    // Keywords
    const keywords = new Set([
      "import", "from", "as", "async", "await", "def", "class", "return", "if", "else",
      "try", "except", "finally", "while", "for", "in", "True", "False", "None",
      "const", "let", "var", "function", "export", "interface", "type", "true", "false", "null"
    ]);
    if (keywords.has(token)) {
      return <span key={i} className="text-sky-400 font-semibold">{token}</span>;
    }

    // Numbers
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      return <span key={i} className="text-amber-300">{token}</span>;
    }

    // Function calls
    if (/^[A-Za-z_]\w*$/.test(token) && i + 1 < matches.length && matches[i + 1] === "(") {
      return <span key={i} className="text-cyan-300 font-medium">{token}</span>;
    }

    // Punctuation / Brackets
    if (["{", "}", "[", "]", "(", ")", ":", ",", ".", ";", "=>"].includes(token)) {
      return <span key={i} className="text-slate-400">{token}</span>;
    }

    return <span key={i}>{token}</span>;
  });
}
