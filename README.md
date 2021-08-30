# csv2file

CSV to file with mustache.js
## example
### Input
```
// sample.csv
name,lon,lat

```

### Output


## Installation

```bash
# global use
npm install -g csv2file

# module import
npm install csv2file
```

## Usage

### shell script
```bash
csv2file -i ./example/example.csv -t ./example/template.sql
```

### nodejs
```javascript
const csv2file = require('csv2file');

csv2file({
  input: './example.csv',
  template: './template.sql',
  output: './example.sql',
}).then(r => {
  console.log(r);
});
```

## License

MIT [LICENSE.md](LICENSE.md)
