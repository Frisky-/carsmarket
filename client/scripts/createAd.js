var models;
var _deps = new Deps.Dependency;
var images = [];

Session.set("brand","");
Session.set("model","");
Session.set("year","");
Session.set("styles","");

Template.createAd.onRendered(function () {
  $(".createAdForm").validate();
});
Template.createAd.helpers({
  getMakes: function () {
    return brands.makes;
  },
  getModel: function () {
    for (var i in brands.makes){
      if(brands.makes[i].name === Session.get("brand")){
        Session.set("getYears",brands.makes[i].models);
        return brands.makes[i].models;
      }
    }
  },
  getYear: function () {
    if(Session.get("getYears") !== "" || Session.get("getYears") !== undefined){
      for(var i in Session.get("getYears")){
        if(Session.get("getYears")[i].name === Session.get("model")){
          return Session.get("getYears")[i].years;
        }
      }
    }
  },
  getStyles: function() {
        if(Session.get("styles")){
          var styles = asyncValue.get().data.styles;
          return styles;
        }
  },getImages: function () {
    _deps.depend();
    if (images.length !== 0) {
      Meteor.subscribe("getImages");
      var asd = Images.find({ _id: { $in: images } });
      console.log(asd);
      return asd;
    }
  },
});
Tracker.autorun(function() {
  if (Session.get('model') && Session.get("brand") && Session.get("year") ) {
    var self = this;
      self.asyncValue = new ReactiveVar("Loading...");
      Meteor.call('getStyles',Session.get("brand"),Session.get("model"),Session.get("year"), function (err, res) {
          if (err){
            console.log(err);
          }else{
            Session.set("styles",res);
            self.asyncValue.set(res);
          }
      });
  }
});

Template.createAd.events({
  'change .brand': function () {
    Session.set("brand",$(".brand").val());
    $(".model").val("");
    Session.set("model","");
    Session.set("year","");
    Session.set("styles","");
  },
  'change .model': function () {
    Session.set("model",$(".model").val());
  },
  'change .year': function () {
    Session.set("year",$(".year").val());
    Session.set("styles","");
  },
   'dropped #dropzone': function(e) {
     FS.Utility.eachFile(e, function(file) {
        var newFile = new FS.File(file);
        Images.insert(newFile, function (error, fileObj) {
          if (error) {
            toastr.error("Upload failed... please try again.");
          } else {
            toastr.success('Upload succeeded!');
            images.push(fileObj._id);
            _deps.changed();
          }
      });
    });
  },
  'submit .createAdForm' : function(e) {
    e.preventDefault();
    var query = {
      createdBy: Meteor.userId(),
      brand:$(".brand").val(),
      model:$(".model").val(),
      year:$(".year").val(),
      style:$(".styles").val(),
      transmission:$(".transmission").val(),
      cylinders:$(".cylinders").val(),
      condition:$(".condition").val(),
      mileage:$(".miles").val(),
      fuel:$(".fuel").val(),
      speeds:$(".speeds").val(),
      info:$(".info").val(),
      price:$(".price").val(),
      number:$(".number").val(),
      createdAt: new Date(),
      images:images
    };
    Meteor.call('submitAd',query,function (err,success) {
      if(err){
        console.log(err);
      }else{
        console.log("success");
        Router.go("/");
      }
    });
  },
  "click .js-deleteImage" : function (e) {
    Images.remove(this._id,function (err,success) {
      if(err){
        console.log(err);
      }else{
        toastr.error('Image removed');
      }
    });
  }
});
