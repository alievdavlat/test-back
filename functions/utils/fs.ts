import fs, { rmSync, unlink} from 'fs';
import path from 'path';


export const deleteFile = ( name:string ) => {
fs.unlinkSync(path.join(process.cwd(), 'publick', 'static', `${name}`))
}




export function deleteImage(imagePath:string) {
  // Use fs.unlink to delete the image file
  unlink(imagePath, (err) => {
    if (err) {
      console.error(`Error deleting image ${imagePath}: ${err.message}`);
    } else {
      console.log(`Image ${imagePath} deleted successfully.`);
    }
  });
}

