# Chapter-chasers Backend

## overview

 This web service is made to fetch the books using google api and to generate a random quotes.

---

## How to use

1. clone this repo to your machine using **`git clone git@github.com:Chapter-Chasers/Back-end.git`**
2. install the required debendices using **`npm i`**
3. create a **`.env`** file and add the url of your api's like the one in the **`.env.sample`** .
run this on your terminal **`nodemon server.js or npm server.js`** you should see server runs on port (number of port)


---

## Endpoints

- `/allBooks` a get method to fetch a list of books .

- `/search` a get method that search for a book basedon it's title or on isbn .
  - to search for title provide the body with a json format `"title":"Harry Potter"` .
  - to get a book based on isbn use the query `isbn` .
- `/searchAuthor` a get method to search for an author using query `author` .
- `/searchCategory` a get method to search for a category using query `cat` .

- `/quote` a get method to get a random quote .
