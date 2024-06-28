import {
  describe,
  beforeAll,
  afterAll,
  it,
  expect
} from "vitest"
import conventionalChangelogCore from "conventional-changelog-core"
import {TestTools} from "./tools/index.ts"
import preset from "../src/index.ts"

let testTools

describe("eps-conventional-changelog", () => {
  beforeAll(() => {
    testTools = new TestTools()

    testTools.gitInit()
    testTools.gitCommit(["Fix: [AEA-0000] - commit 0"])
    testTools.gitCommit(["Update: [AEA-0001] - commit 1"])
    testTools.gitCommit(["New: [AEA-0002] - commit 2"])
    testTools.gitCommit(["Breaking: [AEA-0003] - commit 3"])
    testTools.gitCommit(["Docs: [AEA-0004] - commit 4"])
    testTools.gitCommit(["Build: [AEA-0005] - commit 5"])
    testTools.gitCommit(["Upgrade: [AEA-0006] - commit 6"])
    testTools.gitCommit(["Upgrade: [dependabot] - bump dependency from 2.2.0 to 2.3.0 (#123)"])
  })

  afterAll(() => {
    testTools?.cleanup()
  })

  it("should work if there is no semver tag", async () => {
    for await (let chunk of conventionalChangelogCore(
      {
        cwd: testTools.cwd,
        config: preset
      }
    )) {
      chunk = chunk.toString()

      expect(chunk).toContain("### Breaking")
      expect(chunk).toContain("### Build")
      expect(chunk).toContain("### Docs")
      expect(chunk).toContain("### Fix")
      expect(chunk).toContain("### New")
      expect(chunk).toContain("### Update")
      expect(chunk).toContain("### Upgrade")
      expect(chunk).toContain("* [AEA-0001] - commit 1")
      expect(chunk).toContain("* [AEA-0002] - commit 2")
      expect(chunk).toContain("* [AEA-0003] - commit 3")
      expect(chunk).toContain("* [AEA-0004] - commit 4")
      expect(chunk).toContain("* [AEA-0005] - commit 5")
      expect(chunk).toContain("* [AEA-0006] - commit 6")
      expect(chunk).toContain("* [dependabot] - bump dependency from 2.2.0 to 2.3.0 (#123)")
      expect(chunk).not.toContain("closes")

    }
  })
})
