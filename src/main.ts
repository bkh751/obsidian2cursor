import { Plugin, TFile, Notice, PluginSettingTab, App, Setting } from 'obsidian';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

interface Obsidian2CursorSettings {
  cursorPath: string;
}

const DEFAULT_SETTINGS: Obsidian2CursorSettings = {
  cursorPath: '/Applications/Cursor.app/Contents/MacOS/Cursor'
}

export default class Obsidian2CursorPlugin extends Plugin {
  settings: Obsidian2CursorSettings;

  async onload() {
    await this.loadSettings();

    // Alt+Shift+O: 현재 파일을 Cursor에서 열기
    this.addCommand({
      id: 'open-current-file-in-cursor',
      name: '현재 파일을 Cursor에서 열기',
      hotkeys: [{ modifiers: ['Alt', 'Shift'], key: 'o' }],
      callback: () => this.openCurrentFileInCursor()
    });

    // Alt+Shift+P: 현재 vault를 Cursor 프로젝트로 열기
    this.addCommand({
      id: 'open-vault-in-cursor',
      name: '현재 vault를 Cursor 프로젝트로 열기',
      hotkeys: [{ modifiers: ['Alt', 'Shift'], key: 'p' }],
      callback: () => this.openVaultInCursor()
    });

    // 설정 탭 추가
    this.addSettingTab(new Obsidian2CursorSettingTab(this.app, this));
  }

  onunload() {
    // 정리 작업
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async openCurrentFileInCursor() {
    const activeFile = this.app.workspace.getActiveFile();
    
    if (!activeFile) {
      new Notice('열린 파일이 없습니다.');
      return;
    }

    if (!(activeFile instanceof TFile)) {
      new Notice('현재 파일을 Cursor에서 열 수 없습니다.');
      return;
    }

    try {
      // @ts-ignore - Obsidian API의 내부 메서드 사용
      const vaultPath = this.app.vault.adapter.basePath || this.app.vault.adapter.getBasePath?.() || '';
      const filePath = path.join(vaultPath, activeFile.path);
      const cursorPosition = this.getCurrentCursorPosition();
      
      // Cursor에서 파일 열기 (특정 라인으로 이동)
      const command = `"${this.settings.cursorPath}" --goto "${filePath}${cursorPosition}"`;
      console.log('실행 명령어:', command);
      await execAsync(command);
      
      new Notice(`Cursor에서 파일을 열었습니다: ${activeFile.name}`);
    } catch (error) {
      console.error('Cursor에서 파일을 여는 중 오류 발생:', error);
      new Notice(`오류: ${error.message}`);
    }
  }

  async openVaultInCursor() {
    try {
      // @ts-ignore - Obsidian API의 내부 메서드 사용
      const vaultPath = this.app.vault.adapter.basePath || this.app.vault.adapter.getBasePath?.() || '';
      const activeFile = this.app.workspace.getActiveFile();
      
      let command;
      if (activeFile && activeFile instanceof TFile) {
        // 현재 파일이 있으면 프로젝트와 함께 파일도 열기
        const filePath = path.join(vaultPath, activeFile.path);
        const cursorPosition = this.getCurrentCursorPosition();
        command = `"${this.settings.cursorPath}" "${vaultPath}" --goto "${filePath}${cursorPosition}"`;
      } else {
        // 현재 파일이 없으면 프로젝트만 열기
        command = `"${this.settings.cursorPath}" "${vaultPath}"`;
      }
      
      console.log('실행 명령어:', command);
      await execAsync(command);
      
      if (activeFile && activeFile instanceof TFile) {
        new Notice(`Cursor에서 프로젝트와 파일을 열었습니다: ${activeFile.name}`);
      } else {
        new Notice('Cursor에서 vault를 프로젝트로 열었습니다.');
      }
    } catch (error) {
      console.error('Cursor에서 프로젝트를 여는 중 오류 발생:', error);
      new Notice(`오류: ${error.message}`);
    }
  }

  private getCurrentCursorPosition(): string {
    const editor = this.app.workspace.activeEditor?.editor;
    if (!editor) {
      return '';
    }

    const cursor = editor.getCursor();
    const line = cursor.line + 1; // Obsidian은 0-based, Cursor는 1-based
    const ch = cursor.ch + 1;
    
    return `:${line}:${ch}`;
  }
}

class Obsidian2CursorSettingTab extends PluginSettingTab {
  plugin: Obsidian2CursorPlugin;

  constructor(app: App, plugin: Obsidian2CursorPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Obsidian2Cursor 설정' });

    new Setting(containerEl)
      .setName('Cursor 실행 파일 경로')
      .setDesc('Cursor 앱의 실행 파일 경로를 입력하세요.')
      .addText((text) => text
        .setPlaceholder('/Applications/Cursor.app/Contents/MacOS/Cursor')
        .setValue(this.plugin.settings.cursorPath)
        .onChange(async (value: string) => {
          this.plugin.settings.cursorPath = value;
          await this.plugin.saveSettings();
        }));
  }
}