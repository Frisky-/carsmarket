AccountsTemplates.configure({
  positiveValidation: true,
  negativeValidation: true,
  enablePasswordChange: true,
  continuousValidation: true
});

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    minLength: 5,
    func: function(value){
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists){
                  self.setSuccess();
                  self.setValidating(false);
                }else{
                  self.setError("Username already exists.");
                  self.setValidating(false);
                }
            });
    },
});
AccountsTemplates.removeField("email");
AccountsTemplates.addField({
  _id: 'email',
  type: 'email',
  required: true,
  re: /.+@(.+){2,}\.(.+){2,}/,
  errStr:"Enter valid email",
  func: function (value) {
    if (Meteor.isClient){
      var self = this;
      Meteor.call("emailExists", value, function (err, emailExists) {
        if(!emailExists){
          self.setSuccess();
          self.setValidating(false);
        }else{
          self.setError("Email already exists.");
          self.setValidating(false);
        }
      });
    }
  }
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    showValidating: true,
    required: true,
    minLength: 6
});
