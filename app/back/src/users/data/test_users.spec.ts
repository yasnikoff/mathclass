import { UserDto } from '../../utils';
import { getUserPassword } from './test_users';

describe('getUserPassword', () => {
  it('should return password for existing user', () => {
    const user = new UserDto();
    user.username = 'anna';
    const pass = getUserPassword(user);
    expect(pass).toEqual('annaspass');
  });
});
