/**
 * @filename html-generator.js
 * @summary This library contains functions that will generate html for the markdown contents
 * @version 1.0
 * @author  Linyun Liu, https://linyunliu.com
 * @updated 2025-11-01
 */

const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');
const { marked } = require('marked');
const ejs =  require('ejs')
const { default_blog_template_path } = require('./config');
const root = path.resolve(__dirname, '..', '..');

/**
 * provide a file name and content type, this function will look for the markdown file
 * and convert it into raw html contents
 *
 * @param {string} file_name    - markdown file name
 * @param {object} content_type - content type of the markdown file
 * @return {string | Promise<string>}
 */
function export_to_html(file_name, content_type){
    const markdown = fs.readFileSync(path.join(content_type.content_folder, file_name), 'utf-8');
    const content = matter(markdown).content;
    return marked(content);
}


/**
 * provide the converted html content from markdown and markdown meta,
 * this function will utilize ejs to render the final index html page and
 * out it in the folder for publish
 *
 * @param content
 * @param properties
 */
function render_html_from_template(content, properties){
    const page = ejs.render(fs.readFileSync(default_blog_template_path, "utf8"), {
        title: properties.title,
        description: properties.description,
        author: properties.author,
        keywords: properties.keywords.join(', '),
        content: content,
    })
    const publish_path = path.join(root, "docs", properties.link, "index.html");
    fs.mkdirSync(path.dirname(publish_path), { recursive: true });
    fs.writeFileSync(publish_path, page, "utf-8");
}

module.exports = {
    render_html_from_template,
    export_to_html,
}

