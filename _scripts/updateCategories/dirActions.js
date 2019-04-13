// get file system library
const fs = require("fs");

// read data from the passed-in folder directory, and pass it back to caller
const readDirectory = (dir) =>
    new Promise((resolve, reject) => {
        if (!dir) reject("Empty directory passed to readDirectory");

        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({ dir, files });
        });
    });

// read data from passed-in file directory, and pass it back to caller
const readFile = (dir) =>
    new Promise((resolve, reject) => {
        if (!dir) reject("Empty directory passed to readFile");

        fs.readFile(dir, "utf8", function(err, data) {
            // handle error
            if (err) {
                reject(err);
                return;
            }

            if (data === undefined)
                reject("No data returned from file: " + dir);

            resolve(data);
        });
    });

// write passed-in data to passed-in file directory
const writeFile = (dir, data) =>
    new Promise((resolve, reject) => {
        if (!dir) reject("Empty directory passed to writeFile");
        if (!data) reject("Error: No data to be written to new file");

        fs.writeFile(dir, data, (err) => {
            console.log("Writing to file:", dir);
            if (err) {
                reject(err);
                return;
            }

            resolve({ dir });
        });
    });

module.exports = {
    readDirectory,
    readFile,
    writeFile,
};
