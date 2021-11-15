const router = require('express').Router();
const Workout = require('../models/workout');

router.post('/api/workouts', ({ body }, res) => {
    Workout.create({ body })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err);
        });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        { _id: params.id, },
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/api/workouts', (req, res) => {
    Workout.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.find({}).sort({ date: -1 }).limit(7)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err);
        });
});

router.delete('/api/workouts', ({ body }, res) => {
    Workout.remove({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        });
});

module.exports = router;