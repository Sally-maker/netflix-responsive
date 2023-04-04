const routes = require("express").Router()
const Movie = require("../models/Movie")
const verify = require("../../verifyToken")


routes.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
  

routes.put("/:id", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const updateUser = await Movie.findByIdAndUpdate(
               req.params.id, 
              {
               $set: req.body
              },
               {new: true}
            )
            res.status(200).json(updateUser) 
        } catch (error) {
            res.status(500).json(err); 
        }
    } else {
        res.status(403).json("You can update only your account!");
    }
    
})


routes.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("The Movie has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
  
  
routes.get("/find/:id", verify, async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
});

routes.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const Movies = await Movie.find();
        res.status(200).json(Movies);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

routes.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie 
   try {
       if(type === "series") {
          movie = await Movie.aggregate([
              { $match: { isSeries: true }},
              { $sample: { size: 1 } }
          ])
       } else {
         movie = await Movie.aggregate([
              { $match: { isSeries: false }},
              { $sample: { size: 1 } }
          ])
       }
       res.status(200).json(movie)
   } catch (error) {
       res.status(500).json(error)
   }
  });
  
module.exports = routes