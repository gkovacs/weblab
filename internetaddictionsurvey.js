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
  document.addEventListener('DOMContentLoaded', function(){
    return document.querySelector('#autofill').addEventListener('have-data', function(results){
      var data, k, v;
      console.log('have-data callback');
      console.log(results.detail);
      data = results.detail;
      for (k in data) {
        v = data[k];
        $('#' + k + '_display').text(v);
      }
      return $('#diagnosis_display').text('You are in desperate need of email-withdrawal therapy. Act before it is too late! Join your local chapter of Gmail Addicts Anonymous.');
    });
  });
}).call(this);
