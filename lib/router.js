Router.configure({
  layoutTemplate:"layout",
  notFoundTemplate:"notFound",
  loadingTemplate:"loading",
  yieldRegions:{
    navbar: {to: "header"}
  }
});

Router.route("/",{
  name: "homeIndex",
  waitOn : function () {
    return [Meteor.subscribe('ads'),Meteor.subscribe("getImages")];
  }
});
Router.route("profile",{
  name: "profile",
  data: function () {
    return [Meteor.subscribe('ads'),Meteor.subscribe("getImages")];
  }
});
Router.route("createAd", {
  name: "createAd"
});
Router.route("/ad/:_id",{
  name:'singleAd',
  data : function () {
    Meteor.subscribe("ads");
    Meteor.call("addViews",this.params._id);
    return Ads.findOne({_id:this.params._id});
  }
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('changePwd');
