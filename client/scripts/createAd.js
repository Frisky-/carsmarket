var models;

Session.set("brand","");
Session.set("model","");
Session.set("year","");
Session.set("styles","");

Template.createAd.helpers({
  getMakes: function () {
    return brands.makes;
  },
  getModel: function () {
    for (var i in brands.makes){
      if(brands.makes[i].name === Session.get("brand")){
        // models = brands.makes[i].models;
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
    // if (models) {
    //   for(var i in models){
    //     if(models[i].name === Session.get("model")){
    //       return models[i].years;
    //     }
    //   }
    // }
  },
  getStyles: function() {
        if(Session.get("styles")){
          var styles = asyncValue.get().data.styles;
          return styles;
        }
  }
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
  'submit .createAdForm' : function(e) {
    e.preventDefault();
    Ads.insert({
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
      info:$(".info").val()
    });
  },
  //todo
  //  'dropped #dropzone': function(e) {
  //    FS.Utility.eachFile(e, function(file) {
  //       var newFile = new FS.File(file);
  //       Images.insert(newFile, function (error, fileObj) {
  //         if (error) {
  //           toastr.error("Upload failed... please try again.");
  //         } else {
  //           toastr.success('Upload succeeded!');
  //           $(".imagePreview").html("<img src=" + fileObj.url() + ">")
  //         }
  //     });
  //   });
  // }
});
