const fs = require('fs');

const buildInfoPath = './build-info.json';

const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, 'utf8'));
buildInfo.buildNumber++;
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));

console.log(`Build number updated to: ${buildInfo.buildNumber}`);
