import React from "react";

export interface BlockNoteInlineContent {
  type: "text" | "link";
  text?: string;
  href?: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    textColor?: string;
    backgroundColor?: string;
  };
}

export interface BlockNoteBlock {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  content?: (BlockNoteInlineContent | string)[];
  children?: BlockNoteBlock[];
}

/**
 * Renders inline text spans with formats (bold, italic, links).
 */
export function RenderInlineContent({
  content,
}: {
  content?: (BlockNoteInlineContent | string)[];
}) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <>
      {content.map((item, idx) => {
        if (typeof item === "string") {
          return <span key={idx}>{item}</span>;
        }

        if (item.type === "link" && item.href) {
          return (
            <a
              key={idx}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-crystal-lilac underline underline-offset-4 decoration-white/30 hover:decoration-crystal-lilac transition-colors"
            >
              {item.text || item.href}
            </a>
          );
        }

        let classes = "";
        if (item.styles?.bold) classes += " font-semibold text-white";
        if (item.styles?.italic) classes += " italic";
        if (item.styles?.strike) classes += " line-through";

        return (
          <span key={idx} className={classes.trim() || undefined}>
            {item.text}
          </span>
        );
      })}
    </>
  );
}

/**
 * Renders structured BlockNote JSON blocks as high-fidelity editorial HTML.
 * Spec: JRN-002, Doc 03 (§18) & Doc 05 (§18).
 */
export function RenderJournalBlocks({ blocks }: { blocks: BlockNoteBlock[] }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-6 text-[#d1d1d6] font-light leading-relaxed text-base sm:text-lg">
      {blocks.map((block) => {
        const key = block.id || Math.random().toString(36);

        switch (block.type) {
          case "heading": {
            const level = (block.props?.level as number) || 2;
            if (level === 1) {
              return (
                <h2
                  key={key}
                  className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight pt-8 pb-2"
                >
                  <RenderInlineContent content={block.content} />
                </h2>
              );
            }
            if (level === 2) {
              return (
                <h3
                  key={key}
                  className="font-display font-light text-xl sm:text-2xl text-white tracking-tight pt-6 pb-1"
                >
                  <RenderInlineContent content={block.content} />
                </h3>
              );
            }
            return (
              <h4
                key={key}
                className="font-display font-medium text-lg sm:text-xl text-[#f5f5f7] tracking-tight pt-4"
              >
                <RenderInlineContent content={block.content} />
              </h4>
            );
          }

          case "paragraph": {
            return (
              <p key={key} className="text-[#a0a5b5] font-light leading-relaxed">
                <RenderInlineContent content={block.content} />
              </p>
            );
          }

          case "bulletListItem": {
            return (
              <div key={key} className="flex items-start gap-3 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crystal-lilac/70 mt-2.5 flex-shrink-0" />
                <div className="text-[#a0a5b5] font-light">
                  <RenderInlineContent content={block.content} />
                </div>
              </div>
            );
          }

          case "numberedListItem": {
            return (
              <div key={key} className="flex items-start gap-3 pl-2">
                <span className="text-xs font-mono text-white/50 mt-1 flex-shrink-0">
                  {(block.props?.index as number) || "•"}
                </span>
                <div className="text-[#a0a5b5] font-light">
                  <RenderInlineContent content={block.content} />
                </div>
              </div>
            );
          }

          case "blockquote": {
            return (
              <blockquote
                key={key}
                className="border-l-2 border-crystal-lilac/50 pl-6 py-2 my-6 bg-white/[0.02] rounded-r-xl italic text-white/90 text-lg sm:text-xl font-light"
              >
                <RenderInlineContent content={block.content} />
              </blockquote>
            );
          }

          case "codeBlock": {
            const codeText = Array.isArray(block.content)
              ? block.content.map((c) => (typeof c === "string" ? c : c.text)).join("")
              : "";
            return (
              <div
                key={key}
                className="my-6 rounded-xl border border-white/10 bg-[#0d0e12] p-5 font-mono text-xs sm:text-sm text-[#e0e2ec] overflow-x-auto"
              >
                <code>{codeText}</code>
              </div>
            );
          }

          case "image": {
            const url = (block.props?.url as string) || "";
            const caption = (block.props?.caption as string) || "";
            if (!url) return null;

            return (
              <figure key={key} className="my-10 space-y-3">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]">
                  <img
                    src={url}
                    alt={caption || "Ilustração do artigo"}
                    className="w-full h-auto object-cover max-h-[600px]"
                    loading="lazy"
                  />
                </div>
                {caption && (
                  <figcaption className="text-center font-mono text-xs text-[#86868b]">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          default:
            return (
              <div key={key}>
                <RenderInlineContent content={block.content} />
              </div>
            );
        }
      })}
    </div>
  );
}
