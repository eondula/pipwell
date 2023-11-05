const EventEmitter = require('events');

class HeartRateSimulator extends EventEmitter {
    constructor() {
        super();
        this.heartRate = this.getRandomHeartRate();
    }

    getRandomHeartRate() {
        // Simulate a heart rate between 60 and 100 bpm
        return Math.floor(Math.random() * (100 - 60 + 1) + 60);
    }

    start() {
        setInterval(() => {
            this.heartRate = this.getRandomHeartRate();
            this.emit('heartRateData', this.heartRate);
        }, 1000); // Emit new heart rate value every second
    }
}

module.exports = HeartRateSimulator;
