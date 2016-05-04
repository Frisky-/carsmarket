Session.set("type","");
Session.set("condition","");
Session.set("transmission","");
Session.set("speeds","");

Template.homeIndex.helpers({
  ads : function () {
    var filters = {
      bodyType:Session.get("type"),
      condition: Session.get("condition"),
      transmission: Session.get("transmission"),
      speeds: Session.get("speeds")
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
  }
});

Template.homeIndex.events({
  'change form' : function (event) {
    event.preventDefault();
    Session.set("type",$(".type").val());
    Session.set("condition",$(".condition").val());
    Session.set("transmission",$(".transmission").val());
    Session.set("speeds",$(".speeds").val());
  }
});
