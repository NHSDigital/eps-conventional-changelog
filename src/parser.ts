interface ParserOpts {
  headerPattern: RegExp;
  headerCorrespondence: string[];
}

export function createParserOpts(): ParserOpts {
  return {
    headerPattern: /^(\w*):\s*(.*)$/,
    headerCorrespondence: ["tag", "message"]
  }
}
