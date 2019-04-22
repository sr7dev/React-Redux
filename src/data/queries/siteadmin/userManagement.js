import UserMangementType from '../../types/siteadmin/UserManagementType';
import { User, UserLogin, UserClaim, UserProfile } from '../../../data/models';
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
const userManagement = {
  type: new List(UserMangementType),
  async resolve({ request, response }) {
    if (request.user && request.user.admin == true) {
      // Get All User Profile Data
      const usersData = await User.findAll({
        attributes: ['id', 'email', 'userBanStatus'],
        profile: {
          attributes: [
            'profileId',
            'firstName',
            'lastName',
            'dateOfBirth',
            'gender',
            'phoneNumber',
            'preferredLanguage',
            'preferredCurrency',
            'location',
            'info'
          ]
        },
        include: [
          { model: UserProfile, as: 'profile' },
        ]
      });
      return usersData;
    }
  },
};
export default userManagement;
