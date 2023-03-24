# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user = User.first
if user
  # user.exercises.create(name: 'Bench press', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu efficitur nisi. Aenean sit amet efficitur risus. Mauris mattis elit eget mollis sagittis. Phasellus non lacus a mi vulputate pellentesque eu nec leo. Etiam pulvinar tortor sed velit suscipit, sit amet efficitur diam rutrum. Aliquam eget luctus nulla. Quisque scelerisque odio at magna tristique facilisis. Etiam vulputate lobortis placerat. Quisque eu laoreet ligula, eu facilisis felis. Mauris tristique, elit ut pellentesque rhoncus, leo diam convallis augue, ut tempor augue neque molestie nulla. Suspendisse volutpat pharetra orci non facilisis. Aenean sollicitudin leo enim, vel hendrerit turpis fringilla sed.')
  # user.exercises.create(name: 'OHP', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu efficitur nisi. Aenean sit amet efficitur risus. Mauris mattis elit eget mollis sagittis. Phasellus non lacus a mi vulputate pellentesque eu nec leo. Etiam pulvinar tortor sed velit suscipit, sit amet efficitur diam rutrum. Aliquam eget luctus nulla. Quisque scelerisque odio at magna tristique facilisis. Etiam vulputate lobortis placerat. Quisque eu laoreet ligula, eu facilisis felis. Mauris tristique, elit ut pellentesque rhoncus, leo diam convallis augue, ut tempor augue neque molestie nulla. Suspendisse volutpat pharetra orci non facilisis. Aenean sollicitudin leo enim, vel hendrerit turpis fringilla sed.')
  # user.exercises.create(name: 'Barbell curl', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu efficitur nisi. Aenean sit amet efficitur risus. Mauris mattis elit eget mollis sagittis. Phasellus non lacus a mi vulputate pellentesque eu nec leo. Etiam pulvinar tortor sed velit suscipit, sit amet efficitur diam rutrum. Aliquam eget luctus nulla. Quisque scelerisque odio at magna tristique facilisis. Etiam vulputate lobortis placerat. Quisque eu laoreet ligula, eu facilisis felis. Mauris tristique, elit ut pellentesque rhoncus, leo diam convallis augue, ut tempor augue neque molestie nulla. Suspendisse volutpat pharetra orci non facilisis. Aenean sollicitudin leo enim, vel hendrerit turpis fringilla sed.')
  # user.exercises.create(name: 'Tricep extension', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu efficitur nisi. Aenean sit amet efficitur risus. Mauris mattis elit eget mollis sagittis. Phasellus non lacus a mi vulputate pellentesque eu nec leo. Etiam pulvinar tortor sed velit suscipit, sit amet efficitur diam rutrum. Aliquam eget luctus nulla. Quisque scelerisque odio at magna tristique facilisis. Etiam vulputate lobortis placerat. Quisque eu laoreet ligula, eu facilisis felis. Mauris tristique, elit ut pellentesque rhoncus, leo diam convallis augue, ut tempor augue neque molestie nulla. Suspendisse volutpat pharetra orci non facilisis. Aenean sollicitudin leo enim, vel hendrerit turpis fringilla sed.')

  workouts = [
    { title: 'Thursday', sessions: [
      { exercise_name: 'Bench press', sets: [{weight: 50, reps: 15}, {weight: 50, reps: 13}, {weight: 50, reps: 10}]},
      { exercise_name: 'OHP', sets: [{weight: 30, reps: 8}, {weight: 30, reps: 8}, {weight: 30, reps: 7}]},
      { exercise_name: 'Tricep extension', sets: [{weight: 20, reps: 10}, {weight: 20, reps: 9}, {weight: 15, reps: 25}]},
    ] }
  ]

  workouts.each do |workout|
    workout_obj = Workout.create(title: workout[:title], user: user)

    workout[:sessions].each do |session|
      session_obj = Session.create(workout: workout_obj, rest_time: 120, exercise: Exercise.find_by(name: session[:exercise_name]))

      session[:sets].each do |set|
        Series.create(reps: set[:reps], weight: set[:weight], session: session_obj, note: 'Lorem Ipsum dolor sit amet.')
      end
    end
  end
end
