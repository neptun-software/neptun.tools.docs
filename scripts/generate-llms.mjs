import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import FirecrawlApp from "firecrawl";

const staticDir = './static';
try {
  mkdirSync(staticDir, { recursive: true });
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

function cleanMarkdown(markdown) {
  return markdown
    // Remove "Skip to main content" links
    .replace(/\[Skip to[^\]]*\][^\n]*/g, '')
    // Fix line endings first
    .replace(/\r\n/g, '\n')
    // Fix spaces after **
    .replace(/\*\* /g, '**')
    // Join multiline link content
    .replace(/\[([^\]]*)\n+([^\]]*)\]/g, '[$1 $2]')
    // Remove backslashes and Overview
    .replace(/\s*\\\s*\n*Overview(?=\])/g, '')
    // Add line breaks between consecutive links
    .replace(/\](\([^)]+\))\[/g, ']$1\n[')
    // Remove any remaining backslashes
    .replace(/\\/g, '')
    // Fix multiple blank lines
    .replace(/\n{3,}/g, '\n\n')
    // Ensure proper spacing around headers
    .replace(/^(#[^#])/gm, '\n$1')
    .trim() + '\n';
}

async function generateLLMsContent() {
  const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
  
  try {
    const result = await app.generateLLMsText('https://neptun-tools-docs.pages.dev/docs', {
      maxUrls: 100,
      showFullText: true
    });

    if (!result.success) {
      throw new Error(`Failed to generate LLMs.txt: ${result.error}`);
    }

    return {
      simple: cleanMarkdown(result.data.llmstxt),
      full: cleanMarkdown(result.data.llmsfulltxt)
    };
  } catch (error) {
    console.error('Error generating LLMs.txt:', error);
    throw error;
  }
}

async function main() {
  try {
    const content = await generateLLMsContent();
    
    writeFileSync(join(staticDir, 'llms.txt'), content.simple, 'utf8');
    writeFileSync(join(staticDir, 'llms-full.txt'), content.full, 'utf8');
    
    console.log('✅ Successfully generated llms.txt and llms-full.txt in static folder');
  } catch (error) {
    console.error('❌ Error generating LLMs files:', error);
    process.exit(1);
  }
}

main();
