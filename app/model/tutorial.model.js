const sql = require("./db.js");

const Tutorial = function(tutorial){ //เป็นฟังก์ชั่นปกติ anonymus ไม่มีชื่อ 
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newTutorial});
    });
};

Tutorial.getAll = (title, result) => {  //เป็นฟังก์ชั่น arrow
    let sqltext = "SELECT * FROM tutorials";

    sql.query(sqltext, (err, res) => {
        if(err){
            console.log("error: ", err)
            result(null, err);
            return;
        }

        console.log("tutorials: ", res);
        result(null, res);
    });
};

Tutorial.findbyid = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ` + id, (err, res) => {           //เป็นฟังชั่น (ประมวลผลใน,แรก ตามด้วย,สองที่เป็นcallback)
        if(err){
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

Tutorial.getAllPubilshed = result => {
    sql.query(`SELECT * FROM tutorials WHERE published = true `, (err, res) => {
        if(err){
            result(null, err);
            return;
        }

        result(null, res);
    });
};


Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
        if(err){
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        result(null, res)
    });
};

module.exports = Tutorial;