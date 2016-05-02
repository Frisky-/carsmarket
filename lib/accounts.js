AccountsTemplates.configure({
  positiveValidation: true,
  negativeValidation: true,
  enablePasswordChange: true
});

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    minLength: 5,
    showValidating: true,
    func: function(value){
        if (Meteor.isClient) {
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists){
                  self.setSuccess();
                }else{
                  self.setError("Username already exists.");
                  self.setValidating(false);
                }
            });
            return;
        }
    },
});
AccountsTemplates.removeField("email");
AccountsTemplates.addField({
  _id: 'email',
  type: 'email',
  required: true,
  re: /.+@(.+){2,}\.(.+){2,}/,
  func: function (value) {
    if (Meteor.isClient){
      var self = this;
      Meteor.call("emailExists", value, function (err, emailExists) {
        if(!emailExists){
          self.setSuccess();
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
