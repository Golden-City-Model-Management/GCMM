
# Golden City Model Management - GCMM  

## Table Of Contents

1. [ About GCMM. ](#about)
2. [ Folder Structure ](#structure)
3. [ Installation Guide ](#guide)
4. [ Screenshot ](#screenshot)

<a name="about"></a>
## About GCMM

 Golden City Model management is an African Premium modeling agency in Lagos Nigeria.
 
 Web App for [Golden City Model Management](https://www.instagram.com/goldencitymodelsng/channel/).

 Deploys at [GCMM](https://goldencitymodelsng.netlify.app)
 
 
 
<a name="structure"></a>
## Folder Structure

> Admin

> Client

> Server

### **Admin** 
  - Micro Frontend of the application.
  - Contains all code relating to the Frontend accessible only by administrative users.
  - Bootstrapped with Next.js, Material UI and written in Typescript.
  
### **Client**
  - Main Frontend Application
  - Contains all the code relating to the frontend accessible by anyone
  - Bootstrapped with Next.js, Material UI and written in Typescript.

### **Server**
  - Contains all code relating to the Application Programming Interface used by the Frontend.
  - Bootstrapped with Express.js and written in Javascript.
  
  
  
<a name="guide"></a>
## Installation Guide
This is a Monorepo.

### Requirements to run project locally

- Git
- Yarn
- Node 

## Admin Directory 

After cloning into the repository, in your terrminal, cd into the admin directory and run yarn install to install the required dependencies.
```
cd admin && yarn install
```
#### Starting The Development Server

Run yarn dev to start the project on localhost:4000
```
yarn dev
```
#### Available Scripts
```
"dev": "next dev -p 4000",
"build": "next build",
"start": "next start",
"export": "next export",
"cypress:dev": "cypress open",
"cypress:ci:e2e": "cypress run",
"cypress:ci:component": "cypress run --component",
```
**All Cypress scripts are for testing. Cypress:ci scripts run cypress in headless mode.**

## Client Directory 

```
cd client && yarn install
```
#### Starting The Development Server

Run yarn dev to start the project on localhost:2001
```
yarn dev
```
#### Available Scripts
```
"dev": "next dev -p 2001",
"build": "next build",
"start": "next start",
"export": "next export",
"cypress:dev": "cypress open",
"cypress:ci:e2e": "cypress run",
"cypress:ci:component": "cypress run --component",
```
**All Cypress scripts are for testing. Cypress:ci scripts run cypress in headless mode.**

## Server Directory 

```
cd server && npm install 
```
#### Starting The Development Server

Run npm run dev to start the project on localhost:9876
```
npm run dev
```
#### Available Scripts
```
"start": "node ./bin/www",
"dev": "nodemon ./bin/www",
"debug": "ndb ./bin/www"
```
<a name="screenshot"></a>
### ScreenShot

![image](https://user-images.githubusercontent.com/70432518/185256839-7fffa6e4-0beb-4bd0-9d14-8bb8464b2a2f.png)
