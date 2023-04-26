function parseSqlFile(fileContent, ddlKeywords) {
  // Escape special characters in ddlKeywords
  const escapedKeywords = ddlKeywords.map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  // Construct regex pattern
  const pattern = new RegExp(`(${escapedKeywords.join('|')})[\\s\\S]*?;`, 'gi');

  // Remove comments that start with '--' and end with a newline character
  const contentWithoutLineComments = fileContent.replace(/--.*\n/g, '\n');

  // Remove comments that start with '/*' and end with '*/'
  const contentWithoutBlockComments = contentWithoutLineComments.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove extra spaces and newlines
  const contentWithoutExtraSpaces = contentWithoutBlockComments.replace(/\s+/g, ' ');

  // Keep only DDL statements
  const ddlStatements = contentWithoutExtraSpaces.match(pattern);

  if (ddlStatements) {
    return ddlStatements;
  } else {
    throw new Error('No DDL statements found in file');
  }
}

module.exports = parseSqlFile;
