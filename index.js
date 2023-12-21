import {createReport} from 'docx-templates';
import * as path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {convertWordFiles} from "convert-multiple-files-ul";

//// Some mocked data
const fileName = 'INStype.dotx';
const fileType = 'pdf'
// const data = {
//     type: 'Tech Write',
//     pages: '11',
//     classification: 'Private',
//     title: 'This is test doc title',
//     code: '213XA-3S:EW12:WEDR/2'
// }
const data = JSON.parse(fs.readFileSync('./shared/mocked-data.json', 'utf8'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPath = path.join(__dirname, '/test-files/temp.dotx')

async function passData(data) {
    const template = fs.readFileSync(`./test-files/${fileName}`)

    const uint8arr = await createReport({
        template,
        data
    })

    const buffer = new Buffer.from(uint8arr)

    fs.writeFileSync('./test-files/temp.dotx', buffer)
}

async function convertToPDF(inputPath) {
    const outputPath = path.join(__dirname, `/test-files/`)

    await convertWordFiles(inputPath, fileType, outputPath)

    fs.unlinkSync(inputPath)
}

passData(data)
    .then(() => {
        console.log('dataPassed')

        convertToPDF(inputPath)
            .then(
                () => console.log('Converted')
            )
    })
    .catch(
        (err) => console.log(`Next error occurred during runtime: ${err}`)
    )



