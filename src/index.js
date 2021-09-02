const mustache = require('mustache');
const fs = require('fs');
const parse = require('csv-parse');

async function csv2file(params, options) {
  const opt = {
    columns: true,
    ...options,
  };

  try {
    const input = await readFile(params.input);
    const template = await readFile(params.template);
    const outputStm = fs.createWriteStream(params.output);

    const parser = parse(input, {
      columns: opt.columns,
    });

    parser.on('readable', function () {
      while (1) {
        const data = this.read();
        if (!data) {
          break;
        }
        outputStm.write(render(template, data) + '\n');
      }
    });
  } catch (err) {
    throw err;
  }
}

async function readFile(path) {
  return fs.readFileSync(path).toString('utf8');
}

function render(template, data) {
  return mustache.render(template, data);
}

module.exports = csv2file;
