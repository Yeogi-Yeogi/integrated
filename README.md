## 1. 개요
### 1.1 소개
소모임 웹 사이트
여기여기는 소통을 목적을 가지고 있어, 공동의 관심사를 가진 사람들끼리 모여 활동하면서 <br>
커뮤니케이션 및 그룹에 특화된 서비스를 제공하는 것에 주목하고자 합니다.

### 1.2 유사 프로그램 분석
<img width="587" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/40833049-1510-436c-a66c-75744e62e208">
<img width="755" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/623e1a5e-5934-401f-883c-90891ec3f31b">

### 1.3 여기여기의 개발 방향
<img width="746" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/6adb1573-8004-4555-aaff-004aada0b50a">

<br><br><br>
## 2. 시스템 설계
### 2.1 아키텍처 구성도
<img width="731" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/5b34b05c-5196-48e0-83c2-35d1c5c6318b">

### 2.2 DB 설계도
  <p><strong>링크 참조</strong> https://github.com/rinklove/yeogi-yeogi/assets/88640680/69a443fd-1dcf-437c-b5ed-6990e5d36201</p>
<img width="659" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/69a443fd-1dcf-437c-b5ed-6990e5d36201">


### 2.3 시퀀스 다이어그램
|회원가입 & 로그인|내 정보 조회 & 변경|
|-----|---|
|<img width="399" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/eb806005-5d4c-40d8-bc2d-90a1c5bd3ccb">|<img width="441" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/38ca5db3-b6f9-49bc-999a-ae72f8c60e4c">|

|모임 생성|모임 정보 수정| 회원관리|
|-----|---|---|
|<img width="367" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/860ec238-a747-4252-a08d-482954a62ab6">|<img width="365" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/1464f7f3-7b9d-4b3e-81f9-ebaee3d4b1bc">|<img width="328" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/ac888458-a072-4aa6-964f-350396fd17bc">|

|게시글/공지사항/일정/갤러리 목록 조회|게시글 상세 조회, 댓글 작성|
|-----|---|
|<img width="502" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/11731194-68d4-404f-89e0-672854d0527e">|<img width="380" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/f4b074f1-eb6b-446d-bc54-25251368e2bb">|

|게시글 작성, 게시글 수정, 공지사항 작성|게시글/댓글/공지사항 삭제|
|-----|---|
|<img width="471" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/1f925a16-4ff2-453d-8f68-5809d9aef462">|<img width="473" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/f30d9945-405f-40eb-9538-f4965ee42f4a">|

## 3. 주요 기능별 화면
|메인 홈페이지|회원가입|로그인|마이 페이지|
|-----|---|---|---|
|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/d96444b8-7a6c-4d1a-9cbf-572d6a69cefa">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/32a842a6-617a-4119-a392-2eea49423790">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/1e74082e-69ad-4aa0-9bc1-991670d95f7f">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/b3143f13-20b6-46de-8629-78bf30640dce">|

|모임 생성|모임 가입|모임 관리(개설자)|모임 관리(관리자)|
|-----|---|---|---|
|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/33e63979-4fed-4312-8ed7-6f9564729854">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/e28c14db-784a-447b-a68f-ec991d4cbd42">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/ee005424-333f-4db8-90c2-6a6dff9e20a3">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/f7382c00-8f70-4c4f-9f52-91b40868936f">|

|게시글 목록 조회(일반 회원)|게시글 목록 조회(관리자, 개설자)|게시글 상세 조회(일반 회원)|게시글 상세 조회(개설자, 관리자)|
|-----|---|---|---|
|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/3cbd1fdc-cb08-4960-aaa3-e3398d5fbef2">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/e0f4be2f-4a42-4a2f-9134-5d4627fdb584">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/a38cb9ae-12bd-4f08-8ab5-51cee6263c44">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/ba985e55-0d43-4f53-b993-5914036bd6e9">

|공지사항 목록 조회(일반 회원)|공지사항 목록 조회(관리자, 개설자)|공지사항 상세 조회(일반 회원)|공지사항 상세 조회(개설자, 관리자)|
|-----|---|---|---|
|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/ed8232fe-9cbd-4534-810b-b0cbe33a6690">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/b4a7d218-91bc-4d60-8577-83abbeff73b4">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/e1f9f4c2-0ceb-4a21-a0cb-c01d40fa24bb">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/26a8bbf2-e99d-4de7-b286-fa3fefddec09">|

|게시글 작성|공지사항 작성(관리자, 개설자)|일정 목록 조회|갤러리 목록 조회|
|-----|---|---|---|
|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/c05a3422-9262-4abd-b700-97387efba6cc">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/1bf02ba9-0574-4e0d-98dd-57aa605f85c4">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/56ec883b-7b52-430b-b30f-ab0f7584d5cb">|<img width="350" alt="image" src="https://github.com/rinklove/yeogi-yeogi/assets/88640680/8c168fe6-26df-4e90-ab4c-1f44c5c0949d">


<br><br><br>
## 4. 팀원 소개
<table style="width: 100%">
    <thead>
        <tr>
            <th style="text-align: center width: 5%" >구분</th>
            <th style="text-align: center">이준호</th>
            <th style="text-align: center">박종범</th>
            <th style="text-align: center">이예지</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: center"><span>Role</span></td>
            <td style="text-align: center"><span>Leader & Developer</span></td>
            <td style="text-align: center"><span>DB Manager & Developer</span></td>
            <td style="text-align: center"><span>SCM Manager & Developer</span></td>
        </tr>
        <tr>
            <td style="text-align: center"><span>gitHub</span></td>
            <td style="text-align: center"><a href="https://github.com/rinklove"><strong>rinklove</strong></a></td>
            <td style="text-align: center"><a href="https://github.com/Whdbeom"><strong>Whdbeom</strong></a></td>
            <td style="text-align: center"><a href="https://github.com/leeyeji803"><strong>leeyeji803</strong></a></td>
        </tr>
        <tr>
            <td style="text-align: center"><span>Contributions</span></td>
            <td style="text-align: center">
                <span>게시글 관련 기능</span><br>
                <span>공지사항 관련 기능</span><br>
                <span>일정 관련 기능</span><br>
                <span>갤러리 관련 기능</span><br>
            </td>
            <td style="text-align: center">
                <span>모임 생성</span><br>
                <span>모임 수정</span><br>
                <span>회원 관리</span><br>
            </td>
            <td style="text-align: center">
                <span>로그인 및 로그아웃</span><br>
                <span>마이페이지 관련 기능</span><br>
            </td>
        </tr>
    </tbody>
</table>

