## Banking app node server rest api

### This app include the following features:

- Node.js
- [Nest](https://github.com/nestjs/nest)
- typeorm
- babel
- jest
- nodemon
- eslint

## Directory Layout

```
.
├── /docker/                    # docker 폴더 (mysql docker-compose)
├── /files/                     # csv 파일 폴더
│   └── memoryDb.sqlite         # sqllite file
├── /src/                       # server 폴더
│   ├── /api/	                  # api 폴더
│   ├── /common/                # middeware 폴더
│   ├── app.module.ts           # module
│   └── main.ts	                # entry point
├── /test/                      # Unit and integration tests
├── .env                        # envierment configure
├── nodemon.json                # nodemon configure
│── package.json                # Dev dependencies and NPM scripts
├── tsconfig.json               # ts configure
└── README.md                   # Project overview
```

## Commands

### Run
```zsh
$ yarn                                # Install modules
$ yarn build                          # Build ts files
$ yarn start:dev                      # Run development mode
$ yarn start:prod                     # Run production mode
```

### Test
```zsh
$ yarn test                           # Run all test
$ yarn test:watch                     # Run unit test
$ yarn test:e2e                       # e2e test
```
