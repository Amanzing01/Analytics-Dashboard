import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from './models/User.js';
import Routine from './models/Routine.js';
import Survey from './models/Survey.js';



try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('🛢️ Connected to MongoDB');

  await User.deleteMany({});
  await Routine.deleteMany({});
  await Survey.deleteMany({});
  console.log('Cleared existing data');

  const genders = ['Male', 'Female', 'Other'];
  const skinTypes = ['Dry', 'Normal', 'Oily', 'Combination', 'Unknown'];
  const categories = ['Product Feedback', 'Market Trends', 'Brand Perception', 'Other'];
  const statuses = ['Active', 'Draft', 'Closed'];

  const users = [];

  for (let i = 0; i < 230; i++) {
    users.push(
      new User({
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(genders),
        age: faker.number.int({ min: 18, max: 60 }),
        skinType: faker.helpers.arrayElement(skinTypes)
      })
    );
  }

  await User.insertMany(users);
  console.log('Seeded Users');

  const routines = [];

  for (let i = 0; i < 567; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    routines.push(
      new Routine({
        userId: randomUser._id,
        name: faker.commerce.productAdjective() + ' Routine',
        products: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
          faker.commerce.productName()
        )
      })
    );
  }

  await Routine.insertMany(routines);
  console.log('Seeded Routines');

  const surveys = [];

  for (let i = 0; i < 10; i++) {
    const startDate = faker.date.between({ from: '2025-05-01', to: '2025-06-10' });
    const endDate = faker.date.between({ from: startDate, to: new Date(startDate.getTime() + 5 * 86400000) });

    surveys.push(
      new Survey({
        code: `SURV-${faker.number.int({ min: 1000, max: 9999 })}`,
        surveyName: faker.company.catchPhrase(),
        category: faker.helpers.arrayElement(categories),
        status: faker.helpers.arrayElement(statuses),
        startDate,
        endDate,
        respondents: faker.number.int({ min: 100, max: 1000 }),
        cost: faker.number.int({ min: 5000, max: 30000 })
      })
    );
  }

  await Survey.insertMany(surveys);
  console.log('Seeded Surveys');
} catch (error) {
  console.error('Seeding error:', error);
} finally {
  await mongoose.connection.close();
  console.log('✅ Done Seeding & Disconnected from MongoDB');
}
