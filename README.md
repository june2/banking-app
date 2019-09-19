## Banking app

### 소개
- 인터넷뱅킹 이용 현황 정보 제공 REST API

### 문제해결 전략
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
  - fs 모듈 활용, 앱구동시 csv파일 db에 적재
  - [빌드 및 실행 방법](https://github.com/june2/banking-app/tree/master/api-server-node-typescript#commands)
- Java
