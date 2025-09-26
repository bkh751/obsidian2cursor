# switch2Cursor Plugin

A plugin that opens files and projects from Obsidian to Cursor.

> **⚠️ macOS Only**: This plugin is currently only supported on macOS. Windows and Linux support may be added in future versions.

## ✨ Features

- **Open current file in Cursor**: Opens the currently viewed Obsidian document in Cursor (preserves cursor position)
- **Open current vault as Cursor project**: Opens the current Obsidian vault as a Cursor project (preserves cursor position)
- Automatic cursor position detection and transfer
- Configurable Cursor executable file path
- Customizable hotkey settings

## 📋 Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Build and Deployment](#build-and-deployment)
- [Contributing](#contributing)

## 🚀 Installation and Usage

### Installation

1. Download or clone this repository
2. Install dependencies with `npm install`
3. Build the plugin with `npm run build`
4. Enable developer mode in Obsidian and add as a local plugin

### Usage

1. **Command Palette**: Press `Ctrl/Cmd + P` to open the command palette and search for:
   - "Open current file in Cursor"
   - "Open current vault as Cursor project"
2. **Hotkey Setup**: Set your preferred hotkeys in Obsidian Settings → Hotkeys
3. **Settings**: Adjust the Cursor executable file path in plugin settings

### Requirements

- **macOS only** (Windows and Linux not currently supported)
- Node.js (v16 or higher)
- Cursor app must be installed
- Default Cursor path: `/Applications/Cursor.app/Contents/MacOS/Cursor`

## 📁 Project Structure

```
obsidian2cursor/
├── src/
│   ├── main.ts          # Main plugin file
│   ├── manifest.json    # Plugin manifest
│   └── styles.css       # Plugin styles
├── package.json         # Project configuration
├── tsconfig.json        # TypeScript configuration
├── .gitignore          # Git ignore file
└── README.md           # Project documentation
```

## 🛠 Development Guide

### Plugin Creation

1. Define plugin class in `src/main.ts`
2. Set plugin metadata in `src/manifest.json`
3. Add styles in `src/styles.css` if needed

### Key API Usage

```typescript
// Plugin activation
export default class MyPlugin extends Plugin {
  async onload() {
    // Execute when plugin loads
  }
  
  onunload() {
    // Execute when plugin unloads
  }
}
```

## 🔨 Build and Deployment

### Development Build

```bash
npm run build
```

### Production Build

```bash
npm run build:prod
```

### Plugin Testing

1. Enable developer mode in Obsidian
2. Add as local plugin
3. Activate plugin and test

## 📝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more details.

## 🔗 Useful Links

- [Obsidian Plugin API Documentation](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [TypeScript Configuration Guide](https://www.typescriptlang.org/docs/)
- [Obsidian Community](https://forum.obsidian.md/)

## 📞 Contact

If you have any questions about the project, please create an issue.
