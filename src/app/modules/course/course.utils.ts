export const calculateDurationInWeeks = (startDate: string, endDate: string): number => {
    // Parse the start and end dates
    const startDateObj: Date = new Date(startDate);
    const endDateObj: Date = new Date(endDate);
  
    // Calculate the difference in milliseconds between the two dates
    const timeDifference: number = endDateObj.getTime() - startDateObj.getTime();
  
    // Convert milliseconds to weeks and round up to the nearest integer
    const durationInWeeks: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));
  
    return durationInWeeks;
  };