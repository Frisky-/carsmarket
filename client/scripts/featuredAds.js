Template.featuredAds.helpers({
  getMostViewed: function () {
    return Ads.find({},{sort:{views:-1},limit:3}).fetch();
  },
  getImage:function (id) {
    if(id){
      if (Images.findOne({_id:id})) {
        return Images.findOne({_id:id}).url();
      }
    }
  }
})
