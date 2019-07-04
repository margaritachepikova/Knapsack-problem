const maxWeight = 4;
const objects = {
  laptop: {
    weight: 3,
    value: 2000
  },
  guitar: {
    weight: 1,
    value: 1500
  },
  recordPlayer: {
    weight: 4,
    value: 3000
  }
};

const objectNames = Object.keys(objects);
const objectsValues = Object.values(objects);
const table = new Array(objectNames.length);
for (let i = 0; i < objectsValues.length; i += 1) {
  const tableRow = [];
  const name = objectNames[i];
  const { value, weight } = objectsValues[i];
  for (let j = 0; j < maxWeight; j += 1) {
    const isSubjectFit = weight <= j + 1;
    if (i === 0) {
      tableRow[j] = isSubjectFit ? { value, objects: [ name ] } : { value: 0, objects: [] };
    } else {
      const prevMax = table[i - 1][j].value;
      const additionalWeight = j - weight >= 0 && table[i - 1][j - weight];
      const nextValue = isSubjectFit ? value + (additionalWeight ? additionalWeight.value : 0) : 0;
      const isNextValueMax = nextValue > prevMax;
      tableRow[j] = {
        value: isNextValueMax ? nextValue : prevMax,
        objects: isNextValueMax ? [name, ...(additionalWeight ? additionalWeight.objects : [])] : table[i - 1][j].objects
      };
    }
  }
  table[i] = tableRow;
}

console.log(table[objectNames.length - 1][maxWeight - 1]);
