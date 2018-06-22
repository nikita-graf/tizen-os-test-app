const { appName, mode, localPort } = require('yargs').argv;
const { getApplicationIdByName, runApp, forwardPort } = require('./sdb');
const { runDebugger } = require('./debugger');
const appId = getApplicationIdByName(appName);
const debugMode = mode === 'debug';
const runInfo = runApp(appId, debugMode);

if (debugMode) {
    forwardPort(localPort, runInfo.port);
    runDebugger(localPort);
}