# 🚀 SIKAKI 앱 배포 및 테스트 가이드

이 문서는 SIKAKI 앱을 GitHub에 올리고 배포하는 과정에서 발생하는 문제를 해결하기 위한 가이드입니다.

## 1. GitHub 저장소 생성 오류 해결 (Troubleshooting)

만약 **"Failed to create GitHub repository"** 메시지가 뜬다면 아래 방법으로 해결하세요.

### 방법 A: 수동 저장소 생성 (가장 확실함)
1. [GitHub](https://github.com/new)에 접속하여 직접 `sikaki-app`이라는 이름의 새 저장소를 만듭니다.
2. 터미널(CMD)을 열고 프로젝트 폴더에서 아래 명령어를 순서대로 입력합니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/본인아이디/sikaki-app.git
   git push -u origin main
   ```

### 방법 B: 권한 재설정
1. GitHub 설정의 [Applications](https://github.com/settings/installations)에서 'Google AI Studio' 또는 관련 앱을 제거(Revoke)합니다.
2. AI Studio에서 다시 GitHub 저장을 시도하여 권한 승인 창이 뜨면 모든 체크박스를 선택합니다.

## 2. 배포 방법
### Vercel 사용하기
1. [Vercel](https://vercel.com)에 로그인합니다.
2. 위에서 수동으로 만든 GitHub 저장소를 선택하여 배포합니다.

## 3. 주요 테스트 항목
- **레이아웃**: 중고장터 게시물이 2열로 보이는지 확인.
- **네비게이션**: 상단 프로필 아이콘 클릭 시 마이페이지로 이동하는지 확인.
- **다국어**: 언어 변경 시 카테고리 버튼들이 정상적으로 표시되는지 확인.
