/*
startPage = ->
  params = getUrlParameters()
  tagname = params.tag
  {survey} = params
  if not tagname?
    if survey?
      tagname = survey + '-survey'
    else
      tagname = 'intro-page'
      #tagname = 'experiment-view'
  tag = $("<#{tagname}>")
  for k,v of params
    if k == 'tag'
      continue
    v = jsyaml.safeLoad(v)
    tag.prop k, v
  tag.appendTo '#contents'

$(document).ready ->
  console.log window.location
  startPage()
  return
*/
(function(){
  var display_time_on_domains;
  display_time_on_domains = function(domain_to_timespent){
    var timespent_and_domain, domain, timespent, output, i$, len$, ref$;
    timespent_and_domain = [];
    for (domain in domain_to_timespent) {
      timespent = domain_to_timespent[domain];
      timespent_and_domain.push([timespent, domain]);
    }
    timespent_and_domain = prelude.sortBy(function(it){
      return it[0];
    }, timespent_and_domain);
    timespent_and_domain.reverse();
    output = [];
    for (i$ = 0, len$ = timespent_and_domain.length; i$ < len$; ++i$) {
      ref$ = timespent_and_domain[i$], timespent = ref$[0], domain = ref$[1];
      output.push("<div>" + domain + " " + timespent / 1000.0 / 3600.0 + "</div>");
    }
    return document.querySelector('#time_on_domains').innerHTML = output.join('\n');
  };
  document.addEventListener('DOMContentLoaded', function(){
    return document.querySelector('#autofill').addEventListener('have-data', function(results){
      console.log('have-data callback');
      console.log(results.detail);
      display_time_on_domains(results.detail.chrome_history_timespent_domain);
      return document.querySelector('#displayresults').innerText = JSON.stringify(results.detail, null, 2);
    });
  });
}).call(this);
