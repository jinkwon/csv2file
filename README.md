# csv2file
CSV convert to file with mustache.js template engine

## example
### Input
```
name,lon,lat
site1,37.35283315785131,127.10973623874524
site2,37.54505211168097,126.96725290258685
site3,37.65628827419806, 127.25682722308225
```
### template
```sql
insert into map_source.tbl_map_source_layer_fragment
  (geometry, map_source_layer_id, id, "name")
values (ST_Transform(ST_GeomFromText('POINT({{lon}} {{lat}})', 4326), 3857), 6, '', '{{name}}');
```

### Output
```sql
insert into map_source.tbl_map_source_layer_fragment
  (geometry, map_source_layer_id, id, "name")
values (ST_Transform(ST_GeomFromText('POINT(127.10973623874524 37.35283315785131)', 4326), 3857), 6, '', 'site1');
```

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
csv2file -i ./sample/sample.csv -t ./sample/sample.tmpl.sql
```

### nodejs
```javascript
const csv2file = require('csv2file');

// return Promise
csv2file({
  input: './example.csv',
  template: './template.sql',
  output: './example.sql',
});
```

## License

MIT [LICENSE.md](LICENSE.md)
