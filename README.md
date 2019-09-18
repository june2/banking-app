## Banking app

### 소개
- 인터넷뱅킹 이용 현황 정보 제공 AP 

### 문제해결 전략
- ERD
![image](https://user-images.githubusercontent.com/5827617/65154570-b2a22180-da66-11e9-8fe2-f538fb54437e.png)
- API 인증
  - JWT 
    - 서명: secretKey
    - expire: 3600
- 비밀번호 암호화
   - sha256
   
### API 명세서
 - 인터넷뱅킹 서비스 접속 기기 목록을 출력
    - ```
      GET /devices
      ```
 - 각 년도별로 인터넷뱅킹을 가장 많이 이용하는 접속기기를 출력하
    - ```
      GET /utilizations/getHighestDevice
      ```
 - 특정 년도를 입력받아 그 해에 인터넷뱅킹에 가장 많이 접속하는 기기
    - ```
      GET /utilizations/getHighestDevice/{year}
      Params year: 년도
      ```
 - 디바이스 아이디를 입력받아 인터넷뱅킹에 접속 비율이 가장 많은 해를 출력
    - ```
      GET /utilizations/getHighestRate/{deviceId}`
      Params deviceId: 디바이스 아이디
      ```
 - 인터넷뱅킹 접속 기기 ID 를 입력받아 2019 년도 인터넷뱅킹 접속 비율을 예측
    - ```
      POST /utilizations/predictRate
      Body {"device_id": 1}
      ```


### 개발 프레임워크 
- Node
- Java
