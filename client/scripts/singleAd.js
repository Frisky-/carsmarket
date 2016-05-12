Template.singleAd.helpers({
  getImages: function () {
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
    this.$('.fancybox').fancybox({
      type:"image",
      openEffect	: 'none',
  		closeEffect	: 'none'
    });
});
