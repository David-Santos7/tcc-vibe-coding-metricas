"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const sourceRoot = path.resolve(__dirname, "../../src");

function listJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listJavaScriptFiles(entryPath)
      : entry.name.endsWith(".js")
        ? [entryPath]
        : [];
  });
}

function importedSourceLayer(filePath, specifier) {
  if (!specifier.startsWith(".")) {
    return null;
  }

  const importedPath = path.resolve(path.dirname(filePath), specifier);
  if (!importedPath.startsWith(`${sourceRoot}${path.sep}`)) {
    return null;
  }

  return path.relative(sourceRoot, importedPath).split(path.sep)[0];
}

test("source dependencies point inward across Clean Architecture layers", () => {
  const forbiddenLayers = {
    domain: new Set(["application", "infrastructure", "presentation", "main"]),
    application: new Set(["infrastructure", "presentation", "main"]),
    infrastructure: new Set(["presentation", "main"]),
    presentation: new Set(["infrastructure", "main"]),
  };
  const violations = [];

  for (const filePath of listJavaScriptFiles(sourceRoot)) {
    const source = fs.readFileSync(filePath, "utf8");
    const currentLayer = path.relative(sourceRoot, filePath).split(path.sep)[0];
    const imports = source.matchAll(/\brequire\(['"]([^'"]+)['"]\)/g);

    for (const [, specifier] of imports) {
      const importedLayer = importedSourceLayer(filePath, specifier);
      if (forbiddenLayers[currentLayer]?.has(importedLayer)) {
        violations.push(
          `${path.relative(sourceRoot, filePath)} -> ${specifier}`,
        );
      }
    }
  }

  assert.deepEqual(violations, []);
});
