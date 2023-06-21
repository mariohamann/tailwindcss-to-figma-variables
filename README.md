# TailwindCSS to Figma Variables – Example script

This script exports the TailwindCSS configuration and converts it to a JSON that works with Figma Variables.

## Quick Start

### Step 1: Export from TailwindCSS

```bash
npm install
npm run start
```

The JSON should have been exported.

### Step 2: Import to Figma

Now install the [Figma plugin](https://github.com/figma/plugin-samples/tree/master/variables-import-export) for variable import/export.

To install the plugin:

-   Download or clone the plugin repository to your local machine.
-   Open Figma, go to Plugins -> Manage plugins.
-   In the development section, click on the '+' button to add a new plugin.
-   Select the manifest.json file from the downloaded/cloned repository.
-   Once the plugin is installed, you can use it to import or export variables directly from/to Figma.

## Features

Exports and converts TailwindCSS configuration to a custom JSON format.

-   Converts spacing units from rem to pixels.
-   Adjusts spacing names, replacing decimal points with commas.
-   After running, the script will save the converted configuration to an export.json file in the project directory.
