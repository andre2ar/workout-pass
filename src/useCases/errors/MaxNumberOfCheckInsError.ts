export class MaxNumberOfCheckInsError extends Error {
    constructor() {
        super('You already checked in today')
    }
}