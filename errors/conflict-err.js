class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.stausCode = 409;
    }
}

module.exports = ConflictError;