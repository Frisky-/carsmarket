Ads = new Mongo.Collection('ads');
if(Meteor.isServer){
  Meteor.startup(function () {
    if(Ads.find().count() === 0){
      for (var i = 0; i < 10; i++) {
        Ads.insert({
          brand: "Ford",
          name:"F-150",
          year:"2015",
          mileage: "0",
          fuelType: "Diesel",
          condition: "New",
          bodyType: "Truck",
          price: "26430",
          engine: "3.5L V-6 282 HP 253 ft.lbs. @ 4,250 rpm",
          transmision: "auto",
          ABS: "yes",
          doorCount: "2",
          paint: "clearcoat monotone",
          image: "carDefault.png",
          description: "Lorem ipsum dolor sit amet, qui nobis quaestio ad. Id quo reformidans contentiones. Mel cu consul primis, nulla aliquid dissentiet sed id. Accusata deseruisse at vis. Te sit oblique scriptorem omittantur, eam cu mediocritatem conclusionemque. Justo patrioque eloquentiam vis cu, eos inani reprimique complectitur id. Consequat efficiendi consectetuer ne vim."
        });
      }
    }
  });
}
