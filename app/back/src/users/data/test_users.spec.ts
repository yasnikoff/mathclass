import { User } from '../../utils';
import { getUserPassword } from './test_users';

describe('getUserPassword', () => {
  it('should rurn password for existing user', () => {
    const user = new User();
    user.username = 'anna';
    const pass = getUserPassword(user);
    expect(pass).toEqual('annaspass');
  });
});
