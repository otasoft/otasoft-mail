export const emailTemplates = [
  {
    name: 'confirmCreateAccount',
    subject: 'Account created in Otasoft',
    text:
      'Dear user, <br> Your account in Otasoft system has been created sucessfuly. <br> Please confirm creating an account by clicking the following link',
  },
  {
    name: 'forgotPassword',
    subject: 'Forgot password to Otasoft account',
    text:
      'Dear user, <br> We received your request to reset password. <br> Please click the following link to set your new password',
  },
  {
    name: 'confirmBooking',
    subject: 'Your booking in Otasoft has been confirmed',
    text:
      'Dear user, <br> We received your booking request. <br> Please see attached details.',
  },
  {
    name: 'deleteAccount',
    subject: 'Your account has been marked for deletion',
    text:
      'Dear user, <br> We received your request to delete your account. <br> After 30 days from now, your account and all coresponding data will be completely erased from ours system.',
  },
  {
    name: 'setNewPassword',
    subject: 'New password for your account has been set',
    text:
      'Dear user, <br> This email is an automatic notification that your account password has be set.',
  },
];
