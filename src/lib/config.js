const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname, '..', '..');
const settings = JSON.parse(fs.readFileSync(path.join(root, 'src/lib',"config.json"), 'utf-8'));

const content_type = {
    blog: {
        name: 'blog',
        content_folder: path.join(root, settings['content_settings']['blog_folder_path']),
        publish_folder: path.join(root, settings['publish_settings']['blog_publish_folder_path']),
        meta_file: path.join(root, settings['publish_settings']['blog_meta_file_path']),
    },
    project: {
        name: 'project',
        content_folder: path.join(root, settings['content_settings']['project_folder_path']),
        publish_folder: path.join(root, settings['publish_settings']['project_publish_folder_path']),
        meta_file: path.join(root, settings['publish_settings']['project_meta_file_path']),
    },
    film:{
        name: 'film',
        content_folder: path.join(root, settings['content_settings']['film_folder_path']),
        publish_folder: path.join(root, settings['publish_settings']['film_publish_folder_path']),
        meta_file: path.join(root, settings['publish_settings']['film_meta_file_path']),
    }
}

const default_properties = {
    title: settings['default_properties']['title'],
    description: settings['default_properties']['description'],
    cover: settings['default_properties']['cover'],
    author: settings['default_properties']['author'],
    keywords: settings['default_properties']['keywords'],
    topic: settings['default_properties']['topic'],
    date: new Date().toISOString(),
    active: settings['default_properties']['active'],
    link: settings['default_properties']['link'],
}

const page_item_limit = settings['page_item_limit'] || 5

const default_blog_template_path = path.join(root, settings['publish_settings']['default_blog_template_path'])

module.exports = {
    settings,
    content_type,
    default_properties,
    page_item_limit,
    default_blog_template_path,
}