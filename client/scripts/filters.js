Template.filters.onRendered(function () {
  Session.set("condition","");
  Session.set("model","");
  Session.set("transmission","");
  Session.set("speeds","");
  Session.set("cylinders","");
  Session.set("fuel","");
  Session.set("mileage","");
  Session.set("brand","");
});
Template.filters.helpers({
  getBrands: function () {
    var brands = [];
    var data = Ads.find().fetch();
    for (var key in data){
      brands.push(data[key].brand);
    }
    return _.uniq(brands);
  },
  getModels: function () {
    if(Session.get("brand")){
      var models = [];
      var data = Ads.find({brand:Session.get("brand")}).fetch();
      for (var key in data) {
        models.push(data[key].model);
      }
      return _.uniq(models);
    }
  }
});

Template.filters.events({
  'change form' : function (event) {
    event.preventDefault();
    Session.set("brand",$(".brand").val());
    Session.set("model",$(".model").val());
    Session.set("condition",$(".condition").val());
    Session.set("transmission",$(".transmission").val());
    Session.set("speeds",$(".speeds").val());
    Session.set("cylinders",$(".cylinders").val());
    Session.set("fuel",$(".fuel").val());
    Session.set("mileage",$(".mileage").val());
  }
});
