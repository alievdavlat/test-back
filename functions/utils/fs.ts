import fs from 'fs';
import path from 'path';

export const deleteFile = ( name:string ) => {
fs.unlinkSync(path.join(process.cwd(), 'publick', 'static', `${name}`))
}