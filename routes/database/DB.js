const express = require ("express");
const clint=require('../../clint');
const router = express.Router();




router.get ('/getbooks',(req,res,next)=>{
    try{
    const sql = "SELECT * FROM table_one";
    clint.query(sql).then((data)=>{
        res.status(200).send(data.rows);

    }).catch((e)=> next("something went wrong" + e)); 
    }
    catch(e){
        next(`Can't Get Books :( ${e}`);

    }

})
router.post("/addbook",(req, res ,next) => {
    try{
  console.log("yout home");
  let title=req.body.title; 
  let image=req.body.image;
  let description=req.body.description;
  let rating=req.body.rating;
  let price=req.body.price;
  let author=req.body.author;
  let category=req.body.category;
  let yo = 'INSERT INTO table_one (title, image, description ,rating ,price,author,category) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  clint.query(yo, [title, image, description ,rating ,price,author,category]).then(() => {
        res.status(201).send('book added succcful :)');
      }).catch((e)=> next("something went wrong" + e));
   
  res.send(req.body);
  }
catch(e){
next(`${e}`);
}});


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

    router.put("/UPDATE/:id", (req, res,next) => {
        try {
        console.log("asd");
      let {id} = req.params;
    //   let title=req.body.title; 
    //   let image=req.body.image;
      let rating=req.body.rating; //, image=2, description=$3 ,rating=$4,price=$5,author=$6,category=$7 WHERE
    //   let price=req.body.price;
    //   let author=req.body.author;
    //   let category=req.body.category;
      let sql =  `UPDATE table_one SET rating=$1 Where id=${id}`;
      clint.query(sql,[rating ]).then(() => {
        res.status(200).send("updated successfully");
      }).catch((e)=> next("something went wrong" + e));
    }
    catch (e) {
        next("something went wrong" + e);
      }

});




module.exports=router;