# ODD_TechnicalExam

## Running Instructions

### On Server
```
npm i express pg cors
node index.js
```

### On Client
```
npm start
```

### On Database
```
CREATE DATABASE todo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);
```
