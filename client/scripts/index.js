Template.homeIndex.helpers({
  getAds : function () {
    var filters = {
      brand:Session.get("brand"),
      model:Session.get("model"),
      condition: Session.get("condition"),
      transmission: Session.get("transmission"),
      speeds: Session.get("speeds"),
      cylinders: Session.get("cylinders"),
      fuel: Session.get("fuel"),
      mileage: Session.get("mileage")
    };
    var query = {};
    for(var i in filters){
      if(filters[i] !== ""){
        query[i] = filters[i];
      }
    }
      if (!jQuery.isEmptyObject(query)) {
        return Ads.find({$and: [query]});
      }else{
        return Ads.find();
      }
  },
});
Template.homeIndex.helpers({
  getImage:function (id) {
    if(id){
      if (Images.findOne({_id:id})) {
        return Images.findOne({_id:id}).url();
      }
    }
  }
});

Template.registerHelper("currency",function (currency) {
  return accounting.formatMoney(currency, "€", 2, ".", ",");
});
