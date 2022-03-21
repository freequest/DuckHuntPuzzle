


$(document).on('ready page:load', function () {



function setAllHidden(chart, hidden) {
  chart.data.datasets.forEach(function(ds) {
    ds.hidden = hidden;
  });
  chart.update()
}


  var randomColorGenerator = function () { 
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
  };





{% for ep in solve_time %}
    var teamCanvas{{forloop.counter}} = $("canvas#chart_teams_{{forloop.counter}}");

    if (teamCanvas{{forloop.counter}}.length != 1) {
      return
    }

  let chart{{forloop.counter}} = new Chart(teamCanvas{{forloop.counter}}, {
      type: 'line',
      data: {
        labels: [
        {% for x in ep.names %}
        "{{x | safe}}",
        {%endfor%}
        ],
          
        datasets: [
{% for team in ep.solve %}
          {
            label: "{{team.name |truncatechars:40 }}",
            data: [
                  {% for point in team.solve %}
                  {
                  x: {{forloop.counter}},
                  y: "{{point}}"
                  },
                  {%endfor%}
                  ],
        borderColor: randomColorGenerator(),
        hidden: {% if forloop.counter < 11 %} false {%else%} true {%endif%}
              },
{%endfor%}
        ]
      },
            options: {
        scales: {
            y: {
                type: 'time',
                min: "{{ep.min}}",
                time: {
                tooltipFormat:'dd/MM HH:mm',
                        displayFormats: {
                        'millisecond':'dd/MM HH:mm',
                         'second': 'dd/MM HH:mm',
                         'minute': 'dd/MM HH:mm',
                         'hour': 'dd/MM HH:mm',
                         'day': 'dd/MM HH:mm',
                         'week': 'dd/MM HH:mm',
                         'month': 'dd/MM HH:mm',
                         'quarter': 'dd/MM HH:mm',
                         'year': 'dd/MM HH:mm',
                        },
                }
            },
            },
            
            plugins:{
            title: {
              display: true,
              text: 'Resolution times for Episode {{forloop.counter}}'
            }
    },
    
    
        }
      
      
      
      
      
    });
    
    
    chart{{forloop.counter}}.ctx.canvas.addEventListener('wheel', chart{{forloop.counter}}._wheelHandler);


  let showAllButton{{forloop.counter}} = document.getElementById(`show-all-{{forloop.counter}}`)
  showAllButton{{forloop.counter}}.addEventListener('click', function() {
    setAllHidden(chart{{forloop.counter}}, false)
  })

  let hideAllButton{{forloop.counter}} = document.getElementById(`hide-all-{{forloop.counter}}`)
  hideAllButton{{forloop.counter}}.addEventListener('click', function() {
    setAllHidden(chart{{forloop.counter}}, true)
  })

{% endfor %}





{% for ep in solve_time %}
    var stackCanvas{{forloop.counter}} = $("canvas#chart_stacked_{{forloop.counter}}");

    if (stackCanvas{{forloop.counter}}.length != 1) {
      return
    }

  let chartstack{{forloop.counter}} = new Chart(stackCanvas{{forloop.counter}}, {
      type: 'bar',
      data: {
        labels: [
        {% for x in ep.teams %}
        "{{x.0|truncatechars:40|safe}}",
        {%endfor%}
        ],
          
        datasets: [
{% for puz in ep.names %}
          {
            label: "{{puz|safe }}",
            data: [

{% for team in ep.solve %}
{% if  team.puz_limits|length >= forloop.parentloop.counter %}
                  ["{{ team.puz_limits|index:forloop.parentloop.counter|index:1}}" , "{{ team.puz_limits|index:forloop.parentloop.counter|index:2}}"],
        
{%endif%}
                  {%endfor%}
                  ],
        backgroundColor: randomColorGenerator(),
        hidden: false,
              },
{%endfor%}
        ]
      },
            options: {
            responsive: true,
            indexAxis: 'y',
        scales: {
            x: {
                stacked: false,
                type: 'time',
                min: "{{ep.min}}",
                time: {
                unit: 'minute',
                tooltipFormat:'HH:mm:ss',
                        displayFormats: {
                        'millisecond':'HH:mm:ss',
                         'second': 'HH:mm:ss',
                         'minute': 'HH:mm',
                         'hour': ' HH:mm',
                         'day': 'D d HH:mm',
                         'week': 'D d HH:mm',
                         'month': 'D d m HH:mm',
                         'quarter': 'D d m HH:mm',
                         'year': 'Y d/m',
                        },
                }
            },      
            y: {
                stacked: true,
                  ticks: {
                    autoSkip: false
                  },
            }

            },

            
            plugins:{

    tooltip: {
	enabled: false
      },

            title: {
              display: true,
              text: 'Resolution times for Episode {{forloop.counter}}'
            },
            
      zoom: {
        pan:{ enabled:true,},
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
        }
      }
    },
    
    
        }
      
    });


  let showAllButtonstack{{forloop.counter}} = document.getElementById(`show-all-stacked-{{forloop.counter}}`)
  showAllButtonstack{{forloop.counter}}.addEventListener('click', function() {
    setAllHidden(chartstack{{forloop.counter}}, false)
  })

  let hideAllButtonstack{{forloop.counter}} = document.getElementById(`hide-all-stacked-{{forloop.counter}}`)
  hideAllButtonstack{{forloop.counter}}.addEventListener('click', function() {
    setAllHidden(chartstack{{forloop.counter}}, true)
  })

{% endfor %}





  var puzCanvas = $("canvas#chart_puz");

  if (puzCanvas.length != 1) {
    return
  }
  


new Chart(puzCanvas, {
    type: 'line',
    data: {
      labels: [
                {% for point in data_puz %}
                " {{point.name | safe}}",
                {%endfor%}
                ],
      datasets: [
        {
          label: "Minimum Time",
          data: [
                {% for point in data_puz %}
                {% if point.min_dur == None %}
                  null ,
                {% else %}      
                  "{{point.min_dur}}",
                {%endif%}
                {%endfor%}
                ],
      borderColor: '#ff0000',
            },
        {
          label: "Average Time",
          data: [
                {% for point in data_puz %}
                {% if point.min_dur == None %}
                  null ,
                {% else %}      
                  "{{point.av_dur}}",
                {%endif%}
                {%endfor%}
                ],
      borderColor: '#00ff00',
        },
        {
          label: "Median Time",
          data: [
                {% for point in data_puz %}
                {% if point.min_dur == None %}
                  null ,
                {% else %}      
                  "{{point.med_dur}}",
                {%endif%}
                {%endfor%}
                ],
      borderColor: '#0000ff',
        },
      ]
    },
    
  options: {
        
        scales: {
            y: {
                type: 'time',
                time: {
                unit: 'minute',
                tooltipFormat:'HH:mm:ss',
                        displayFormats: {
                        'millisecond':'HH:mm:ss',
                         'second': 'HH:mm:ss',
                         'minute': 'HH:mm',
                         'hour': ' HH:mm',
                         'day': 'D d HH:mm',
                         'week': 'D d HH:mm',
                         'month': 'D d m HH:mm',
                         'quarter': 'D d m HH:mm',
                         'year': 'Y d/m',
                        },
                }
            },
            },
    plugins:{
    title: {
      display: true,
      text: 'Resolution time per puzzle'
    }
    },
        
  }
    
  });











  
});






