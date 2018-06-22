const { execSync } = require('child_process');
const got = require('got');

function getDebuggerUrl (localPort) {
    return got(`http://localhost:${localPort}/json`, { json: true }).then((response) => {
        return `http://localhost:${localPort}${response.body[0].devtoolsFrontendUrl}`;
    });
}

function runDebugger (localPort) {
    return getDebuggerUrl(localPort)
        .then((url) => {
            execSync(`open -a "Google Chrome" ${url} --args --auto-open-devtools-for-tabs`);
        });
}

module.exports = {
    runDebugger
};