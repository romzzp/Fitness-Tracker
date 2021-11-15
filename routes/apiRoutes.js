const router = require('express').Router();
const Workout = require('../models/workout');


router.post('/api/workouts', async ({ body }, res) => {
    try {
        // create entry in db
        const workoutData = await Workout.create({});
        res.status(200).json(workoutData)
    }
    catch (err) {
        res.status(400).json(err)
    }
});

router.put('/api/workouts/:id', async ({ body, params }, res) => {
    try {
        const workoutData = await Workout.findByIdAndUpdate(
            params.id,
            { $push: { exercises: body } },
            { new: true }
        )
        res.status(200).json(workoutData);
    }
    catch (err) {
        res.json(err);
    };
});

router.get('/api/workouts', async (req, res) => {
    try {
        const workoutData = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    }
                }
            }
        ])
        res.status(200).json(workoutData)
    } catch (err) {
        res.status(400).json(err)
    }
});

router.get('/api/workouts/range', async (req, res) => {
    try {
        const workoutData = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    }
                }
            }
        ]).sort({ _id: -1 }).limit(7)
        workoutData.reverse()
        res.status(200).json(workoutData)
    } catch (err) {
        res.status(400).json(err)
    }
});


module.exports = router;