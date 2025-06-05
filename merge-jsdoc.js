const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

/**
 * Объединяет HTML-файлы JSDoc в один файл.
 * @param {string} inputDir - Папка с HTML-файлами JSDoc.
 * @param {string} outputFile - Имя выходного HTML-файла.
 */
async function mergeJsdocHtml(inputDir, outputFile) {
  try {
    const files = await fs.readdir(inputDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    let combinedContent = '';

    for (const file of htmlFiles) {
      const filePath = path.join(inputDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const $ = cheerio.load(content);
      const mainContent = $('main').html() || $('body').html();
      combinedContent += `<div><h1>${file}</h1>${mainContent}</div>`;
    }

    const template = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>JSDoc Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #333; }
          pre { background: #f4f4f4; padding: 10px; }
        </style>
      </head>
      <body>
        ${combinedContent}
      </body>
      </html>
    `;

    await fs.writeFile(outputFile, template);
    console.log(`Объединённый HTML сохранён в ${outputFile}`);
  } catch (err) {
    console.error('Ошибка:', err);
  }
}

mergeJsdocHtml('./out', 'combined-docs.html');