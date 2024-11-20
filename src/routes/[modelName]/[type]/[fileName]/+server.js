import { json, redirect, error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';


export async function GET({ params }) {
    const { modelName, type, fileName } = params;
    console.log(params)
    const filePath = path.resolve('data', modelName, type, fileName);
    console.log(filePath)
    if (!fs.existsSync(filePath)) {
        throw error(404, 'File not found');
    }

    const file = fs.readFileSync(filePath);
    let contentType;
    switch (path.extname(filePath)) {
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }

    return new Response(file, {
        status: 200,
        headers: {
            'Content-Type': contentType,
        },
        body: file,
    });
};