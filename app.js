

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const cont = require("./content");
// let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// MongoDB
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {

  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: cont.homeStartingContent,
      posts: posts
    });
  });

});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: cont.aboutContent
  })
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: cont.contactContent
  })
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {

  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };

  // posts.push(post);

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });

});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    const storedContent = post.content;

    if (storedTitle === requestedTitle) {

      res.render("post", {
        title: post.title,
        content: post.content
      });

    }
  });

});







app.listen(3000, function () {
  console.log("Server started on port 3000");
});
