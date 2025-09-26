var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => Obsidian2CursorPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_child_process = require("child_process");
var import_util = require("util");
var path = __toESM(require("path"));
var execAsync = (0, import_util.promisify)(import_child_process.exec);
var DEFAULT_SETTINGS = {
  cursorPath: "/Applications/Cursor.app/Contents/MacOS/Cursor"
};
var Obsidian2CursorPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "open-current-file-in-cursor",
      name: "\uD604\uC7AC \uD30C\uC77C\uC744 Cursor\uC5D0\uC11C \uC5F4\uAE30",
      callback: () => this.openCurrentFileInCursor()
    });
    this.addCommand({
      id: "open-vault-in-cursor",
      name: "\uD604\uC7AC vault\uB97C Cursor \uD504\uB85C\uC81D\uD2B8\uB85C \uC5F4\uAE30",
      callback: () => this.openVaultInCursor()
    });
    this.addSettingTab(new Obsidian2CursorSettingTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async openCurrentFileInCursor() {
    var _a, _b;
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) {
      new import_obsidian.Notice("\uC5F4\uB9B0 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!(activeFile instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice("\uD604\uC7AC \uD30C\uC77C\uC744 Cursor\uC5D0\uC11C \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    try {
      const vaultPath = this.app.vault.adapter.basePath || ((_b = (_a = this.app.vault.adapter).getBasePath) == null ? void 0 : _b.call(_a)) || "";
      const filePath = path.join(vaultPath, activeFile.path);
      const cursorPosition = this.getCurrentCursorPosition();
      const command = `"${this.settings.cursorPath}" --goto "${filePath}${cursorPosition}"`;
      await execAsync(command);
      new import_obsidian.Notice(`Cursor\uC5D0\uC11C \uD30C\uC77C\uC744 \uC5F4\uC5C8\uC2B5\uB2C8\uB2E4: ${activeFile.name}`);
    } catch (error) {
      new import_obsidian.Notice(`\uC624\uB958: ${error.message}`);
    }
  }
  async openVaultInCursor() {
    var _a, _b;
    try {
      const vaultPath = this.app.vault.adapter.basePath || ((_b = (_a = this.app.vault.adapter).getBasePath) == null ? void 0 : _b.call(_a)) || "";
      const activeFile = this.app.workspace.getActiveFile();
      let command;
      if (activeFile && activeFile instanceof import_obsidian.TFile) {
        const filePath = path.join(vaultPath, activeFile.path);
        const cursorPosition = this.getCurrentCursorPosition();
        command = `"${this.settings.cursorPath}" "${vaultPath}" --goto "${filePath}${cursorPosition}"`;
      } else {
        command = `"${this.settings.cursorPath}" "${vaultPath}"`;
      }
      await execAsync(command);
      if (activeFile && activeFile instanceof import_obsidian.TFile) {
        new import_obsidian.Notice(`Cursor\uC5D0\uC11C \uD504\uB85C\uC81D\uD2B8\uC640 \uD30C\uC77C\uC744 \uC5F4\uC5C8\uC2B5\uB2C8\uB2E4: ${activeFile.name}`);
      } else {
        new import_obsidian.Notice("Cursor\uC5D0\uC11C vault\uB97C \uD504\uB85C\uC81D\uD2B8\uB85C \uC5F4\uC5C8\uC2B5\uB2C8\uB2E4.");
      }
    } catch (error) {
      new import_obsidian.Notice(`\uC624\uB958: ${error.message}`);
    }
  }
  getCurrentCursorPosition() {
    var _a;
    const editor = (_a = this.app.workspace.activeEditor) == null ? void 0 : _a.editor;
    if (!editor) {
      return "";
    }
    const cursor = editor.getCursor();
    const line = cursor.line + 1;
    const ch = cursor.ch + 1;
    return `:${line}:${ch}`;
  }
};
var Obsidian2CursorSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Obsidian2Cursor \uC124\uC815" });
    new import_obsidian.Setting(containerEl).setName("Cursor \uC2E4\uD589 \uD30C\uC77C \uACBD\uB85C").setDesc("Cursor \uC571\uC758 \uC2E4\uD589 \uD30C\uC77C \uACBD\uB85C\uB97C \uC785\uB825\uD558\uC138\uC694.").addText((text) => text.setPlaceholder("/Applications/Cursor.app/Contents/MacOS/Cursor").setValue(this.plugin.settings.cursorPath).onChange(async (value) => {
      this.plugin.settings.cursorPath = value;
      await this.plugin.saveSettings();
    }));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
