import fs from 'fs';
import path from 'path';

export const deleteFile = ( name ) => {
fs.unlinkSync(path.join(process.cwd(), 'publick', 'static', `${name}`))
}