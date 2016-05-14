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

Meteor.methods({
  "changeUsername" : function (id,username) {
    return Meteor.users.update({_id:id},{$set:{username:username}});
  }
});
Meteor.methods({
  "changeEmail" : function (id,email) {
    return Meteor.users.update({_id:id},{$set:{"emails.0.address":email}});
  }
});
