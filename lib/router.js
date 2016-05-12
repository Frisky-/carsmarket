Router.configure({
  layoutTemplate:"layout",
  notFoundTemplate:"notFound",
  loadingTemplate:"loading",
  yieldRegions:{
    navbar: {to: "header"}
  }
});

Router.route("/",{
  name: "homeIndex"
});
Router.route("profile",{
  name: "profile"
});
Router.route("createAd", {
  name: "createAd"
});
Router.route("contacts",{
  name:"contacts"
});
Router.route("about",{
  name:"about"
});
Router.route("/ad/:_id",{
  name:'singleAd',
  data: function () {
    return Ads.findOne({_id:this.params._id});
  }
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('changePwd');
