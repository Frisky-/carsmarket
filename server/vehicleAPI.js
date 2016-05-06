var apiKey = "gg7swe8jwvrzqe8tpnst4jac";
Meteor.methods({
  getStyles: function (brand,model,year) {
    this.unblock();
    return Meteor.http.call("GET",
    "https://api.edmunds.com/api/vehicle/v2/" + brand + "/" + model +"/" + year + "/styles?fmt=json&api_key=" + apiKey);
  }
});
