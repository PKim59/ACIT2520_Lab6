/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const { pipeline } = require("stream");

const AdmZip = require("adm-zip"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */


const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const zip = new AdmZip(pathIn);
      zip.extractAllTo(pathOut, true)
      console.log("Extraction Operation Complete!");
        resolve();
      });
  };

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) { reject(err) };
      const pngFiles = files.filter((file) => path.extname(file) === ".png");
      resolve(pngFiles);
    });
;
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

const handleGrayscale = (image) => {
  return new Promise((resolve, reject) => {
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const idx = (image.width * y + x) << 2;

        const red = image.data[idx];
        const green = image.data[idx + 1];
        const blue = image.data[idx + 2];

        const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

        image.data[idx] = gray;
        image.data[idx + 1] = gray;
        image.data[idx + 2] = gray;
      }
  }
    resolve(image);
  }
  )};

// NEED to replace this with the passed parameter. This wouldn't work for our purposes as we're passing it multiple times and it doesn't save?

const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathIn);
    const writeStream = fs.createWriteStream(pathOut);
    const pngStream = new PNG().on("parsed", function () {
      handleGrayscale(this);
      this.pack().pipe(writeStream)
      .on("error", (err) => {
          reject(err);
      });
      });
    
    pipeline(
      readStream,
      pngStream,
      function onEnd (err) {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }}
      );
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};