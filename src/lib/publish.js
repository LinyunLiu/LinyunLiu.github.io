/**
 * @filename publish.js
 * @summary This library contains functions that will publish markdown files
 * @version 1.0
 * @author  Linyun Liu, https://linyunliu.com
 * @updated 2025-11-01
 */

const meta_generator = require('./meta-generator')
const html_generator = require('./html-generator')
const sanitizer =  require('./sanitizer');
const sync = require('./sync');
const path = require("path");
const chalk = require("chalk");

const dir = path.resolve(__dirname, '..', '..');
const src_folder = path.join(dir, 'contents/assets/imgs');
const publish_folder = path.join(dir, 'docs/assets/imgs');

function publish(file_name, content_type) {
    console.log(chalk.bold.yellow(`Publishing ${content_type.name}: ${file_name}`));
    console.log(`- Writing ${content_type.name} metadata ...`);
    let item = meta_generator.write_one(file_name, content_type);
    sanitizer.sanitize_meta(content_type)
    if (content_type.name === 'blog') {
        console.log(`- Generating html ...`);
        let html = html_generator.export_to_html(`${item.title}.md`, content_type);
        html_generator.render_html_from_template(html, item)
        sanitizer.sanitize_publish(content_type)
    }
    console.log(`- Syncing assets ...`);
    sync.sync_assets(src_folder, publish_folder);
    console.log(chalk.bold.green(`Published!`));
}

function publish_all(content_type) {
    console.log(chalk.bold.yellow(`Publishing all ${content_type.name}s under ${content_type.content_folder}`));
    console.log(`- Writing ${content_type.name} metadata ...`);
    let meta = meta_generator.write_all(content_type);
    if (content_type.name === 'blog') {
        const items = meta.items;
        for (let item of items) {
            console.log(`- Generating html for [${item.title}] ...`);
            let html = html_generator.export_to_html(`${item.title}.md`, content_type);
            html_generator.render_html_from_template(html, item)
        }
        sanitizer.sanitize_publish(content_type)
    }
    console.log(`- Syncing assets ...`);
    sync.sync_assets(src_folder, publish_folder);
    console.log(chalk.bold.green(`Published!`));
}

module.exports = {
    publish,
    publish_all,
}



