/**
 * @filename meta-generator.js
 * @summary This library contains functions that will generate meta information for markdown contents,
 *          the meta information will be extracted from the markdown file properties
 * @version 1.0
 * @author  Linyun Liu, https://linyunliu.com
 * @updated 2025-11-01
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');
const { default_properties, page_item_limit } = require('./config');

/**
 * determine if an item is active based on the "active" file property
 *
 * @param {string} str
 * @return {boolean}
 */
function is_active(str){
    if (typeof str === 'string') {
        return str.toLowerCase() === 'true';
    }
    return default_properties.active;
}

/**
 * provide the file name of the markdown file and the content type,
 * the function will find the markdown file in the project and
 * extract its file properties.
 *
 * **Note**: the "link" file property will be overridden if the provided content type is `content_type.blog`
 *
 * @param {string} file_name    - markdown file name
 * @param {object} content_type - content type of the markdown file
 * @return {{title, description, cover, author, keywords, date, active, link: string|any}}
 */
function get_file_properties(file_name, content_type){
    const md = fs.readFileSync(path.join(content_type.content_folder, file_name), 'utf-8');
    const properties = matter(md).data
    return {
        title: file_name.replace(/\.md$/, '').trim()    || default_properties.title,
        description: properties.description                                    || default_properties.description,
        cover: properties.cover                                                || default_properties.cover,
        author: properties.author                                              || default_properties.author,
        keywords: properties.keywords                                          || default_properties.keywords,
        date: properties.date                                                  || new Date().toISOString(),
        active: is_active(properties.active),
        // A link will be auto generated if the content type is "blog"
        // This link will be the url for this blog as well as the dir where
        // the index.html will be saved
        link: content_type.name.includes('blog')
            ? `/blogs/${slugify(file_name).toLowerCase().replace(/\.md$/, '')}`
            : properties.link,
    };
}

/**
 * provide the content type, this function will find all markdown file of that content type and
 * extract their file properties as json, combine them and write it to a meta json file
 *
 * **Note**: This will overwrite the original meta json file
 *
 * @param {object} content_type - content type of the markdown file
 * @return {{items: *[], total: number, limit_per_page: number}|*}
 */
function write_all(content_type){
    const files = fs.readdirSync(path.join(content_type.content_folder)).filter(f => f.endsWith('.md'));
    let items = []
    for (let file of files){
        let item = get_file_properties(file, content_type);
        if (item.active){
            items.push(item)
        }
    }
    const meta = {
        items: items,
        total: items.length,
        limit_per_page: page_item_limit,
    };
    fs.writeFileSync(content_type.meta_file, JSON.stringify(meta, null, 2), 'utf-8');

    return meta;
}

/**
 * provide file name and content type, this function will only add the meta of that one file
 * to the meta json file. If the meta file does not exist, a new one will be created
 *
 * **Note**: If the markdown has an existing meta item, that item will be overwritten
 * instead of adding a new one
 *
 * @param {string} file_name    - markdown file name
 * @param {object} content_type - content type of the markdown file
 * @return {{title, description, cover, author, keywords, date, active, link: (string|*)}}
 */
function write_one(file_name, content_type){
    let item = get_file_properties(file_name, content_type);
    let meta = get_meta(content_type);
    if (item.active) {
        const index = meta.items.findIndex(i => i.title === item.title);
        if (index !== -1) {
            meta.items[index] = item;
        } else {
            meta.items.push(item);
            meta.total += 1;
        }
    } else {
        const index = meta.items.findIndex(i => i.title === item.title);
        if (index !== -1) {
            meta.items.splice(index, 1);
            meta.total -= 1;
        }
    }
    fs.writeFileSync(content_type.meta_file, JSON.stringify(meta, null, 2), 'utf-8');

    return item
}

/**
 * provide a content type, this function will look for the corresponding meta file,
 * if the file does not exist, a minimal meta file json will be returned
 *
 * @param {object} content_type - content type of the markdown file
 * @return {{items: *[], total: number, limit_per_page: number}|any}
 */
function get_meta(content_type){
    if (fs.existsSync(content_type.meta_file)) {
        return JSON.parse(fs.readFileSync(content_type.meta_file, 'utf-8'));
    }
    else {
        return {
            items: [],
            total: 0,
            limit_per_page: page_item_limit
        };
    }
}


module.exports = {
    write_all,
    write_one,
    get_meta
}

