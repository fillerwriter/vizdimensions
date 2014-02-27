(function($){
  $(document).ready(function() {
    var width = 100,
        height = 100,
        radius = Math.min(width, height) / 2,
        date = [{month: 2, day: 14}];

    var color = d3.scale.ordinal()
        .range(["#FD7900", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 5)
        .innerRadius(radius - 20);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d; });

    var dateData = [];
    $('.post-date').each(function(index) {
      var dateInfo = moment($(this).attr('data-date'), "DD MM YYYY");
      dateData.push({
        chart: [dateInfo.date(), dateInfo.daysInMonth() - dateInfo.date()],
        date: [{
          day: dateInfo.date(),
          month: dateInfo.month()
        }]
      });
    });
    var containers = $('.post-date');

    $('.post-date').each(function(index) {
      var svg = d3.select($('.post-date').get(index))
            .append('svg')
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          svg.append("circle").attr({
            cx: 0,
            cy: 0,
            r: radius,
            fill: '#FFF'
          });

      var g = svg.selectAll(".arc")
          .data(pie(dateData[index].chart))
          .enter().append("g")
            .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return color(i); });

var dateText = svg.selectAll('.date')
          .data(dateData[index].date);
    
    dateText.enter().append('g')
            .attr({class: 'date'});

    dateText.append('text')
      .attr({
        x: 0,
        y: -8,
        'text-anchor': 'middle'
      })
      .classed('month', true)
      .text(function(d) { return moment.monthsShort()[d.month]; });

    dateText.append('text')
      .attr({
        x: 0,
        y: 17,
        'text-anchor': 'middle'
      })
      .classed('day', true)
      .text(function(d) { return d.day; });
            //<text text-anchor='middle' x='0' y='15' class='day'>" + d.day + "</text>"; });


    });
    return;

  });
})(jQuery);