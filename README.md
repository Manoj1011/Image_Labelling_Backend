
# Image Labelling Backend

This repo is the backend of the Image Labelling, which is a supports admin and user type management where every user and admin can see what the label given by users for each image and this data can be used in Machine learning as this information is also collecting data.



## Features

- admin dashboard (only admin has access) - supports creating, deleting labels and uploading images
- normal dashboard ( both users and admins has access) - showing label for eah image given by mutiple users by taking maximum of labels


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT= <port the backend should run on ex: 4444>`

`NODE_ENV= development`

`REACT_APP_FRONTEND_URL= <ex: http://localhost:3000>`

`SERVER_URL= <ex: http://localhost:4444>`

`MONGO_URL= <url of mongodb server>`

`JWT_SECRET= <this secret string will be used for generating tokens>`

`S3_ACCESS_SECRET= <this secret for creating access token for Bucket>`

`S3_BUCKET= <S3 bucket name>`

`S3_REGION= <S3 region >`

## Run Locally

Clone the project

```bash
  git clone https://github.com/Manoj1011/Image_Labelling_Backend.git
```

Go to the project directory

```bash
  cd Image_Labelling
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npx nodemon index.js
```

### In services/connection.js main idea is basically admins need to be added manually in the database. so what I have done is initially while connecting to MongoDB itself I added one admin. Please replace namd and password with your details.
