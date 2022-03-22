<!-- @format -->

# Nest.js and Next.js Starter

Starter for back-end and front-end

### Back-end

-   Nestjs
-   Prisma
-   Postgresql
-   Swagger
-   Restful api
-   Local and S3 storage
-   Google and facebook auth
-   Jwt, AccessToken and RefreshToken
-   Custom decorator
-   Class validator
-   Json seeder

#### Back-end Instruction

##### Step 1 : Run this command for install dependencies (I using yarn)

```sh
 > cd backend
 > yarn install
 # or
 > npm install
```

##### Step 2 : Create .env file, just copy .env.example

```sh
 > cp .env.example .env
```

##### Step 3 : Configure .env file

```sh
 # for connect to postgresql database
 DATABASE_URL="postgresql://postgres:12345@localhost:5432/ats?schema=public"

 # google authenticate
 GOOGLE_CLIENT_ID=your_google_client_id
 GOOGLE_SECRET=your_google-secret

 # facebook authenticate
 FACEBOOK_APP_ID=
 FACEBOOK_APP_SECRET=
```

##### Step 4 : Prisma operation

```sh
 # create prisma migration file and create tables in database
 > yarn prisma:migrate

 # insert seed data to database. users, tags, languages, roles, countries info
 > yarn prisma:seed
```

##### Step 5 : Run app and check swagger api documents in **_/docs_** route

```sh
 # app running on port 3000
 > yarn dev
```

Swagger has custom style. <br />
Swagger user: **_app_** <br/>
Swagger password: **_secret_**

### Front-end

-   Nextjs (react)
-   Tailwind and daisyui
-   Atomic design
-   Hygen generator
-   Custom authentication (jwt)
-   Custom hooks
-   Redux
-   Valtio
-   React-query
-   Cookie and storage
-   Multi theme
-   React-hook-form
-   React-select
-   Testing (testing-library/react and jest)

#### Front-end Instruction

##### Step 1 : Run this command for install dependencies (I using yarn)

```sh
 > cd frontend
 > yarn install
 # or
 > npm install
```

##### Step 2 : Run webapp

```sh
 # app running on port 3001
 > yarn dev
```

---

Best regards <br />
[Mostafa Gholami](https://gitlab.com/mst-ghi)
