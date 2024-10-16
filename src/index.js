const fs = require('fs');
const inquirer = require('inquirer');


const UpdateColor = (color) => {
    const updateFile = './tailwind.config.js'

    let tailwindConfig = require(configPath);

    tailwindConfig.theme.extend = tailwindConfig.theme.extend || {};
    tailwindConfig.theme.extend.colors = tailwindConfig.theme.extend.colors || {};
    tailwindConfig.theme.extend.colors.defaultColor = color;

    const updatedConfigContent = `module.exports = ${JSON.stringify(tailwindConfig, null, 2)};`;
    fs.writeFileSync(configPath, updatedConfigContent, 'utf-8');
    console.log(`Tailwind config updated with color: ${color}`);
}


const changeTextColor = async () => {
    const { color } = await inquirer.prompt([
      {
        type: 'input',
        name: 'color',
        message: 'Enter a color (e.g., blue, red):',
      },
    ]);
  
    updateTailwindConfig(color);
    console.log(`Text color updated to ${color}`);
};
  
changeTextColor();