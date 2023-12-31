const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const zlib = require('zlib');
const IOhandler = require("./IOhandler.js");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "processed");
const fs = require('fs');
const PNG = require("pngjs").PNG

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(() => {
    return IOhandler.readDir(pathUnzipped);
  })
  .then((imgs) => {
    Promise.all(imgs.map((img) => IOhandler.grayScale(pathUnzipped + "/" + img,pathProcessed + "/" + img)));
  })
  .then(() => {
    console.log("All files have been processed. Enjoy the grayscale images!");
  })
  .catch((err) => {
    console.log(err);
  });

    // Do I have to have error handling after each .then? Doesn't it work like pipeline where you only need 1?