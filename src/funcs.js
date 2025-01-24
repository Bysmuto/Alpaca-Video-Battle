let playlist = [];
let timeLimit = 0;
let numberOfVideosDisplayed = 0;


function probability(...weightedValues) {
    // Calculate the total weight
    const totalWeight = weightedValues.reduce(
      (sum, [_, weight]) => sum + weight,
      0
    );

    // Normalize weights to make the total sum equal to 1
    weightedValues = weightedValues.map(([value, weight]) => [
      value,
      weight / totalWeight,
    ]);

    // Generate a random number between 0 and 1
    const random = Math.random();

    // Find the value corresponding to the random number
    let cumulativeWeight = 0;
    for (const [value, weight] of weightedValues) {
      cumulativeWeight += weight;
      if (random < cumulativeWeight) {
        return Array.isArray(value)
          ? value[Math.floor(Math.random() * value.length)]
          : value;
      }
    }
  }

function shuffleArray(array) {
  // Create a copy to avoid modifying original array
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}










function count(array) {
    return array.reduce((total, value) => {
        total[value] = (total[value] || 0) + 1;
        return total;
      }, {});
    
}

function loopFor(code,times) {
    for (let i = 0; i < times; i++) {
        code()
      }
}

     


