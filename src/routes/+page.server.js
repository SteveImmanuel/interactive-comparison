import path from 'path';
import fs from 'fs';
import { promises as fsPromise } from 'fs';

const ALLOWED_EXT = ['.png', '.jpg', '.txt', '.tif']

const getDirectories = async (uri) => {
    const dirs = fs.readdirSync(uri);
    const result = [];
    for (let dir of dirs) {
        const stats = await fsPromise.stat(path.join(uri, dir));
        if (stats.isDirectory()) {
            result.push(dir);
        }
    }
    return result;
}

const getData = (uri) => {
    const dirs = fs.readdirSync(uri);
    const result = {};
    for (let item of dirs) {
        if (ALLOWED_EXT.includes(path.extname(item))) {
            const uid = item.split('.')[0];
            if (!result[uid]) {
                result[uid] = [];
            }
            result[uid].push(item);
        }
    }
    return result;
}

export async function load() {
    const data = {};
    for (let modelName of await getDirectories('data')) {
        data[modelName] = getData(path.join('data', modelName));
    }
    return { data };
}