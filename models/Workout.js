const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    WorkoutTitle: {
        type: String,
        required: true,
        unique: true,
    },
    WorkoutDescription: {
        type: String,
        required: false
    },
    WorkoutLevel: {
        type: String,
        required: false
    },
    Location: {
        type: String,
        required: false
    },
    Goal: {
        type: String,
        required: false
    },
    WorkoutMainMuscleWorked: {
        type: String,
        required: false
    },
    WorkoutOtherMuscleWorked: {
        type: String,
    },
    Gender: {
        type: String,
        required: false
    },
    Exercise: [
        {
            ExerciseTitle: {
                type: String,
                required: true,
                unique: true,
            },
            ExerciseDescription: {
                type: String,
                required: false,
            },

            ExerciseCategory: {
                type: String,
                required: false
            },
            Type: {
                type: String,
                required: false
            },
            MainMuscleWorked: {
                type: String,
                required: false
            },
            OtherMuscleWorked: {
                type: String,
            },
            Equipment: {
                type: String,
            },
            MechanicsType: {
                type: String,
            },
            Level: {
                type: String,
                required: false
            },
            Sport: {
                type: String,
            },
            Force: {
                type: String,
            },
            VideoTitle: {
                type: String,
            },
            VideoURL: {
                type: String,
            },
            Image: {
                type: String,
            },
            Date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],

    Date: {
        type: Date,
        default: Date.now(),
    },
},
    {
        timestamps: true
    }
);

module.exports = Workout = mongoose.model('workout', WorkoutSchema);