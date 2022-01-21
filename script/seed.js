
const axios = require('axios');
const res = require('express/lib/response');
const { user } = require('pg/lib/defaults');


const {db, models: {User, Player} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  let playerArray = [];
  const players = async () => {
  try {
    for (let i = 1; i <= 38; i++) {
      let eachPage = await axios.get(`https://www.balldontlie.io/api/v1/players?page=${i}&per_page=100`);
      let playersData = eachPage.data.data;
      playerArray = playerArray.concat(playersData);
    }
    return playerArray;
  } catch (error) {
    console.log(error);
  }
}
  await players();
  const promisedArray = await Promise.all(playerArray);

  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

   const x = promisedArray.map((playersApi => {
    return Player.create({
      playerId: playersApi.id,
      firstName: playersApi.first_name,
      lastName: playersApi.last_name,
      position: playersApi.position,
      team: playersApi.team.full_name
    })
  }))

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: 'cody@banana.com' }),
    User.create({ username: 'murphy', password: '123', email: 'murf@gg.com' }),
  ])
  console.log(Object.keys(User.prototype))

  await Promise.all(users.map((user)=>
      user.addPlayer(x[Math.floor(Math.random() * x.length)])
    ))

  // await users[0].addPlayer({playerId: 1, firstName: "Lebron", lastName: "James", position: "SF", team: "Lakers"})
  // await users[0].addPlayer(promisedArray[2])
  // await users[0].addPlayer(promisedArray[3])
  // await users[0].addPlayer(promisedArray[4])
  // await users[0].addPlayer(promisedArray[5])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
