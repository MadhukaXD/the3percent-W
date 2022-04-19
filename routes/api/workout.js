const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Workout = require('../../models/Workout');

// @route   POST api/workout
// @desc    Create workout
// @access  Public
router.post('/', [
    check('WorkoutTitle', 'WorkoutTitle is required')
        .not()
        .isEmpty(),
],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const {
            WorkoutTitle,
            WorkoutDescription,
            WorkoutLevel,
            Location,
            Goal,
            WorkoutMainMuscleWorked,
            WorkoutOtherMuscleWorked,
            Gender,
            Exercise
        } = req.body;

        const workoutsFields = {};
        if (WorkoutTitle) workoutsFields.WorkoutTitle = WorkoutTitle;
        if (WorkoutDescription) workoutsFields.WorkoutDescription = WorkoutDescription;
        if (WorkoutLevel) workoutsFields.WorkoutLevel = WorkoutLevel;
        if (Location) workoutsFields.Location = Location;
        if (Goal) workoutsFields.Goal = Goal;
        if (WorkoutMainMuscleWorked) workoutsFields.WorkoutMainMuscleWorked = WorkoutMainMuscleWorked;
        if (WorkoutOtherMuscleWorked) workoutsFields.WorkoutOtherMuscleWorked = WorkoutOtherMuscleWorked;
        if (Gender) workoutsFields.Gender = Gender;
        if (Exercise) workoutsFields.Exercise = Exercise;


        try {
            let workout = await Workout.findOne({ WorkoutTitle });

            if (workout) {

                workout = await Workout.findOneAndUpdate(
                    { WorkoutTitle: WorkoutTitle },
                    { $set: workoutsFields },
                    { new: true }
                );

                return res.json("Workout Successfully updated");
            }


            // create 
            workout = new Workout(workoutsFields);

            await workout.save();

            res.json("New Workout Successfully added");

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')
        }
    });

// @route   Get api/workouts
// @desc    Get all workouts
// @access  Public

router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ date: -1 });
        res.json(workouts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   Get api/exercise/:id
// @desc    Get Workout by id
// @access  Public

router.get('/:id', async (req, res) => {
    try {
        //const id = req.params.id;

        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ msg: 'Workout not found' });

        }
        res.json(workout);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Workout not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/exercise/:exercise
// @desc    Delete a exercise
// @access  Public

router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ msg: 'Exercise not found' });
        }

        await workout.remove();

        res.json({ msg: 'Workout deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;