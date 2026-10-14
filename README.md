# TS팀 도구 앱 (홈 화면 앱)

기술영업팀 업무용 계산기 · 도구 모음. 핸드폰 홈 화면에 추가해서 앱처럼 쓰고, 인터넷이 없어도 열립니다.

## 폴더 구성
- `index.html` 메뉴 화면
- `tools/spotcal.html` Spot Calibration 계산기 (= `261014_CSC계산기_SpotCal_Rev.03.html`)
- `tools/control.html` Control 계산기 (= `261014_CSC계산기_Control_Rev.01.html`)
- `tools/guideline.html` 검사지침서 생성기 (= `261014_검사지침서 생성기_Rev.01.html`, 약 2.7MB)
- `tools/rawdata.html` Raw Data 정리 도구 (= `261014_raw data 정리 도구_Rev.00.html`)
- 위 네 파일은 원본을 이름만 영문으로 바꿔 넣은 것 (주소에 한글이 들어가면 깨질 수 있어서)
- `manifest.webmanifest` · `sw.js` · `icons/` 앱 설치 · 오프라인 설정 (고칠 일 없음)
- `robots.txt` 검색 사이트에 안 나오게 하는 설정
- `README.md` 이 안내 (지워도 앱에는 영향 없음)

## 1. GitHub Pages에 올리기 (처음 한 번)
1. github.com에서 새 저장소 만들기: 오른쪽 위 `+` → New repository
   - 이름: `ts-tools` (원하는 이름 가능, 이름이 주소에 들어감)
   - **Public** 선택 (무료 계정은 Public만 Pages 사용 가능)
   - "Add a README file"은 체크하지 않기
2. 만든 저장소 화면에서 **uploading an existing file** 클릭
3. zip을 풀고, **`csc-app` 폴더 안의 내용물**(index.html, tools, icons, sw.js 등)을 한꺼번에 끌어다 놓기
   - 폴더째 올리면 안 됨: `index.html`이 저장소 맨 위에 있어야 함
   - `tools`, `icons` 폴더도 함께 끌어다 놓으면 폴더 구조가 유지됨
4. 아래 **Commit changes** 클릭
5. 저장소 **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save
6. 1~2분 뒤 같은 화면 위쪽에 `https://아이디.github.io/ts-tools/` 가 나옴 → 이 주소가 앱 주소
   - 주소가 열리면 메뉴 화면에 도구 버튼 4개(Spot Calibration · Control · 검사지침서 생성기 · Raw Data 정리 도구)가 보여야 정상

주의: Public 저장소라 저장소 주소를 아는 사람은 계산기 파일(컨트롤 데이터 포함)을 볼 수 있음. 검색 사이트에는 나오지 않게 해 두었지만, 주소는 팀 안에서만 공유하기. 회사 정책상 곤란하면 올리기 전에 확인.

## 2. 핸드폰에 설치
- 안드로이드(Chrome): 주소 열기 → 오른쪽 위 ⋮ → "홈 화면에 추가" 또는 "앱 설치"
- 아이폰(Safari): 주소 열기 → 아래 공유 버튼 → "홈 화면에 추가" (Chrome 앱이 아니라 Safari에서)
- 한 번 열어 두면 인터넷이 없어도 열림. 메뉴 아래에 "오프라인 사용 준비됨"이 보이면 저장 완료.

## 3. 계산기를 고쳤을 때 (업데이트)
1. 새 파일을 위 표의 영문 이름(`spotcal.html` / `control.html` / `guideline.html` / `rawdata.html`)으로 바꿔서 준비
2. `sw.js`를 열어 맨 위 `ts-tools-v3`의 숫자를 하나 올림 (v3 → v4)
3. GitHub 저장소에서 **Add file → Upload files**로 같은 이름의 파일을 올려 덮어쓰기 (도구 파일은 저장소의 `tools` 폴더 화면에서 올리고, `sw.js`는 맨 위 화면에서 올림) → Commit
4. 1~2분 뒤 반영됨. 핸드폰은 인터넷이 될 때 앱을 열면 새 파일로 바뀜. 안 바뀌면 앱을 완전히 닫았다가 다시 열기(GitHub는 파일을 몇 분간 보관해서 바로는 안 바뀔 수 있음)
5. 되돌리고 싶으면 저장소의 History에서 이전 버전을 받아 다시 올리면 됨

## 4. 도구를 더 넣고 싶을 때
- `tools` 폴더에 html 추가 → `index.html`의 `TOOLS` 목록에 한 줄, `sw.js`의 `FILES`에 한 줄 추가 → 버전 숫자 올리고 다시 올리기

## 문제가 생겼을 때
- 주소가 404: Settings → Pages에서 Branch가 `main` / `(root)`인지, `index.html`이 저장소 맨 위에 있는지 확인
- 메뉴는 나오는데 도구가 빈 화면: `tools` 폴더 안에 해당 파일이 올라갔는지 확인 (폴더 구조가 유지되지 않고 파일이 맨 위에 흩어져 올라가는 경우가 많음)
- 엑셀 보고서 · Word 다운로드가 안 됨(특히 아이폰 홈 화면 앱): 같은 주소를 Safari 브라우저 탭에서 열어 다운로드
- 검사지침서 생성기 · Raw Data 정리 도구는 PC 화면 기준으로 만든 도구라 핸드폰에서는 보기 · 확인용으로 쓰고, 작성은 PC 브라우저에서 같은 주소로 하는 것을 권장
