import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './src//db';
import { Event } from './src//models/Event';
import { Personality } from './src//models/personality';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing old data...');
    await Event.deleteMany();
    await Personality.deleteMany();

    console.log('🌱 Seeding Personalities...');
    await Personality.insertMany([
      {
        name: 'Bohdan Khmelnytsky',
        birthYear: 1595,
        deathYear: 1657,
        description: 'Hetman of the Zaporozhian Host who led the uprising against Poland.',
        notableWorks: ['Cossack Hetmanate'],
      },
      {
        name: 'Lesya Ukrainka',
        birthYear: 1871,
        deathYear: 1913,
        description: 'Ukrainian poet and writer, major figure in Ukrainian literature.',
        notableWorks: ['Forest Song', 'Contra spem spero'],
      },
      {
        name: 'Ivan Franko',
        birthYear: 1856,
        deathYear: 1916,
        description: 'Ukrainian writer, poet, philosopher, and political activist.',
        notableWorks: ['Zahar Berkut', 'Moses'],
      },
    ]);

    console.log('📌 Seeding Events...');
    await Event.insertMany([
      {
        title: 'Battle of Konotop',
        year: 1659,
        description: 'A significant battle between the Cossacks and the Tsardom of Russia.',
        location: 'Konotop, Ukraine',
      },
      {
        title: 'Proclamation of Independence of Ukraine',
        year: 1991,
        description: 'Ukraine declared independence from the Soviet Union.',
        location: 'Kyiv, Ukraine',
      },
      {
        title: 'Orange Revolution',
        year: 2004,
        description: 'A series of protests and political events in Ukraine in response to election fraud.',
        location: 'Kyiv, Ukraine',
      },
    ]);

    console.log('✅ Database Seeded Successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
