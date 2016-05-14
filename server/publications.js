Meteor.publish("ads", function () {
  return Ads.find();
});
Meteor.publish("single-ad",function (id) {
  return Ads.find({_id:id});
});
Meteor.publish("getImages",function () {
  return Images.find();
});
