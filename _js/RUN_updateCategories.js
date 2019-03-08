// get file system library
const fs = require("fs");

const readDirectory = (dir) =>
    new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({ dir, files });
        });
    });

const writeFile = (dir, data) =>
    new Promise((resolve, reject) => {
        fs.writeFile(dir, data, (err) => {
            console.log("Writing to file:", dir);
            if (err) {
                reject(err);
                return;
            }

            resolve({ dir });
        });
    });

const readFile = (dir) =>
    new Promise((resolve, reject) => {
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

console.log("Begin analysis!");

readDirectory("../_posts")
    .then(({ dir, files: years }) => {
        let yearPromises = years.map((year) => readDirectory(`${dir}/${year}`));

        console.log("Analyze years...", years);

        return Promise.all(yearPromises);
    })
    .then((yearData) => {
        let monthDirs = [];

        yearData.forEach(({ dir, files: months }) => {
            months.forEach((month) => {
                monthDirs.push(`${dir}/${month}`);
            });
        });

        let monthPromises = monthDirs.map((month) => readDirectory(month));

        console.log("Analyze months...");

        return Promise.all(monthPromises);
    })
    .then((monthArr) => {
        // now we have all files, so put them in one array
        let allFiles = [];

        monthArr.forEach(({ dir, files }) => {
            files.forEach((filename) => {
                allFiles.push(`${dir}/${filename}`);
            });
        });

        let readPromises = [];

        console.log("Reading files...");

        allFiles.forEach((file) => {
            readPromises.push(
                readFile(file).then((data) => {
                    let categoryContainer = [];
                    let startRow = -1,
                        lastRow;
                    let lines = data.split("\r\n");

                    for (let i = 0; i < lines.length; i++) {
                        let line = lines[i];

                        // if startRow found, look for lastRow
                        if (startRow >= 0) {
                            // if lastRow found, quit early
                            if (lastRow) break;

                            if (line === "---") lastRow = i;
                        } else if (line === "---") startRow = i;
                    }

                    if (startRow < 0 || !lastRow) {
                        console.log(
                            `Something's wrong! start: ${startRow}, end: ${lastRow}`
                        );
                    }

                    let categoriesFound = false;
                    for (let i = startRow + 1; i < lastRow; i++) {
                        let line = lines[i];
                        let [prop, vals] = line.split(":");

                        if (prop === "categories" || prop === "category") {
                            categoriesFound = true;
                            categories = vals.trim().split(" ");
                            categories.forEach((cat) => {
                                if (!categoryContainer.includes(cat))
                                    categoryContainer.push(cat);
                            });
                        }
                    }

                    // throw warning
                    if (!categoriesFound) {
                        console.log("No categories in file: " + file);
                        return {};
                    }

                    return { file, categoryContainer };
                })
            );
        });

        return Promise.all(readPromises);
    })
    .then((categoryContainerArray) => {
        console.log("Collecting unique categories...");

        // add up categories in this obj
        let allCategories = [];
        categoryContainerArray.forEach(({ file, categoryContainer }) => {
            if (!categoryContainer) return;

            // loop through categories in container
            categoryContainer.forEach((cat) => {
                if (!allCategories.includes(cat)) allCategories.push(cat);
            });
        });

        console.log("Finding existing categories...");

        return Promise.all([readDirectory("../categories"), allCategories]);
    })
    .then(([{ dir, files: catFiles }, allCategories]) => {
        console.log("Filtering out non-.md files...");
        catFiles = catFiles.filter((file) => {
            let lastMdIndex = file.lastIndexOf(".md");
            if (lastMdIndex === -1) {
                console.log("Found non-category file:", file);
                return false;
            } else if (lastMdIndex !== file.length - 3) {
                console.log("Found .md NOT at end of file:", file);
                return false;
            }
            return true;
        });

        console.log("Removing .md from category Files...");
        catFiles = catFiles.map((file) => {
            return file.split(".md")[0];
        });

        console.log("Finding missing categories...");
        let missingFiles = allCategories.filter(
            (file) => !catFiles.includes(file)
        );

        let writePromises = [];

        missingFiles.forEach((file) => {
            let newFile = `${dir}/${file}.md`;

            // NOTE: DO NOT CHANGE SPACING IN TEMPLATE BELOW!!!
            let fileText = `---
permalink: /categories/${file}
categoryName: ${file}
---`;
            // NOTE: DO NOT CHANGE SPACING IN TEMPLATE ABOVE!!!

            writePromises.push(writeFile(newFile, fileText));
        });

        return Promise.all(writePromises);
    })
    .then((fileDirs) => {
        console.log("------------> Category update COMPLETE!! <------------");
    })
    .catch((err) => {
        console.log(err);
    });
