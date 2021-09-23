"use strict";

const {
  db,
  models: { User, Product, Review, ProductInCart },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "cody.123@gmail.com",
      isAdmin: true,
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "IAMTHELAW@icloud.com",
    }),
    User.create({
      username: "emma",
      password: "123",
      email: "outoffakeemails@oops.edu",
    }),
    User.create({
      username: "admin",
      password: "123",
      email: "admin@devcart.org",
    }),
  ]);

  //console.log(`seeded ${users.length} users`);

  const products = await Promise.all([
    Product.create({
      name: "Dr Pepper",
      price: 1.05,
      description: "The elixir of life",
      imageUrl:
        "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00078000082609/2cfe7e1cbbefc0ef6d35314f737fa83c_large.png&width=256&type=webp&quality=80",
    }),
    Product.create({
      name: "Mango Smoothie",
      price: 5.99,
      description:
        "A sweet treat for you and your pet amphibian. Best served cold!",
      imageUrl:
        "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00071464309510/ff0688003e7ee1cae2c8c99fe9d11ba2_large.png&width=256&type=webp&quality=80",
    }),
    Product.create({
      name: "Mystery Drink",
      price: 8.0,
      description:
        "Bedazzle your pallette with our beverage scientists' choice selection for the week!",
    }),
    Product.create({
      name: "Actual Dinosaur Tears",
      price: 420.69,
      description: "Don't ask where I got this from I won't tell you.",
      imageUrl:
        "https://ih1.redbubble.net/image.1917505123.8684/flat,128x,075,f-pad,128x128,f8f8f8.jpg",
    }),
    Product.create({
      name: "Blue stuff under my sink",
      price: 0.01,
      description: "Wait you aren't seriously considering buying this are you",
      imageUrl:
        "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00041505812033/16d59e5810daa3576ba63b9df6a07eef_large.png&width=256&type=webp&quality=80",
    }),
  ]);

  //console.log(`seeded ${products.length} products`);

  const reviews = await Promise.all([
    Review.create({
      userId: 1,
      productId: 1,
      rating: 5,
      content: "OH MY GOD MY MOUTH CRIES TEARS OF JOY",
    }),
    Review.create({
      userId: 3,
      productId: 1,
      rating: 4,
      content:
        "I don't care how good this tastes, I refuse to rate 5 stars on principle. Fite me.",
    }),
    Review.create({
      userId: 2,
      productId: 4,
      rating: 2,
      content: "I now know what regret tastes like. bad.",
    }),
    Review.create({ userId: 2, productId: 5, rating: 1, content: "hbelp" }),
    Review.create({
      userId: 3,
      productId: 5,
      rating: 3,
      content: "It's growing on me. WHY IS IT GROWING ON ME",
    }),
    Review.create({
      userId: 1,
      productId: 2,
      rating: 1,
      content: "I wanted grape flavor >:(",
    }),
  ]);

  //console.log(`seeded ${reviews.length} reviews`)

  const exampleCart = await Promise.all([
    ProductInCart.create({ userId: 1, productId: 2, quantity: 6 }),
    ProductInCart.create({ userId: 1, productId: 1, quantity: 1 }),
    ProductInCart.create({ userId: 1, productId: 4, quantity: 2 }),
    ProductInCart.create({ userId: 2, productId: 1, quantity: 6 }),
    ProductInCart.create({ userId: 2, productId: 2, quantity: 6 }),
    ProductInCart.create({ userId: 2, productId: 3, quantity: 6 }),
    ProductInCart.create({ userId: 3, productId: 4, quantity: 6 }),
    ProductInCart.create({ userId: 4, productId: 4, quantity: 6 }),
  ]);

  //console.log("user 1 cart generated")

  //console.log(`seeded successfully!`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      emma: users[2],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
