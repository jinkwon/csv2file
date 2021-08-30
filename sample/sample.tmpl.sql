insert into map_source.tbl_map_source_layer_fragment
  (geometry, map_source_layer_id, id, "name")
values (ST_Transform(ST_GeomFromText('POINT({{lon}} {{lat}})', 4326), 3857), 6, '', '{{name}}');
