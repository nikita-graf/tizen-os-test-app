const { execSync } = require('child_process');

function runSdbCommand (command) {
    return execSync(`sdb ${command}`).toString();
}

function getApplications () {
    const appListResponse = runSdbCommand(`shell "app_launcher -l"`);
    const nameRegex = /'(.*?)'\t '(.*?)'/gm;
    const apps = [];
    let matches;

    while (matches = nameRegex.exec(appListResponse)) {
        const [, name, id] = matches;
        apps.push({ name, id });
    }

    return apps;
};

function getApplicationIdByName (searchName) {
    let foundId;
    getApplications().some(({ name, id }) => {
        if (name === searchName) {
            foundId = id;
            return true;
        }
    });
    return foundId;
};

function killApp (appId) {
    runSdbCommand(`shell "app_launcher -k ${appId}"`);
}

function runApp (appId, debug) {
    const runInfo = {};
    const modeArgs = debug ? '-d -w' : '';
    killApp(appId);
    const response = runSdbCommand(`shell "app_launcher -s ${appId} ${modeArgs}"`);

    if (debug) {
        const [, port] = response.match(/port: (\d+)/) || [];
        if (!port) {
            throw new Error('Unable to find debugging port');
        }
        runInfo.port = port;
    }

    return runInfo;
}

function forwardPort (localPort, remotePort) {
    runSdbCommand(`forward tcp:${localPort} tcp:${remotePort}`);
}

module.exports = {
    getApplications,
    getApplicationIdByName,
    runApp,
    forwardPort
};