Template.homeIndex.helpers({
  ads : function () {
    console.log(Session.get("type"));
    return Ads.find({
      bodyType: Session.get("type")
    });
  }
});

Template.homeIndex.events({
  'click .searchBtn' :function (e,t) {
    e.preventDefault();
    console.log($('.type').val());
    Session.set("type", $('.type option:selected').text());
  }
})
