(function($){
    $(document).ready(function() {
      var data = [];

      for (var i = 0; i < 1000; i++) {
        data.push(Math.floor(Math.random() * 40));
      }

      var height = 40,
          barWidth = 3;

      var y = d3.scale.linear()
          .domain([0, d3.max(data)])
          .range([5, height]);

      var colorBanner = d3.scale.ordinal().range(['#FD7900', '#FFF551', '#B23440', '#303E48', '#C9F5D2', '#3D4348', '#FFFAA1', '#B27D82', '#FDB472', '#E4F5E7' ]);
      var grayScaleBanner = d3.scale.ordinal().range(['#303E48']);

      var chart = d3.select("header .banner")
          .attr("height", height);

      var bar = chart.selectAll("g")
          .data(data)
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(" + i * barWidth + ", 0)"; });

      bar.append("rect")
        .attr("height", y)
        .attr("width", barWidth - 1)
        .attr("fill", function(d, i) {return colorBanner(i); });

      chart = d3.select(".footer-top .banner")
          .attr("height", height);

      bar = chart.selectAll("g")
          .data(data)
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(" + i * barWidth + ", 0)"; });

      bar.append("rect")
        .attr("height", function(d) {return d; })
        .attr("y", function(d) {return height - y(d); })
        .attr("width", barWidth - 1)
        .attr("fill", function(d, i) {return grayScaleBanner(i); });
    });
})(jQuery);
