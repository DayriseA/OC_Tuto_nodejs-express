const fs = require('fs');

const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  
  delete thingObject._id;
  delete thingObject._userId; // Never trust the client
  
  const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  thing.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })});
};

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};


exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body};
  
  delete thingObject._userId;

  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (thing.userId != req.auth.userId) {
        res.status(403).json({ error: 'Requête non autorisée' });
      } else {
        if (req.file) {
          const oldFilename = thing.imageUrl.split('/images/')[1];
          fs.unlink(`images/${oldFilename}`, (err) => {
            if (err) console.log(err);
          });
        }
        Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch(error => res.status(400).json({ error }));
};

// exports.deleteThing = (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id})
//     .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//     .catch(error => res.status(400).json({ error }));
// };
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (thing.userId != req.auth.userId) {
        res.status(403).json({ error: 'Requête non autorisée' });
      } else {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};