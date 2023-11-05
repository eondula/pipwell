const crypto = require('crypto');

class Block {
    constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = new Date();
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256').update(`${this.index}${this.timestamp}${this.data}${this.prevHash}`).digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const block = new Block(this.chain.length, data, this.getLatestBlock().hash);
        this.chain.push(block);
    }
}

module.exports = Blockchain;
