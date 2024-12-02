import { User } from '../types/auth';
import fs from 'fs';
import path from 'path';

const USERS_FILE = 'users.json';

export const saveUser = (user: User) => {
  try {
    let users: User[] = [];
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      users = JSON.parse(data);
    }
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Error al guardar el usuario');
  }
};

export const findUser = (identifier: string): User | undefined => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      const users: User[] = JSON.parse(data);
      return users.find(user => 
        user.email === identifier || user.phoneNumber === identifier
      );
    }
    return undefined;
  } catch (error) {
    console.error('Error finding user:', error);
    return undefined;
  }
};