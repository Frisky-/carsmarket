Template.singleAd.helpers({
  getImages: function () {
    Meteor.subscribe("getImages");
    return Images.find({ _id: { $in: this.images } });
  },
  getUser: function () {
    if (this.createdBy) {
      return Meteor.users.findOne({_id:this.createdBy});
    }
  },
  dateFormat: function (date) {
    return moment(date).format("MMM Do YYYY");
  }
});
Template.singleAd.onRendered(function(){
    $('a[rel=adImages]').fancybox();
    Meteor.call("addViews",this.data._id);
});

Template.singleAd.events({
  'click a[rel=adImages]' : function(e){
      e.preventDefault();
  }
});
