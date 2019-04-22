// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import userEditProfileType from '../types/userEditProfileType';

// Sequelize models
import {User, UserLogin, UserClaim, UserProfile, AdminUser} from '../../data/models';

// Helper
import {capitalizeFirstLetter} from '../../helpers/capitalizeFirstLetter';

const userEditProfile = {

  type: userEditProfileType,

  args: {
    firstName: { type: StringType },
    lastName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { type: new NonNull(StringType) },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    loggedinEmail: { type: StringType },
  },

  async resolve({ request, response }, {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    phoneNumber,
    preferredLanguage,
    preferredCurrency,
    location,
    info,
    loggedinEmail
  }) {

    if(request.user && request.user.admin != true) {

      //Collect from Logged-in User
      let loggedInId = request.user.id;
      // let loggedInEmail = request.user.email;
      let updatedFirstName = capitalizeFirstLetter(firstName);
      let updatedLastName = capitalizeFirstLetter(lastName);
      let displayName = updatedFirstName + ' ' + updatedLastName;

      // For Email Update
      if(loggedinEmail != email) {

        const getUserId = await User.find({
          where: { email: email},
        });

        // Email is already used by someone
        if(getUserId) {
          return {
            status: 'email'
          };
        } else {
            // Check email is used by admin users
            const getAdminUserId = await AdminUser.find({
                where: { email: email},
            });

            if(getAdminUserId) {
              return {
                status: 'email'
              };
            }


            //Update email address for current user
            const updateEmail = User.update(
              {
                email: email,
              },
              {
                where: {
                  id: request.user.id
                }
              }
            );

            //If something went wrong in Updating email address
            if(!updateEmail) {
              return {
                status: 'failed'
              };
            }
        }
      }

      // Updating records on Current User's Profile
      const updateUser = UserProfile.update(
        {
          firstName: updatedFirstName,
          lastName: updatedLastName,
          displayName,
          gender,
          dateOfBirth,
          phoneNumber,
          preferredLanguage,
          preferredCurrency,
          location,
          info
        },
        {
          where: {
            userId: request.user.id
          }
        }
      );

      // If update successful, return email & no error
      if(updateUser) {
        return {
          status: "success",
        };

      } else {
          return {
            status: 'failed'
          };
      }

    } else {
        return {
          status: 'notLoggedIn'
        };
    }
  },
};

export default userEditProfile;
