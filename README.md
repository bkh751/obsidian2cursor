# Obsidian2Cursor Plugin

Obsidian에서 Cursor로 파일과 프로젝트를 여는 플러그인입니다.

## ✨ 기능

- **Alt + shitf + O**: 현재 보고 있는 Obsidian 문서를 Cursor에서 열기 (커서 위치 유지)
- **Alt + shift + P**: 현재 Obsidian vault를 Cursor 프로젝트로 열기 (커서 위치 유지)
- 커서 위치 자동 감지 및 전달
- 설정 가능한 Cursor 실행 파일 경로

## 📋 목차

- [개발 환경 설정](#개발-환경-설정)
- [프로젝트 구조](#프로젝트-구조)
- [개발 가이드](#개발-가이드)
- [빌드 및 배포](#빌드-및-배포)
- [기여하기](#기여하기)

## 🚀 설치 및 사용

### 설치 방법

1. 이 저장소를 다운로드하거나 클론합니다
2. `npm install`로 의존성을 설치합니다
3. `npm run build`로 플러그인을 빌드합니다
4. Obsidian에서 개발자 모드를 활성화하고 로컬 플러그인으로 추가합니다

### 사용 방법

1. **Alt + O**: 현재 열린 파일을 Cursor에서 엽니다
2. **Alt + P**: 현재 vault를 Cursor 프로젝트로 엽니다
3. 설정에서 Cursor 실행 파일 경로를 조정할 수 있습니다

### 필수 요구사항

- Node.js (v16 이상)
- Cursor 앱이 설치되어 있어야 함
- macOS (다른 OS는 경로 설정 필요)

## 📁 프로젝트 구조

```
obsidian2cursor/
├── src/
│   ├── main.ts          # 메인 플러그인 파일
│   ├── manifest.json    # 플러그인 매니페스트
│   └── styles.css       # 플러그인 스타일
├── package.json         # 프로젝트 설정
├── tsconfig.json        # TypeScript 설정
├── .gitignore          # Git 무시 파일
└── README.md           # 프로젝트 문서
```

## 🛠 개발 가이드

### 플러그인 생성

1. `src/main.ts`에서 플러그인 클래스 정의
2. `src/manifest.json`에서 플러그인 메타데이터 설정
3. 필요한 경우 `src/styles.css`에서 스타일 추가

### 주요 API 사용법

```typescript
// 플러그인 활성화
export default class MyPlugin extends Plugin {
  async onload() {
    // 플러그인 로드 시 실행
  }
  
  onunload() {
    // 플러그인 언로드 시 실행
  }
}
```

## 🔨 빌드 및 배포

### 개발 빌드

```bash
npm run build
```

### 프로덕션 빌드

```bash
npm run build:prod
```

### 플러그인 테스트

1. Obsidian에서 개발자 모드 활성화
2. 로컬 플러그인으로 추가
3. 플러그인 활성화 후 테스트

## 📝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🔗 유용한 링크

- [Obsidian Plugin API 문서](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [TypeScript 설정 가이드](https://www.typescriptlang.org/docs/)
- [Obsidian 커뮤니티](https://forum.obsidian.md/)

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
