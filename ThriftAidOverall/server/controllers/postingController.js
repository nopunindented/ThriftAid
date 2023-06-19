const ListofPostings = require("./models/Posting");

module.exports.CreatePosting = async (req, res) => {
  var postinginfo = req.body;
  if (!postinginfo || !postinginfo.thriftstore || !postinginfo.address || !postinginfo.pickupdate || !postinginfo.timeofposting) {
    console.log("Error: Input body empty or all fields not entered");
    return res.status(400).send("Input body empty or all fields not entered");
  }

  postinginfo.fromThriftStore = req.user.thriftstorename;
  var posting_made = new ListofPostings(postinginfo);

  await posting_made.save(function (err, document) {
    if (err) {
      console.log("Error: Mongo Create Posting Failed: ", err.message);
      res.status(400).send("Mongo Create Posting Failed");
    } else {
      console.log("Mongo Posting successfully created");
      res.status(200).send("Mongo Posting successfully created");
    }
  });
}

module.exports.OnePosting = async (req, res) => {
    var singlePost = await ListofPostings.findById(req.params.id);
    if (singlePost) {
      res.status(200).json(singlePost);
    } else {
      res.status(400).send("No post found!");
    }
}

module.exports.DeletePost = async (req, res) => {
  await ListofPostings.findByIdAndDelete(req.body.id);
  res.sendStatus(204);
}

module.exports.GetPostings = async (req, res) => {
  var all = await ListofPostings.find();
  return res.status(200).json(all);
}