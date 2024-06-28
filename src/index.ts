import {createParserOpts} from "./parser.js"
import {createWriterOpts} from "./writer.js"
import {whatBump} from "./whatBump.js"

interface Preset {
  parser: ReturnType<typeof createParserOpts>;
  writer: Awaited<ReturnType<typeof createWriterOpts>>;
  whatBump: typeof whatBump;
}

export default async function createPreset(): Promise<Preset> {
  return {
    parser: createParserOpts(),
    writer: await createWriterOpts(),
    whatBump
  }
}
