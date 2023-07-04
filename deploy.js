const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

fs.copyFileSync(path.join('src', 'index.tsx'), path.join('src', 'index.html'));

execSync('npm run build', { stdio: 'inherit' });

execSync('mv build docs', { stdio: 'inherit' });

fs.copyFileSync(path.join('src', 'index.html'), path.join('docs', '404.html'));

console.log('Deployment complete!');
