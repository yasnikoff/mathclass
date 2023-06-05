import { Data, fromData, User, UserRole } from '../../utils';

export const usersData: (Data<User> & { password: string })[] = [
  {
    id: 1,
    username: 'john',
    password: 'johnspass',
    role: UserRole.Teacher,
    email: 'john@example.com',
  },
  {
    id: 2,
    username: 'maria',
    password: 'mariaspass',
    role: UserRole.Student,
    email: 'maria@example.com',
  },
  {
    id: 3,
    username: 'anna',
    password: 'annaspass',
    role: UserRole.Student,
    email: 'anna@example.com',
  },
];

export default usersData
  .map((user) => ({ ...user }))
  .map((user) => (delete user.password, user))
  .map((user) => fromData(User, user));

export function getUserPassword(user: User) {
  return usersData.find((userData) => userData.username === user?.username)
    ?.password;
}
