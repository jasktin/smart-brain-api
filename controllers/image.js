const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: '30b99d22164847759d4b066fa4769302'
});

const handleApiCall = (req, res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => {
        console.log(entries);
        res.json(entries)
    })
    .catch(err => res.status(400).json('unable to get entries')) 
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}