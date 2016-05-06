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

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('changePwd');
