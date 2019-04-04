d3.queue()
    .defer(d3.json, "/dashboard_data")
    .await(makeGraphs);
    
function makeGraphs(error, graphData){
    console.log(graphData);
    var dataSet = graphData;
    var ndx = crossfilter(dataSet);
    
    var dish_dim = ndx.dimension(dc.pluck('dish_name'));
    var total_likes_per_recipe = dish_dim.group().reduceSum(dc.pluck('likes'));

    dc.barChart('#chart_dish_likes')
            .width(600)
            .height(400)
            .margins({top: 10, right: 50, bottom: 70, left: 50})
            .dimension(dish_dim)
            .group(total_likes_per_recipe)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Recipes")
            .yAxis().ticks(4);
            
    var bar_user_dim = ndx.dimension(dc.pluck('user_name'));
    var total_bar_likes_per_user = bar_user_dim.group().reduceSum(dc.pluck('likes'));

    dc.barChart('#chart_user_likes')
            .width(600)
            .height(400)
            .margins({top: 10, right: 50, bottom: 70, left: 50})
            .dimension(bar_user_dim)
            .group(total_bar_likes_per_user)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Authors")
            .yAxis().ticks(20);
        
        
   
    
    var origin_dim = ndx.dimension(dc.pluck('origin'));
    var total_origin= origin_dim.group().reduceCount(dc.pluck('origin'));
    dc.pieChart('#chart_origin')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(origin_dim)
                .group(total_origin);
        
      dc.renderAll();
      
    var type_dim = ndx.dimension(dc.pluck('type'));
    var total_type= type_dim.group().reduceCount(dc.pluck('type'));
    dc.pieChart('#chart_type')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(type_dim)
                .group(total_type);
                
    var type_allergen_dim = ndx.dimension(dc.pluck('type'));
    var total_allergen_type = type_allergen_dim.group().reduceCount(dc.pluck('allergens'));
    dc.pieChart('#allergens_type')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(type_allergen_dim )
                .group(total_allergen_type);
    
    var origin_allergen_dim = ndx.dimension(dc.pluck('origin'));
    var total_allergen_origin = origin_allergen_dim.group().reduceCount(dc.pluck('allergens'));
    dc.pieChart('#allergens_country')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(origin_allergen_dim)
                .group(total_allergen_origin);
     dc.renderAll();
}

