Meteor.methods({
   "userExists": function(username){
       return !!Meteor.users.findOne({username: username});
   },
   "changeEmail" : function (id,email) {
     return Meteor.users.update({_id:id},{$set:{"emails.0.address":email}});
   },
   "changeUsername" : function (id,username) {
     return Meteor.users.update({_id:id},{$set:{username:username}});
   },
   "emailExists": function (email) {
       return !!Accounts.findUserByEmail(email);
   },
   "submitAd": function (query) {
     if(Meteor.userId()){
       return Ads.insert(query);
     }
   },
   "removeAd" : function (ad) {
     if(ad.createdBy === Meteor.userId()){
       return Ads.remove(ad._id);
     }
   }
 });
