# Chitter API Frontend Challenge

## About

A small Twitter clone that allows users to post messages to a public stream, using the API given here: [documentation](https://github.com/makersacademy/chitter_api_backend). 

## Instructions

### Getting started

1. Clone the repository:

```
$ git clone https://github.com/emilyalice2708/chitter-front-end
```

2. Move into the main directory:

```
$ cd chitter-front-end
```

3. Run npm install:

```
$ npm install
```

4. Start the server:

```
$ npm start
```

### Usage
Visit http://localhost:8080/ in the browser. Users must sign up and sign in before posting a peep.

## Planning

### User Stories
```
As a user,
So that I can see what people have been saying,
I'd like to see all peeps.
```
```
As a user,
So that I can focus on something my friend said,
I'd like to view an individual peep.
```
```
As a user,
So that I can have my own handle,
I'd like to sign up.
```
```
As a user,
So that I can interact with my friends as me,
I'd like to sign in.
```
```
As a user,
So that I can say what's been on my mind,
I'd like to post my own peep.
```
```
As a user,
So that I can see the most popular peeps,
I'd like to see the like count on each peep.
```
## Process

This is a re-do of the Makers week 4 frontend-api weekend challenge. This program allows the user to view all peeps, individual peeps, sign up, sign in and post new peeps.

### Personal Goals
- Correctly mock an API using Jest.

### Original specification:
- Creating Users
- Logging in
- Posting Peeps
- Viewing all Peeps
- Viewing individual Peeps
- Deleting Peeps
- Liking Peeps
- Unliking Peeps

### Steps taken

1. Viewing all Peeps
- Begin with the simplest function to fetch and display all peeps on the home page.
- Create a peep view controller responsible for fetching the data
- Create a peep view class responsible for iterating over peeps and rendering the peep list.

2. Implement sign-up functionality
- Create a user controller responsible for sending a post request to create user and either welcoming successful signups or rendering error messages.

3. Allow users to log in
- Create a sessions controller responsible for sending a post request to create a session and either welcoming successful logins or rendering error messages.
- Should trigger the rendering of a post form so that logged in users can post thier own peeps.

4. Allow users to post peeps

## Resources
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
