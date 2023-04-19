import { signUpUser } from './4-user-promise';
import { uploadPhoto } from './5-photo-reject';

const handleProfileSignup = (firstName, lastName, fileName) => {
  const signUpPromise = signUpUser(firstName, lastName);
  const uploadPromise = uploadPhoto(fileName);

  return Promise.allSettled([signUpPromise, uploadPromise])
    .then(results => {
      return results.map(result => {
        if (result.status === 'fulfilled') {
          return {
            status: 'fulfilled',
            value: result.value
          };
        } else {
          return {
            status: 'rejected',
            value: result.reason
          };
        }
      });
    })
    .catch(error => {
      // Handle any error that occurred during Promise.allSettled()
      return {
        status: 'rejected',
        value: error
      };
    });
};

export default handleProfileSignup;
