const mustache = require('mustache');
const fs = require('fs');
const parse = require('csv-parse');

async function csv2file(params, options) {
  return new Promise(async (resolve, reject) => {
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

      const uniqueMap = [];

      parser.on('readable', function () {
        while (1) {
          const data = this.read();
          if (!data) {
            break;
          }

          if (opt.unique) {
            if (uniqueMap.indexOf(data[opt.unique]) > -1) {
              continue;
            }
            uniqueMap.push(data[opt.unique]);
          }

          outputStm.write(render(template, data));
        }
        outputStm.on('finish', () => {
          resolve();
        });
        outputStm.end();
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function readFile(path) {
  return fs.readFileSync(path).toString('utf8');
}

function render(template, data) {
  return mustache.render(template, data);
}

module.exports = csv2file;
