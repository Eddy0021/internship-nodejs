const fs = require('fs');
const csvtojson = require('csvtojson');

// Define file paths
const csvFilePath = 'Task3/task3/csv/data.csv';
const txtFilePath = 'Task3/task3/csv/output.txt';

// Create a writable stream for the output file
const writeStream = fs.createWriteStream(txtFilePath);

// Convert CSV to JSON line by line and write to TXT file
csvtojson()
  .fromFile(csvFilePath)
  .subscribe((jsonObj) => {
    writeStream.write(JSON.stringify(jsonObj) + '\n');
  }, (error) => {
    console.error('Error converting CSV to JSON:', error);
  }, () => {
    writeStream.end();
    console.log('Conversion completed successfully.');
  });

// Log errors when writing to the file
writeStream.on('error', (error) => {
  console.error('Error writing to file:', error);
});
