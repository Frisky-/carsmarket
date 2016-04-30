Meteor.methods({
   "userExists": function(username){
       return !!Meteor.users.findOne({username: username});
   },
 });
Meteor.methods({
  "emailExists": function (email) {
      return !!Accounts.findUserByEmail(email);
  }
});
