import {readFile} from "fs/promises"
import {resolve} from "path"
import {fileURLToPath} from "url"

const dirname = fileURLToPath(new URL(".", import.meta.url))

interface Commit {
  tag?: string;
  hash: string;
  [key: string]: any; // Additional properties
}

interface WriterOpts {
  mainTemplate: string;
  headerPartial: string;
  commitPartial: string;
  transform: (commit: Commit) => { shortHash: string } | undefined;
  groupBy: string;
  commitGroupsSort: string;
  commitsSort: string[];
}

export async function createWriterOpts(): Promise<WriterOpts> {
  const [template, header, commit] = await Promise.all([
    readFile(resolve(dirname, "./templates/template.hbs"), "utf-8"),
    readFile(resolve(dirname, "./templates/header.hbs"), "utf-8"),
    readFile(resolve(dirname, "./templates/commit.hbs"), "utf-8")
  ])
  const writerOpts = getWriterOpts()

  writerOpts.mainTemplate = template
  writerOpts.headerPartial = header
  writerOpts.commitPartial = commit

  return writerOpts
}

function getWriterOpts(): WriterOpts {
  return {
    mainTemplate: "", // Placeholder
    headerPartial: "", // Placeholder
    commitPartial: "", // Placeholder
    transform: (commit: Commit) => {
      if (!commit.tag || typeof commit.tag !== "string") {
        return undefined
      }

      const shortHash = commit.hash.substring(0, 7)

      return {
        shortHash
      }
    },
    groupBy: "tag",
    commitGroupsSort: "title",
    commitsSort: ["tag", "message"]
  }
}
