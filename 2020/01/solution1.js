const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const sumTarget = 2020;

const main = async () => {
  try {
    const data = await readFile('./data.txt', { encoding: 'utf-8' });
    const expenses = data.split('\n');
    const sumMap = {};
    const matches = [];
    for (let i = 0; i < expenses.length; i++) {
      const e = parseInt(expenses[i], 10);
      if (e > sumTarget) continue;
      if (sumMap[e]) {
        const match = expenses[sumMap[e]];
        console.log('Matches found: ', match, ' at index ', sumMap[e], ' and ', e, ' at index ', i);
        return e * match;
      }
      sumMap[sumTarget - e] = i;
    }
    throw new Error('no matches found');
  } catch (err) {
    return err
  }
}

main()
  .then(res => console.log('Solution: ', res))
  .catch(err => console.error(err));