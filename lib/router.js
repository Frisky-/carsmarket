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

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');