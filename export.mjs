import fs from 'fs';
import path from 'path';
import TailwindExportConfig from 'tailwindcss-export-config';

// get current path of this file
const __dirname = new URL('.', import.meta.url).pathname;

const converter = new TailwindExportConfig({
  config: path.join(__dirname, 'tailwind.config.js'),
  destination: 'temp',
  format: 'json',
  preserveKeys: ['colors', 'space'],
});

// writeToFile returns a promise so we can chain off it
converter.writeToFile()
  .then(() => {
    console.log('File written successfully, starting conversion...');

    // Read and parse the temp file
    const data = fs.readFileSync(path.join(__dirname, 'temp.json'), 'utf-8');
    const originalJson = JSON.parse(data);

    // Convert and save to a new file
    const newJson = convertJson(originalJson);
    const outputPath = path.join(__dirname, 'export.json');
    fs.writeFileSync(outputPath, JSON.stringify(newJson, null, 2));

    console.log('Conversion successful, cleaning up...');

    // Delete the temp file
    fs.unlinkSync(path.join(__dirname, 'temp.json'));

    console.log('All done!');
  })
  .catch((error) => {
    console.log('Oops', error.message);
  });

// Converter function
function convertJson(json) {
  const newJson = {
    color: {},
    spacing: {
      "$type": "number"
    }
  };

  for (let color in json.colors) {
    if (typeof json.colors[color] === 'object') {
      newJson.color[color] = { "$type": "color" };
      for (let shade in json.colors[color]) {
        newJson.color[color][shade] = { "$value": json.colors[color][shade] };
      }
    }
  }

  for (let space in json.space) {
    let key = space.replace('.', ','); // Replace dot with comma
    const value = json.space[space];
    if (value.endsWith("rem")) {
      const remValue = parseFloat(value);
      // convert rem to px (assuming 1 rem is 16px)
      newJson.spacing[key] = { "$value": remValue * 16 };
    } else if (value.endsWith("px")) {
      newJson.spacing[key] = { "$value": parseInt(value) };
    } else if (value === "0px") {
      newJson.spacing[key] = { "$value": 0 };
    }
  }

  return newJson;
}
