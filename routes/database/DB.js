const express = require("express");
const clint = require('../../clint');
const router = express.Router();
// const axios = require("axios");
// const express = require("express");

// const DB = new pg.Client('postgres://chapter_chasers_user:S4qG9dcGm3Je5hyWFUbD9NLTX97JbPVK@dpg-ciuiha5iuiedpv0a0jo0-a.oregon-postgres.render.com/chapter_chasers?ssl=true');


router.get('/getbooks', (req, res, next) => {
  try {
    const sql = "SELECT * FROM table_one";
    clint.query(sql).then((data) => {
      res.status(200).send(data.rows);

    }).catch((e) => next("something went wrong" + e));
  }
  catch (e) {
    next(`Can't Get Books :( ${e}`);

  }

})
router.post("/addbook", (req, res, next) => {
  try {
    console.log("yout home");
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const rating = req.body.rating;
    const price = req.body.price;
    const author = req.body.author;
    const category = req.body.category;
    const sql = 'INSERT INTO table_one (title, image, description ,rating ,price,author,category) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    clint.query(sql, [title, image, description, rating, price, author, category]).then(() => {
      res.status(201).send('book added succcful :)');
    }).catch((e) => next("something went wrong" + e));

    // res.send(req.body);
  }
  catch (e) {
    next(`${e}`);
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let sql = `DELETE FROM table_one WHERE id =${id}`;
    let data = await clint.query(sql);
    // console.log(data);
    res.status(204).end();
  } catch (e) {
    next("deletebook " + e);
  }
});
router.put('/update/:state/:id', (req, res, next) => {
  try {
    const { id, state } = req.params;
    const sql = `update table_one set state = $2 where id = $1`;
    clint.query(sql, [id, state]).then(() => {
      res.status(202).send(`updated Successfully`)
    }).catch((e) => {
      next(`Error on updating ${e}`)
    })
  } catch (error) {
    next(`Error in server ${error}`);
  }
})
router.put("/update/:id", (req, res, next) => {
  try {
    console.log("asd");
    let { id } = req.params;
    //   let title=req.body.title; 
    //   let image=req.body.image;
    let rating = req.body.rating; //, image=2, description=$3 ,rating=$4,price=$5,author=$6,category=$7 WHERE
    //   let price=req.body.price;
    //   let author=req.body.author;
    //   let category=req.body.category;
    let sql = `UPDATE table_one SET rating=$1 Where id=${id}`;
    clint.query(sql, [rating]).then(() => {
      res.status(200).send("updated successfully");
    }).catch((e) => next("something went wrong" + e));
  }
  catch (e) {
    next("something went wrong" + e);
  }

});




module.exports = router;