const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

function sync_assets(src, dest) {
    const src_files = fs.readdirSync(src);
    const dest_files = fs.existsSync(dest) ? fs.readdirSync(dest) : [];
    // Copy or overwrite files from source to destination
    for (const file of src_files) {
        const src_path = path.join(src, file);
        const dest_path = path.join(dest, file);
        const stat = fs.statSync(src_path);
        if (stat.isDirectory()) {
            // recursively sync subfolders
            sync_assets(src_path, dest_path);
        } else {
            // copy if not exist or modified
            const shouldCopy =
                !fs.existsSync(dest_path) ||
                fs.statSync(dest_path).mtimeMs < stat.mtimeMs;

            if (shouldCopy) {
                fse.copySync(src_path, dest_path);
            }
        }
    }
    // Remove files that don’t exist in source
    for (const file of dest_files) {
        const src_path = path.join(src, file);
        const dest_path = path.join(dest, file);
        if (!fs.existsSync(src_path)) {
            fse.removeSync(dest_path);
        }
    }
}

module.exports = {
    sync_assets
};
