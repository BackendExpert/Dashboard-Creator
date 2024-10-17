#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Function to create/update the dashboard CSS file
const updateDashboardColor = async (color) => {
    const projectStyleFile = path.join(process.cwd(), 'src', 'components', 'dashboard', 'dashboard.css'); // Target path in the user's project

    // Define default CSS content with the new color
    const newContent = `:root {\n    --defaultColor: ${color};\n}\n`;

    // Check if the style file exists in the user's project
    if (fs.existsSync(projectStyleFile)) {
        // If it exists, read the current content
        let currentContent = fs.readFileSync(projectStyleFile, 'utf-8');

        // Replace the existing --defaultColor value with the new color
        const updatedContent = currentContent.replace(/(--defaultColor:\s*[^;]+;)/g, `--defaultColor: ${color};`);

        // Write the updated content back to the file
        fs.writeFileSync(projectStyleFile, updatedContent, 'utf-8');
        console.log(`Dashboard CSS file updated with --defaultColor: ${color}`);
    } else {
        // If it doesn't exist, create a new file with the default content
        fs.writeFileSync(projectStyleFile, newContent, 'utf-8');
        console.log(`Dashboard CSS file created with --defaultColor: ${color}`);
    }
};

// Function to prompt the user for color input
const changeTextColor = async () => {
    const { color } = await inquirer.prompt([
        {
            type: 'input',
            name: 'color',
            message: 'Enter a color (e.g., blue, red):',
        },
    ]);

    // Call the update function with the user-provided color
    await updateDashboardColor(color);
};

// Start the color change process
changeTextColor();
