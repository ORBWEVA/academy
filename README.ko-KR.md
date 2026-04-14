<div align="center">

# @orbweva/academy

[English](README.md) · [日本語](README.ja-JP.md) · **한국어**

파운더가 필요한 모든 ORBWEVA Claude Code 스킬을 명령어 하나로 설치.

```
npx @orbweva/academy@latest
```

**macOS, Windows, Linux**에서 작동. Node 18+, 런타임 의존성 없음.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![ORBWEVA Academy](https://img.shields.io/badge/ORBWEVA-Academy-1f6feb.svg)](https://orbweva.com/ko/accelerator/skills)

[존재 이유](#존재-이유) · [빠른 시작](#빠른-시작) · [트랙](#트랙) · [스페셜라이제이션 팩](#스페셜라이제이션-팩) · [관련 문서](#관련-문서)

</div>

---

## 존재 이유

ORBWEVA 수강생이 제일 먼저 하는 일은 22개의 슬래시 명령어를 순서대로 입력하는 것이었습니다. `/plugin marketplace add …` 다음 `/plugin install …`, 11번 반복. 순서를 틀리면 `Unknown skill: discovery — Create a new one?`이 뜨고, 반사적으로 Enter를 누르면 가짜 스킬이 생성되며 오류 메시지도 없습니다. Windows에서는 관리자 권한 `winget`용과 비관리자 권한 `scoop`용 PowerShell 창 두 개가 동시에 필요하고, `EBADENGINE` 경고는 무해하지만 "'gh'를 인식할 수 없다"는 단순히 PATH가 갱신되지 않았다는 것을 깨닫기 전까지 절반이 조용히 실패합니다.

아무도 원치 않는 통과 의례였습니다. 그래서 이걸 만들었습니다.

**이 도구가 하는 일** — 22개의 `/plugin …` 명령어를 하나의 `npx` 호출로 대체합니다. 11개의 공개 ORBWEVA 스킬 저장소를 얕게 클론하고, `skills/<name>/` 디렉터리를 `~/.claude/skills/`로 복사한 뒤, 여전히 필요한 플랫폼별 CLI 도구와 MCP 서버 명령어를 출력합니다. 런타임 의존성 없음. Node 18+와 `git`만 있으면 됩니다.

## 대상 사용자

- **ORBWEVA Accelerator 수강생** — 12주 코호트 프로그램
- **파운더 트랙 파트너** — 고객에게 경량 파운더 베이스를 재판매하는 에이전시 등
- **멘토링 고객** — 1:1 운영자 지원을 받는 기존 비즈니스
- **자율 학습자** — Course 트랙
- **스페셜리스트** — 트랙 위에 수직 영역을 쌓는 사용자 (Loka 생태계, 마케팅 에이전시, 웹+비디오 스튜디오)

위에 해당하지 않지만 스킬이 필요하면 `--track full`을 실행하세요.

## 빠른 시작

```bash
# 메뉴에서 트랙 선택, 몇 가지 프롬프트에 답변
npx @orbweva/academy@latest

# 특정 트랙으로 직행, 옵션 스킬별 프롬프트
npx @orbweva/academy@latest --track accelerator

# 완전 비대화형 (모든 기본값, 모든 옵션 스킬, 글로벌)
npx @orbweva/academy@latest --track accelerator --yes --global

# 트랙 위에 스페셜라이제이션 쌓기
npx @orbweva/academy@latest --track accelerator --pack loka
npx @orbweva/academy@latest --track accelerator --pack marketing --pack web-video

# 파트너 제공 경량 파운더 베이스 (Accelerator 오버헤드 없음)
npx @orbweva/academy@latest --track founder
```

## 트랙

베이스 프로그램 하나 선택. 트랙별 상세는 [docs/TRACKS.md](docs/TRACKS.md) 참조.

| 트랙 | 대상 | 스킬 수 |
|---|---|---|
| `accelerator` | 12주 코호트 — 제로투원 파운더 | 15 |
| `course` | 자율 학습 파운더 기본기 | 9 |
| `mentoring` | 기존 비즈니스를 위한 1:1 운영자 지원 | 13 |
| `founder` | 파트너 제공 프로그램용 경량 베이스 (에이전시, 리셀러) | 10 |
| `full` | 전체 — 트레이드오프 없음 | 15 |

## 스페셜라이제이션 팩

어떤 트랙 위에도 쌓을 수 있습니다. [docs/PACKS.md](docs/PACKS.md) 참조.

| 팩 | 대상 | 상태 |
|---|---|---|
| `loka` | Loka living-textbook + LoLA 아바타 플랫폼 위 비즈니스 | 계획 중 |
| `marketing` | 1인 (또는 소규모 팀) 마케팅 에이전시 | 계획 중 |
| `web-video` | 웹 디자인 + 비디오 편집 스튜디오 | 계획 중 |

> 팩 저장소는 `manifest.json`에 스테이징되어 있지만 아직 공개되지 않았습니다. 저장소가 공개되기 전까지 설치 관리자는 계획 중인 팩을 우아하게 건너뜁니다.

## 설치되는 것

설치 관리자는 트랙 + 추가한 팩으로 스킬 세트를 구성하고 관련 공개 ORBWEVA 저장소를 Claude Code 스킬 폴더에 클론합니다.

**모든 스킬과 명령어의 페이즈별 카탈로그**는 [ORBWEVA Accelerator Skills Reference](https://orbweva.com/ko/accelerator/skills)를 참조. 그게 공식 출처이며, 여기서는 중복하지 않습니다.

## 설치 확인

설치 관리자가 끝나면 Claude Code를 열고 실행:

```
/discovery:help
```

고객 발견 명령어 메뉴가 나타나야 합니다. Claude가 `Unknown skill`이라고 하면 [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) 참조.

## 최신 상태 유지

동일한 원라이너 재실행:

```bash
npx @orbweva/academy@latest
```

각 저장소를 다시 클론하고 기존 스킬 폴더를 덮어씁니다. 에어갭 또는 npm 없는 환경은 [docs/manual-update.md](docs/manual-update.md) 참조.

## 모든 플래그

| 플래그 | 의미 |
|---|---|
| `-t, --track <name>` | 트랙: `accelerator`, `course`, `mentoring`, `founder`, `full` |
| `-p, --pack <name>` | 스페셜라이제이션 팩 추가 (반복 가능) |
| `-g, --global` | `~/.claude/skills/`에 설치 |
| `-l, --local` | `./.claude/skills/`에 설치 |
| `-y, --yes` | 모든 기본값 수락, 선택 항목 전체 설치, 프롬프트 없음 |
| `--skills-only` | 설치 후 CLI/MCP 가이던스 건너뛰기 |
| `--dry-run` | 예정 표시, 디스크 변경 없음 |
| `-h, --help` | 도움말 표시 |

## 관련 문서

**이 저장소 내:**
- [docs/USER-GUIDE.md](docs/USER-GUIDE.md) — 모든 플래그 조합 포함 상세 워크스루
- [docs/TRACKS.md](docs/TRACKS.md) — 트랙별 딥다이브
- [docs/PACKS.md](docs/PACKS.md) — 스페셜라이제이션 팩 아키텍처 + 추가 방법
- [docs/CLI-TOOLS.md](docs/CLI-TOOLS.md) — OS별 CLI 설치 레퍼런스 (Windows 함정 포함)
- [docs/MCP-SERVERS.md](docs/MCP-SERVERS.md) — 트랙별 MCP 서버 설정
- [docs/manual-update.md](docs/manual-update.md) — npm 없는 환경용 대체 설치
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) — 설치 관리자 관련 문제

**ORBWEVA 생태계 내:**
- [ORBWEVA Accelerator Skills Reference](https://orbweva.com/ko/accelerator/skills) — 스킬 + 명령어의 페이즈별 공식 카탈로그
- [Accelerator Curriculum Template](https://github.com/ORBWEVA/accelerator-template) — 12주 프로그램 가이드
- [프로그램 트러블슈팅 가이드](https://github.com/ORBWEVA/accelerator-template/blob/main/docs/TROUBLESHOOTING.md) — 설치 외 문제 (세션 중 스킬 실패, API 키 등)
- [졸업 기준](https://github.com/ORBWEVA/accelerator-template/blob/main/docs/GRADUATION_CRITERIA.md) — Accelerator "완료"의 의미

## 기여

트랙, 팩, 스킬 저장소 추가는 [CONTRIBUTING.md](CONTRIBUTING.md) 참조. 대부분의 변경은 `manifest.json`의 한 줄 편집입니다.

## 라이선스

[MIT](LICENSE). © 2026 ORBWEVA.
