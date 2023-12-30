"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDurationInWeeks = void 0;
const calculateDurationInWeeks = (startDate, endDate) => {
    // Parse the start and end dates
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    // Calculate the difference in milliseconds between the two dates
    const timeDifference = endDateObj.getTime() - startDateObj.getTime();
    // Convert milliseconds to weeks and round up to the nearest integer
    const durationInWeeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));
    return durationInWeeks;
};
exports.calculateDurationInWeeks = calculateDurationInWeeks;
