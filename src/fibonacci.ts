export const computeFibonacciNumber = (position: number | null, recursion: boolean = false): number => {
    let notNullPosition = position;
  
    if (notNullPosition === null) {
        notNullPosition = 1;   
    }
  
    if (notNullPosition === 0) {
        return 0;
    }
  
    if (!recursion && notNullPosition < 0) {
        return computeNegativeFibonacci(position);
    }
    
    if (recursion && notNullPosition > 0) {
        return recursiveFibonacci(1, 1, position - 2);
    }
  
    if (recursion && notNullPosition < 0) {
      return negativeRecursiveFibonacci(position);
    }

    if (notNullPosition <= 2) {
        return 1;
    }

    let i = 1;
    let j = 1;

    let currentPosition = 2;
    while (currentPosition < notNullPosition) {
        const temp = i;
        i = j;
        j += temp;
        currentPosition++;
    }
    return j;
};

const negativeRecursiveFibonacci = (initialPosition: number, left: number = 0, right: number = 1, position?: number): number => {
    const currentPosition = position ?? initialPosition;
    if (initialPosition === 0) return 0;
    if (currentPosition === 0) return left;
    if (initialPosition > 0) {
        return negativeRecursiveFibonacci(initialPosition, right, left + right, currentPosition - 1);
    } else {
        return negativeRecursiveFibonacci(initialPosition, right - left, left, currentPosition + 1);
    }
}

const recursiveFibonacci = (previous: number, current: number, stepsLeft: number): number => {
    if (stepsLeft < 0) {
        return 1;
    }
    switch (stepsLeft) {
        case 0:
            return current;
        default:
            return recursiveFibonacci(current, previous + current, stepsLeft - 1);
    }
}

export const computeFibonacciArray = (start: number, endInclusive: number): number[] => {
    const inputArray = [...Array(endInclusive - start + 1).keys()].map(i => i + start);
    return inputArray.map(x => computeFibonacciNumber(x));
}

const computeNegativeFibonacci = (position: number): number => {
    if (position >= 0) {
        throw new Error(`Position must be less than zero! Received: ${position}.`);
    }
    const resultIsNegative = position % 2 === 0;
    const absoluteResult = computeFibonacciNumber(-position);
    return resultIsNegative ? absoluteResult * -1 : absoluteResult;
}
