const Tutorial = require("../model/tutorial.model.js");

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const tutorial = new Tutorial({      
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    Tutorial.create(tutorial, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred!!"
            });
        }else{
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;

    Tutorial.getAll(title, (err, data) => { // ฟังก์ชั่น,callback, 
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        }else{
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findbyid(id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: "Not_found tutorial with id " + id 
                });
            }else{
                res.status(500).send({
                    message: "Error tutorial with id" + id
                });
            }
        }else{
            res.send(data);
        }
    })                                           
};

exports.findAllPublished = (req, res) => {
   Tutorial.getAllPubilshed((err, data) => {
    if(err){
        res.status(500).send({
            message: err.message || "Some error occurred!"
        });
    }else{
        res.send(data);
    }
   });
};
exports.update = (req, res) => {
    res.send({message: "update"});
};

exports.delete = (req, res) => {
    const id = req.params.id;
   Tutorial.remove(id, (err, data) => {
        if(err){
            if(err.kind === 'not_fond'){
                res.status(404).send({
                    message: "Not found!"
                });
            }else{
                res.status(500).send({
                    message: "Could not delete id " + id
                });
            }
        }else{
            res.send({message: "Deleted successfully"});
        }
   });
};

exports.deleteAll = (req, res) => {
    res.send({message: "deleteAll"});
};