import React from "react";
import CodeBlock from "@theme/CodeBlock";

interface SqlRendererProps {
  content: string | { default: string } | undefined;
}

function extractSqlContent(content: string): string {
  const match = content.match(/```sql\n([\s\S]*?)```/);
  return match ? match[1].trim() : content.trim();
}

export default function SqlRenderer({
  content,
}: SqlRendererProps): JSX.Element {
  console.log("SQL Content:", content);

  if (!content) {
    return <div>No SQL content available</div>;
  }

  // Handle both string and module default export
  const sqlString = typeof content === "string" ? content : content.default;
  console.log("SQL String:", sqlString);

  if (!sqlString) {
    return <div>Invalid SQL content format</div>;
  }

  const cleanSqlContent = extractSqlContent(sqlString);
  console.log("Clean SQL Content:", cleanSqlContent);

  return (
    <CodeBlock language="sql" showLineNumbers>
      {cleanSqlContent}
    </CodeBlock>
  );
}
