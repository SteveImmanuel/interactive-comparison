import { json, redirect, error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';


export async function GET({ params }) {
    const { modelName, fileName } = params;


    console.log(modelName)
    console.log(fileName)

    const filePath = path.resolve('data', modelName, fileName);

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
    }

    return new Response(file, {
        status: 200,
        headers: {
            'Content-Type': contentType,
        },
        body: file,
    });
};