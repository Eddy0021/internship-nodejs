const { exec } = require('child_process');
const fs = require('fs');

//TEST
//console.log("Start at " + new Date().toLocaleTimeString());

function getMostCPUIntensiveProcess() {
    return new Promise((resolve, reject) => {
        if (process.platform === 'win32') {
            exec('powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"', (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout.trim());
                }
            });
        } else {
            exec('ps -A -o %cpu,%mem,comm | sort -nr | head -n 1', (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout.trim());
                }
            });
        }
    });
}

function writeToLog(logFile, processInfo) {
    //TEST
    //console.log("Writing at " + new Date().toLocaleTimeString() + ", process info: ");
    const logData = `${new Date().toLocaleTimeString()} : ${processInfo}\n`;
    fs.appendFileSync(logFile, logData);
}

async function main() {
    const logFile = 'activityMonitor.log';
    let lastWriteTime = Math.floor(Date.now() / 1000);

    while (true) {
        try {
            const processInfo = await getMostCPUIntensiveProcess();
            process.stdout.write(new Date().toLocaleTimeString() + " - " + processInfo + '\r');

            const currentTime = Math.floor(Date.now() / 1000);

            // Write to log file if one minute has passed since the last write
            if (currentTime - lastWriteTime >= 60) {
                writeToLog(logFile, processInfo);
                lastWriteTime = currentTime;
            }
        } catch (error) {
            console.error('Error:', error);
        }

        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

main().catch(error => console.error('Unexpected error:', error));
