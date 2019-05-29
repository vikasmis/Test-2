// const child_process = require('child_process');
const shell = require('shelljs');
const path = require('path');
var protractorFlake = require('protractor-flake');
const env = process.argv[2];

let protractorArgs = ['protractor.conf.js'];
if (env) {
    protractorArgs.push(`--params.env=${env}`);
}
process.env.NODE_ENV = 'test';
process.env.PATH += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));

protractorFlake({
    maxAttempts: 1,
    parser: 'logparser.js',
    protractorArgs: protractorArgs
}, function(flakeStatus, output) {
    // createOverallReport();
    console.log('Protractor Flake status: ', flakeStatus);
});


