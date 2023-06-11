import { Data, fromData, UserDto, UserRole } from '../../utils';
import avatars from './avatars';

export const usersData: (Data<UserDto> & {
  password: string;
})[] = [
  {
    id: '647d277382a9f61a42ed398b',
    username: 'john',
    password: 'johnspass',
    role: UserRole.Teacher,
    email: 'john@example.com',
    avatar: avatars.john,
  },
  {
    id: '647d27d982a9f61a42ed398c',
    username: 'maria',
    password: 'mariaspass',
    role: UserRole.Student,
    email: 'maria@example.com',
    avatar: avatars.maria,
  },
  {
    id: '647d20d082a9f61a42ed398a',
    username: 'anna',
    password: 'annaspass',
    role: UserRole.Student,
    email: 'anna@example.com',
    avatar: avatars.anna,
  },
];

export default usersData
  .map((user) => ({ ...user }))
  .map((user) => (delete user.password, user))
  .map((user) => fromData(UserDto, user));

export function getUserPassword(user: UserDto) {
  return usersData.find((userData) => userData.username === user?.username)
    ?.password;
}
