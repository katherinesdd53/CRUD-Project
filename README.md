# CRUD Project

A simple CRUD project using React, Node.js and MySQL.

## Getting Started

*This project is aimed for beginner’s or those who want to create a CRUD app using the technologies mentioned above.*

## Prerequisites

Your local machine should have the following programs downloaded:
1. Sublime (or a text editor/IDE of your choosing)
2. MySQL Workbench (visual tool for MySQL)
3. Postman (API development environment)

## Installing

#### PART 1

Before downloading this repo, make sure that you have MySQL workbench and Postman downloaded. To download MySQL, you can go [here](https://dev.mysql.com/downloads/installer/) if you have a Windows computer. For other operating systems, download the community server [here](https://dev.mysql.com/downloads/mysql/) and then the workbench [here](https://dev.mysql.com/downloads/workbench/). 

Once MySQL is downloaded, download Postman [here](https://www.postman.com/downloads/).

To setup the database for the app, follow the instructions from this [link](https://www.edureka.co/blog/node-js-mysql-tutorial/). I advise to read the article but if you want to get straight to creating, skip to the “Creating a CRUD Application using Node.js and MySQL” title.

Once you are done with the tutorial, you should make the following changes on script.js:

**Add this CORS function below your bodyparser:**
```
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
```

**For the post function, stringify the response inside the foreach method, after the if:**
```
res.send(JSON.stringify(element[0].learner_id));
```

**For the put function, send this instead inside the if method:**
```
rows.forEach(element => {
  if(element.constructor == Array) {
    res.send(JSON.stringify(element[0].learner_id));
  }; 
});
```

**For the delete function, change it to this:**
```
res.send(JSON.stringify(req.params.id));
```

#### PART 2

Download this repo in the same directory as the server side file (the file from Part 1). Once downloaded, open terminal (or command prompt) and open two tabs, one for the server and one for the frontend. For tab 1, go to the file containing the server code and run this command:

```
nodemon script.js
```

For tab 2, go to the file containing this repo and run this command:

```
npm start
```

Now, you can see how the app works!

## Built With
* React - [Web Framework](https://reactjs.org/)
* Node.js - [Runtime Environment](https://nodejs.org/en/)
* MySQL - [Relational Database Management System](https://www.mysql.com/)

## Author
* Katherine Suazo - [LinkedIn](https://www.linkedin.com/in/katherinesdd53/)

## Acknowledgments
* Rachel (Rocky) Fine at Etsy
* Swatee Chand at Edureka
* [Billie Thompson](https://purplebooth.co.uk/about/me/)
