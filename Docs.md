# Technologies used to build this project:
- [Docker](https://www.docker.com)
- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Yarn](https://yarnpkg.com/)

#  Requirements to run the API:
- [Docker](https://www.docker.com)  installed

# Installation
After you have Docker installed yout should do the following steps:

- Clone the project

```bash
  git clone git@gitlab.com:ki-group-pt/xgeekshq/assignments/be-assignment-galleonpt.git <folder_name>
```

- Go to the project directory

```bash
  cd <folder_name>
```

- Open the project in your favorite text editor and rename the file
```bash
  .env.sample to .env
```

- Run to start all containers:
```bash
  docker-compose up -d
```
If you want to know when the API is ready to be used run the command bellow and see a message like **App running at http://localhost:3333**
```bash
  docker logs -f --tail 50 interview_calendar_api
```

- Run migrations using:
```bash
  docker exec -it interview_calendar_api yarn prisma migrate deploy
```

- After that you are ready to user the API.

# API Endpoints Documentation

I recommend using [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download) to see the API working.

## Notes
- Cada objeto dentro dos arrays _times_ representa um dia e os valores utilizados para registar as disponibilidades são do formato **unix timestamp**.



### Base url
```bash
  http://localhost:3333
```
### Headers
```bash
  Content-type: application/json
```
---
## Create candidate
**Endpoint**
```bash
  POST /candidates
```

**Body**
```json
{
	"name":"candidate 1",
	"times":[
		{"startDate": 1646913600, "endDate":1646931600},
		{"startDate": 1646985600, "endDate":1647025200}
	]
}
```

**Response**
```json
{
	"message":"Inserted",
}
```
---

## List candidates
**Endpoint**
```bash
  GET /candidates
```

**Response**
```json
[
	{
		"id": "da21c2a1-7189-4a44-9ac5-0a78c3225b6d",
		"name": "candidate_name",
		"availabilities": [
			{
				"id": "28c4d81d-d4bc-420f-96c9-de37818edd01",
				"start_date": 1646917200,
				"end_date": 1646920800,
				"candidate_id": "da21c2a1-7189-4a44-9ac5-0a78c3225b6d"
			},
		]
	},
]
```
---
## Create interviewer
**Endpoint**
```bash
  POST /interviewers
```

**Body**
```json
{
	"name":"interviewer 1",
	"times":[
		{"startDate": 1646755200, "endDate":1646755200}
	]
}
```

**Response**
```json
{
	"message":"Inserted",
}
```
---

## List interviewers
**Endpoint**
```bash
  GET /interviewers
```

**Response**
```json
[
	{
		"id": "953aab6d-e0f1-485c-898a-b09501e71c9c",
		"name": "interviewer_name",
		"availabilities": [
			{
				"id": "d8e1f510-4c64-44fb-b8fa-4ea6971e7bec",
				"start_date": 1646812800,
				"end_date": 1646816400,
				"interviewer_id": "953aab6d-e0f1-485c-898a-b09501e71c9c"
			}
		]
	}
]
```
---
## Get a colection of time that is possible to arrange an interview for a particular candidate and one or more interviewers
**Endpoint**
```bash
  POST /matches?candidate=candidate_name&interviewers=interviewer_name1
```

- It is possible to send more than one interviewer name. to do date you should split the names by comma, e.g.
```bash
  POST /matches?candidate=candidate_name&interviewers=interviewer_name1,interviewer_name2
```

**Response**
```json
[
	{
		"name": "interviewer_name",
		"availabilities": [
			{
				"id": "9841bdc5-9a72-4e57-91fa-23f9ff6cbf71",
				"start_date": 1646820000,
				"end_date": 1646823600,
				"interviewer_id": "7abfc678-45d6-4469-8e41-f8a8e0b7b7f7"
			},
		]
	}
]
```
---

# Contributing

Contributions are always welcome!

If you want to contribute you **must**:

- Clone the project
- Create a branch and code what you want
- Commit your code
- Push it
- Create a pull request

---

# Start Guide
When you clone the repository you will have the following folder architecture:

```
prisma
├── migrations
└── schema.prisma
src
├── controllers
│    ├── CandidatesController.ts
│    └── InterviewersController.ts
├── prisma
│   └── indexts
├── utils
│   └── getMatches.ts
│   └── getTimeSlots.ts
├── routes.ts
└── server.ts
```

At the root of the project you will have **prisma** folder witch is responsable to store all the migrations and database models for prisma.The **src** folder is where all the code is developed.

Inside **src** we have 3 folders:
- <u>controllers</u>: where all application controllers are stored;
- <u>prisma</u>: folder where is prisma client is created. This client is what let us interact with the database;
- <u>utils</u>: here is where auxiliar functions are stored. Those functions can be used in multiple places, that's the reason why each file only have one function. This makes code maintenance easier:
