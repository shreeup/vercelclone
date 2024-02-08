import fs from 'fs';
import path from 'path';

export function getAllFiles(folderPath: string): string[] {
  let fileList: string[] = [];

  // Get all files and directories in the current directory
  const items = fs.readdirSync(folderPath);

  // Iterate through each item
  items.forEach(item => {
    // Construct full path of the item
    const itemPath = path.join(folderPath, item);

    // Check if the item is a file or directory
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      // If the item is a directory, recursively call the function to list files in the directory
      fileList = fileList.concat(getAllFiles(itemPath));
    } else {
      // If the item is a file, add its path to the file list
      fileList.push(itemPath);
    }
  });

  return fileList;
}
