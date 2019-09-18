const regression = require('regression');
const result = regression.linear([[4, 4], [3, 3], [2, 2]]);
const g = result.equation[0];
const y = result.equation[1];

console.log(g, y)

console.log(result.predict(1));