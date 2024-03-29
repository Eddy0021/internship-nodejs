const EventEmitter = require('events');
const axios = require('axios');

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        try {
            this.emit('begin');
            const startTime = Date.now();
            const result = await asyncFunc(...args);
            const endTime = Date.now();
            this.emit('data', result);
            this.emit('end');

            console.log(`Execution time: ${endTime - startTime}ms`);
        } catch (error) {
            this.emit('error', error);
        }
    }
}

const fetchFromUrl = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log('Data received:', data));
withTime.on('error', (error) => console.error('Error:', error));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');
