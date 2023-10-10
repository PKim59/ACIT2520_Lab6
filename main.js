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
const unzipper = require('unzipper');

fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: "./unzipped" }))


    