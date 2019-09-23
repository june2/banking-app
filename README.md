## Banking app

### 소개
- 인터넷뱅킹 이용 현황 정보 제공 REST API

### 문제해결 전략
- 사용 언어 
  - node와 java 사용하여 같은 기능을 두가지 방식으로 구현
    - node (nestjs-typescript)
    - java (spring)
- 데이터 파일
  - 앱 구동시, csv파일 로딩 후 db에 적재
  - 추후 csv파일 데이터량이 방대해질 경우 대비, batch 업로드 
  - propertise에 boolean 값을 입력하여 앱 구동시, csv 데이터 migration작업 호출 여부 
- DB 
  - MYSQL (docker-compose 사용, 로컬개발용도) 
- ERD
![image](https://user-images.githubusercontent.com/5827617/65154570-b2a22180-da66-11e9-8fe2-f538fb54437e.png)
- API 인증
  - JWT 
    - 서명: secretKey
    - expire: 3600
    - ```
       {
          "expiresIn": accessToken 유효기간,
          "accessToken": API 접근 
          "refreshToken": accessToken 재발급 용도
       }
      ```
    - refreshToken 서버에서 관리
    - token black list 관리 (accessToken즉각파기 용도)
- 비밀번호 암호화
   - sha256
- 예측 알고리즘 
   - [linear regression](https://en.wikipedia.org/wiki/Linear_regression)
- 성능을 고려하여 10000 TPS 이상의 요청을 받을 수 있는 아키텍처에 대해서 고민
   - redis, memcached 활용
   - load balancer 활용 (scale out)
   
### API 명세서
 - 회원가입
    - ```
      POST /auth/signUp
      Body { "email": "string", "password": "string" }
      ```
 - 회원 로그인
    - ```
      POST /auth/login
      Body { "email": "string", "password": "string" }
      ```      
 - 인증 토큰 재발급
    - ```
      GET /auth/refresh
      Header Authorization: Bearer refreshToken      
      ```
 - 인터넷뱅킹 서비스 접속 기기 목록을 출력
    - ```
      GET /devices
      Header Authorization: Bearer accessToken      
      ```
 - 각 년도별로 인터넷뱅킹을 가장 많이 이용하는 접속기기를 출력
    - ```
      GET /utilizations/getHighestDevice
      Header Authorization: Bearer accessToken
      ```
 - 특정 년도를 입력받아 그 해에 인터넷뱅킹에 가장 많이 접속하는 기기
    - ```
      GET /utilizations/getHighestDevice/{year}
      Header Authorization: Bearer accessToken
      Params year: 년도
      ```
 - 디바이스 아이디를 입력받아 인터넷뱅킹에 접속 비율이 가장 많은 해를 출력
    - ```
      GET /utilizations/getHighestRate/{deviceId}`
      Header Authorization: Bearer accessToken
      Params deviceId: 디바이스 아이디
      ```
 - 인터넷뱅킹 접속 기기 ID 를 입력받아 2019 년도 인터넷뱅킹 접속 비율을 예측
    - ```
      POST /utilizations/predictRate
      Header Authorization: Bearer accessToken
      Body {"device_id": 1}
      ```


### 개발 프레임워크 
- [Node](https://github.com/june2/banking-app/tree/master/api-server-node-typescript)
  - typescript
  - nest.js framework 
  - typeOrm
  - passport
  - [빌드 및 실행 방법](https://github.com/june2/banking-app/tree/master/api-server-node-typescript#commands)
  - 기능 구현 범위
    - [x]  [REST API 구축](https://github.com/june2/banking-app/tree/master/api-server-node-typescript/src/api)
    - [x]  [앱구동시 csv파일 db에 적재 (fs 모듈 활용)](https://github.com/june2/banking-app/tree/master/api-server-node-typescript/src/common/banking)
    - [x]  [swagger](https://github.com/june2/banking-app/blob/master/api-server-node-typescript/src/main.ts)
    - [x]  [unit test](https://github.com/june2/banking-app/tree/master/api-server-node-typescript/test)
    - [x]  [2019년 예측 api](https://github.com/june2/banking-app/blob/9ba12f549a893d0071f6d23b2a2431bce8c36b39/api-server-node-typescript/src/api/utilization/utilization.controller.ts#L60-L70)
    - [x]  [JWT 인증 구현](https://github.com/june2/banking-app/blob/master/api-server-node-typescript/src/api/auth)
    - [x]  [token refresh](https://github.com/june2/banking-app/blob/9ba12f549a893d0071f6d23b2a2431bce8c36b39/api-server-node-typescript/src/api/auth/auth.controller.ts#L55-L66)
    - [x]  [회원가입 / 로그인](https://github.com/june2/banking-app/blob/master/api-server-node-typescript/src/api/auth)    
- [Java](https://github.com/june2/banking-app/tree/master/backend-java)
  - java8
  - spring boot
  - jpa
  - spring boot security
  - gradle
  - [빌드 및 실행 방법](https://github.com/june2/banking-app/tree/master/backend-java#commands)
  - 기능 구현 범위
    - [x]  [REST API 구축](https://github.com/june2/banking-app/blob/master/backend-java/src/main/java/com/banking/api)
    - [x]  [앱구동시 csv파일 db에 적재](https://github.com/june2/banking-app/blob/master/backend-java/src/main/java/com/banking/common/Banking.java)
    - [x]  [swagger](https://github.com/june2/banking-app/blob/master/backend-java/src/main/java/com/banking/config/SwaggerConfig.java)
    - [x]  [unit test](https://github.com/june2/banking-app/tree/master/backend-java/src/test)
    - [ ]  2019년 예측 api
    - [x]  [JWT 인증 구현](https://github.com/june2/banking-app/blob/master/backend-java/src/main/java/com/banking/jwt)
    - [ ]  token refresh
    - [x]  [회원가입 / 로그인](https://github.com/june2/banking-app/blob/master/backend-java/src/main/java/com/banking/api/auth)
