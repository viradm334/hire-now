const { faker } = require('@faker-js/faker');

export function createRandomUser() {
    return {
      username: faker.internet.username(), // before version 9.1.0, use userName()
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
  
  export const users = faker.helpers.multiple(createRandomUser, {
    count: 5,
  });