function extractSchema(statements) {
    const schema = {};
  
    statements.forEach((statement) => {
      if (statement.type === "create" && statement.keyword === "table") {
        let tableName = null;
  
        if (Array.isArray(statement.table) && statement.table.length > 0) {
          tableName = statement.table[0].name;
        } else if (statement.table && statement.table.name) {
          tableName = statement.table.name;
        }
  
        if (tableName) {
          schema[tableName] = {
            columns: [],
          };
  
          statement.create_definitions.forEach((definition) => {
            if (definition.column && definition.column.length > 0) {
              const columnName = definition.column[0].name;
              const columnType = definition.data_type.type;
              const columnSize = definition.data_type.size;
  
              schema[tableName].columns.push({
                name: columnName,
                type: columnType + (columnSize ? `(${columnSize})` : ''),
              });
            }
          });
        }
      }
    });
  
    return schema;
  }    
  
  module.exports = extractSchema;