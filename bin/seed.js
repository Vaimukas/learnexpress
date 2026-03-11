import { prisma } from '../lib/prisma.js';
import { faker } from '@faker-js/faker';

for (let i = 0; i < 10; i++) {
await prisma.cat.create({
  data: {
    name: faker.animal.petName(),
    birthyear: faker.number.int({ min: 1990, max: 2026 }),
    gender: faker.person.sex(),
    color: faker.color.human(),
    eyes: faker.color.human(),
    spayed: Math.round(Math.random()) === 1 
  },
});
}