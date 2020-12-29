export const emailTemplates = [
  {
    name: 'confirmCreateAccount',
    subject: 'Account created in Otasoft',
    text:
      'Dear user, <br> Your account in Otasoft system has been created sucessfuly. <br> Please confirm creating an account by clicking the following link',
  },
  {
    name: 'resetPassword',
    subject: 'Remind password to Otasoft account',
    text: 'Dear user, <br> We received your request to reset password. <br> Please click the following link to reset your password',
  },
  {
    name: 'confirmBooking',
    subject: 'Your booking in Otasoft has been confirmed',
    text: 'Dear user, <br> We received your booking request. <br> Please see attached details.',
  },
  {
    name: 'deleteAccount',
    subject: 'Your has been marked for deletion',
    text: 'Dear user, <br> We received your request to delete your account. <br> After 30 days from now, your account and all coresponding data will be completely erased from ours system.',
  }
];
