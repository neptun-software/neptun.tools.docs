import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  content: string | { default: string } | undefined;
}

function extractMermaidContent(content: string): string {
  const match = content.match(/```mermaid\n([\s\S]*?)```/);
  return match ? match[1].trim() : content.trim();
}

export default function MermaidRenderer({
  content,
}: MermaidRendererProps): JSX.Element {
  const elementRef = useRef<HTMLDivElement>(null);
  console.log("Mermaid Content:", content);

  useEffect(() => {
    if (!elementRef.current || !content) {
      return;
    }

    // Handle both string and module default export
    const mermaidString =
      typeof content === "string" ? content : content.default;
    console.log("Mermaid String:", mermaidString);

    if (!mermaidString) {
      if (elementRef.current) {
        elementRef.current.innerHTML = "Invalid Mermaid content format";
      }
      return;
    }

    const cleanMermaidContent = extractMermaidContent(mermaidString);
    console.log("Clean Mermaid Content:", cleanMermaidContent);

    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
    });

    mermaid.render("mermaid-diagram", cleanMermaidContent).then(({ svg }) => {
      if (elementRef.current) {
        elementRef.current.innerHTML = svg;
      }
    });
  }, [content]);

  if (!content) {
    return <div>No Mermaid content available</div>;
  }

  return <div ref={elementRef} className="mermaid-container" />;
}
