Template.profile.helpers({
  user: function () {
    return Meteor.users.findOne({_id:Meteor.userId()});
  },
  getUserAds: function () {
    return Ads.find({createdBy:Meteor.userId()});
  },
  getImage:function (id) {
    if(id){
      if (Images.findOne({_id:id})) {
        return Images.findOne({_id:id}).url();
      }
    }
  }
});

Template.profile.onRendered(function () {
  $(".editProfileForm").validate({
    email: {
      email:true
    }
  });
});

Template.profile.events({
  "click .js-editProfile": function (e) {
    e.preventDefault();
    var form = $(".editProfileForm");
    if($(".changeUsername").val() === "" && $(".email").val() === ""){
      toastr.error('Please enter new username or email');
    }
    if ($(".changeUsername").val()) {
      if(form.valid()){
        Meteor.call("changeUsername",Meteor.userId(), $(".changeUsername").val());
        toastr.success("Username changed!");
      }
    }
    if($(".email").val()){
      if(form.valid()){
        Meteor.call("changeEmail",Meteor.userId(),$(".email").val());
        toastr.success("Email changed!");
      }else{
        taostr.error("Enter valid email");
      }
    }
  },
  "click .js-deleteAd": function (e) {
    e.preventDefault();
    var images = Ads.find({_id:this._id}).fetch()[0].images;
    console.log(this);
    Meteor.call("removeAd",this);
    if (images) {
      for (var i = 0; i < images.length; i++) {
        Images.remove({_id:images[i]});
      }
    }
  }
});
