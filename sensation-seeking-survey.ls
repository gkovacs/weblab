Polymer {
  is: 'sensation-seeking-survey'
  ready: ->
    self = this
    this.$$('#autofill').addEventListener 'have-data', (results) ->
      console.log 'have-data callback'
      console.log results.detail
      data = [[k, v] for k,v of results.detail.chrome_history_timespent_domain]
      top_sites = prelude.sortBy (.[1]), data |> prelude.reverse |> prelude.take 5 |> prelude.map (.[0])
      console.log top_sites
      self.$$('#ratedomains').domains = top_sites
  submitsurvey: ->
    {occupation, hobbies, classifications} = this.$$('#ratedomains')
    {sssv_questions, answers} = this.$$('#surveyquestions')
    if not (window.skipchecks? and window.skipchecks)
      if not occupation? or occupation == ''
        swal 'Please fill out your occupation'
        return
      if not hobbies? or hobbies == ''
        swal 'Please fill out your hobbies'
        return
      for k,v of classifications
        if v == null
          swal 'Please indicate the primary reason you visit ' + k
          return
      for k,v of answers
        if v == null
          swal 'Please answer survey question ' + (parseInt(k)+1)
          return
    data = {
      autofill: this.$$('#autofill').data
      notes: this.$$('#notes').value
      occupation
      hobbies
      classifications
      sssv_questions
      answers
      surveyname: 'sensationseeking1'
      time: Date.now()
      localtime: new Date().toString()
    }
    console.log 'compressing data'
    compressed_data = LZString.compressToEncodedURIComponent JSON.stringify data
    console.log 'posting data'
    $.ajax {
      type: 'POST'
      url: '/logsurvey_compressed'
      contentType: 'text/plain'
      data: compressed_data
      #contentType: 'application/json'
      #dataType: 'json'
      #data: JSON.stringify(data)
      error: (err) ->
        console.log 'have error'
        console.log err
      complete: (a) ->
        console.log a
        console.log 'finished posting survey results'
        swal 'finished posting survey results'
    }
}

