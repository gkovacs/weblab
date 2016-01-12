(function(){
  var computed_fields, out$ = typeof exports != 'undefined' && exports || this;
  out$.computed_fields = computed_fields = {
    google_queries: function(callback){
      return getlist('google_history', function(google_history){
        var x;
        return callback((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = google_history).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.query);
          }
          return results$;
        }()));
      });
    },
    bing_queries: function(callback){
      return getlist('bing_history', function(bing_history){
        var x;
        return callback((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = bing_history).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.query);
          }
          return results$;
        }()));
      });
    },
    num_gmail_visits: function(callback){
      return getlist('gmail_visits', function(gmail_visits){
        return callback(gmail_visits.length);
      });
    },
    num_gmail_visits_in_past_24_hours: function(callback){
      return getlist('gmail_visits', function(gmail_visits){
        var curtime, gmail_visits_in_past_24_hours, res$, i$, len$, x;
        curtime = Date.now();
        res$ = [];
        for (i$ = 0, len$ = gmail_visits.length; i$ < len$; ++i$) {
          x = gmail_visits[i$];
          if (curtime - x.timestamp < 24 * 3600 * 1000) {
            res$.push(x);
          }
        }
        gmail_visits_in_past_24_hours = res$;
        return callback(gmail_visits_in_past_24_hours.length);
      });
    },
    time_spent_composing_emails_gmail_in_past_24_hours: function(callback){
      return getlist('browsing_time_by_site', function(browsing_time_by_site){
        var time_on_gmail, res$, i$, len$, x, time_composing_emails, curtime, time_composing_emails_in_past_24_hours;
        res$ = [];
        for (i$ = 0, len$ = browsing_time_by_site.length; i$ < len$; ++i$) {
          x = browsing_time_by_site[i$];
          if (x.host === 'mail.google.com') {
            res$.push(x);
          }
        }
        time_on_gmail = res$;
        res$ = [];
        for (i$ = 0, len$ = time_on_gmail.length; i$ < len$; ++i$) {
          x = time_on_gmail[i$];
          if (x.url.endsWith('?compose=new')) {
            res$.push(x);
          }
        }
        time_composing_emails = res$;
        curtime = Date.now();
        res$ = [];
        for (i$ = 0, len$ = time_composing_emails.length; i$ < len$; ++i$) {
          x = time_composing_emails[i$];
          if (curtime - x.timestamp < 24 * 3600 * 1000) {
            res$.push(x);
          }
        }
        time_composing_emails_in_past_24_hours = res$;
        return callback(prelude.sum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_composing_emails_in_past_24_hours).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.interval);
          }
          return results$;
        }())));
      });
    },
    time_spent_composing_emails_gmail: function(callback){
      return getlist('browsing_time_by_site', function(browsing_time_by_site){
        var time_on_gmail, res$, i$, len$, x, time_composing_emails;
        res$ = [];
        for (i$ = 0, len$ = browsing_time_by_site.length; i$ < len$; ++i$) {
          x = browsing_time_by_site[i$];
          if (x.host === 'mail.google.com') {
            res$.push(x);
          }
        }
        time_on_gmail = res$;
        res$ = [];
        for (i$ = 0, len$ = time_on_gmail.length; i$ < len$; ++i$) {
          x = time_on_gmail[i$];
          if (x.url.endsWith('?compose=new')) {
            res$.push(x);
          }
        }
        time_composing_emails = res$;
        return callback(prelude.sum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_composing_emails).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.interval);
          }
          return results$;
        }())));
      });
    },
    num_gmail_visits_per_day: function(callback){
      console.log('num_gmail_visits_per_day: getlist');
      return getlist('gmail_visits', function(gmail_visits){
        var curtime, first_visit, x, num_days;
        console.log('num_gmail_visits_per_day: computation');
        curtime = Date.now();
        first_visit = prelude.minimum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = gmail_visits).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.timestamp);
          }
          return results$;
        }()));
        num_days = prelude.max(1)(
        Math.round(
        (curtime - first_visit) / (24 * 3600 * 1000)));
        console.log('num_gmail_visits_per_day: computation done');
        return callback(gmail_visits.length / num_days);
      });
    },
    time_spent_composing_email_per_day_gmail: function(callback){
      return getlist('browsing_time_by_site', function(browsing_time_by_site){
        var time_on_gmail, res$, i$, len$, x, time_composing_emails, curtime, first_visit, num_days;
        res$ = [];
        for (i$ = 0, len$ = browsing_time_by_site.length; i$ < len$; ++i$) {
          x = browsing_time_by_site[i$];
          if (x.host === 'mail.google.com') {
            res$.push(x);
          }
        }
        time_on_gmail = res$;
        res$ = [];
        for (i$ = 0, len$ = time_on_gmail.length; i$ < len$; ++i$) {
          x = time_on_gmail[i$];
          if (x.url.endsWith('?compose=new')) {
            res$.push(x);
          }
        }
        time_composing_emails = res$;
        curtime = Date.now();
        first_visit = prelude.minimum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_composing_emails).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.timestamp);
          }
          return results$;
        }()));
        num_days = prelude.max(1)(
        Math.round(
        (curtime - first_visit) / (24 * 3600 * 1000)));
        return callback(prelude.sum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_composing_emails).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.interval);
          }
          return results$;
        }())) / num_days);
      });
    },
    time_spent_on_gmail_in_past_24_hours: function(callback){
      return getlist('browsing_time_by_site', function(browsing_time_by_site){
        var time_on_gmail, res$, i$, len$, x, curtime, time_on_gmail_in_past_24_hours;
        res$ = [];
        for (i$ = 0, len$ = browsing_time_by_site.length; i$ < len$; ++i$) {
          x = browsing_time_by_site[i$];
          if (x.host === 'mail.google.com') {
            res$.push(x);
          }
        }
        time_on_gmail = res$;
        curtime = Date.now();
        res$ = [];
        for (i$ = 0, len$ = time_on_gmail.length; i$ < len$; ++i$) {
          x = time_on_gmail[i$];
          if (curtime - x.timestamp < 24 * 3600 * 1000) {
            res$.push(x);
          }
        }
        time_on_gmail_in_past_24_hours = res$;
        return callback(prelude.sum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_on_gmail_in_past_24_hours).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.interval);
          }
          return results$;
        }())));
      });
    },
    time_spent_on_gmail: function(callback){
      return getlist('browsing_time_by_site', function(browsing_time_by_site){
        var time_on_gmail, res$, i$, len$, x;
        res$ = [];
        for (i$ = 0, len$ = browsing_time_by_site.length; i$ < len$; ++i$) {
          x = browsing_time_by_site[i$];
          if (x.host === 'mail.google.com') {
            res$.push(x);
          }
        }
        time_on_gmail = res$;
        return callback(prelude.sum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_on_gmail).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.interval);
          }
          return results$;
        }())));
      });
    },
    time_spent_on_gmail_per_day: function(callback){
      return getlist('browsing_time_by_site', function(browsing_time_by_site){
        var time_on_gmail, res$, i$, len$, x, curtime, first_visit, num_days;
        res$ = [];
        for (i$ = 0, len$ = browsing_time_by_site.length; i$ < len$; ++i$) {
          x = browsing_time_by_site[i$];
          if (x.host === 'mail.google.com') {
            res$.push(x);
          }
        }
        time_on_gmail = res$;
        curtime = Date.now();
        first_visit = prelude.minimum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_on_gmail).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.timestamp);
          }
          return results$;
        }()));
        num_days = prelude.max(1)(
        Math.round(
        (curtime - first_visit) / (24 * 3600 * 1000)));
        return callback(prelude.sum((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = time_on_gmail).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.interval);
          }
          return results$;
        }())) / num_days);
      });
    },
    chrome_history: function(callback){
      return chrome.history.search({
        text: '',
        startTime: 0,
        maxResults: Math.pow(2, 31) - 1
      }, function(results){
        return callback(results);
      });
    },
    chrome_history_facebook: function(callback){
      return getcomp('chrome_history', function(history){
        var x;
        return callback((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = history).length; i$ < len$; ++i$) {
            x = ref$[i$];
            if (x.url.indexOf('facebook.com') !== -1) {
              results$.push(x);
            }
          }
          return results$;
        }()));
      });
    },
    chrome_history_gmail: function(callback){
      return getcomp('chrome_history', function(history){
        var x;
        return callback((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = history).length; i$ < len$; ++i$) {
            x = ref$[i$];
            if (x.url.indexOf('mail.google.com') !== -1) {
              results$.push(x);
            }
          }
          return results$;
        }()));
      });
    },
    chrome_history_allvisits_fast: function(callback){
      return chrome.history.search({
        text: '',
        startTime: 1447759578870,
        maxResults: Math.pow(2, 31) - 1
      }, function(results){
        console.log('got results for chrome_history_allvisits');
        return async.each(results, function(item, donecb){
          if (item.visitCount === 1) {
            item.visitTime = item.lastVisitTime;
            return donecb();
          }
          return chrome.history.getVisits({
            url: item.url
          }, function(visits){
            item.visits = visits;
            return donecb();
          });
        }, function(){
          var output, i$, ref$, len$, item, j$, ref1$, len1$, visit, newitem;
          output = [];
          for (i$ = 0, len$ = (ref$ = results).length; i$ < len$; ++i$) {
            item = ref$[i$];
            if (item.visits == null) {
              output.push(item);
              continue;
            }
            for (j$ = 0, len1$ = (ref1$ = item.visits).length; j$ < len1$; ++j$) {
              visit = ref1$[j$];
              newitem = {};
              import$(newitem, item);
              import$(newitem, visit);
              output.push(newitem);
            }
          }
          output = prelude.sortBy(function(it){
            return it.visitTime;
          }, output);
          return callback(output);
        });
      });
    },
    chrome_history_allvisits: function(callback){
      return chrome.history.search({
        text: '',
        startTime: 1447759578870,
        maxResults: Math.pow(2, 31) - 1
      }, function(results){
        console.log('got results for chrome_history_allvisits');
        return async.each(results, function(item, donecb){
          return chrome.history.getVisits({
            url: item.url
          }, function(visits){
            item.visits = visits;
            return donecb();
          });
        }, function(){
          var output, i$, ref$, len$, item, j$, ref1$, len1$, visit, newitem;
          console.log('async eachSeries done');
          output = [];
          for (i$ = 0, len$ = (ref$ = results).length; i$ < len$; ++i$) {
            item = ref$[i$];
            for (j$ = 0, len1$ = (ref1$ = item.visits).length; j$ < len1$; ++j$) {
              visit = ref1$[j$];
              newitem = {};
              import$(newitem, item);
              import$(newitem, visit);
              output.push(newitem);
            }
          }
          output = prelude.sortBy(function(it){
            return it.visitTime;
          }, output);
          return callback(output);
        });
      });
    },
    chrome_history_timespent_url: function(callback){
      return getcomp('chrome_history_allvisits_fast', function(results){
        var url_to_timespent, i$, len$, idx, item, visitTime, url, nextitem, visit_duration, nextVisitTime;
        url_to_timespent = {};
        for (i$ = 0, len$ = results.length; i$ < len$; ++i$) {
          idx = i$;
          item = results[i$];
          visitTime = item.visitTime, url = item.url;
          nextitem = results[idx + 1];
          visit_duration = 30 * 1000;
          if (nextitem != null) {
            nextVisitTime = nextitem.visitTime;
            visit_duration = Math.min(visit_duration, nextVisitTime - visitTime);
          }
          if (url_to_timespent[url] == null) {
            url_to_timespent[url] = visit_duration;
          } else {
            url_to_timespent[url] += visit_duration;
          }
        }
        return callback(url_to_timespent);
      });
    },
    chrome_history_timespent_domain: function(callback){
      return getcomp('chrome_history_timespent_url', function(results){
        var domain_to_timespent, domain_matcher, url, timespent, domain_matches, domain;
        domain_to_timespent = {};
        domain_matcher = new RegExp('://(.[^/]+)(.*)');
        for (url in results) {
          timespent = results[url];
          domain_matches = url.match(domain_matcher);
          if (domain_matches == null || domain_matches.length < 2) {
            continue;
          }
          domain = domain_matches[1];
          if (domain_to_timespent[domain] == null) {
            domain_to_timespent[domain] = timespent;
          } else {
            domain_to_timespent[domain] += timespent;
          }
        }
        return callback(domain_to_timespent);
      });
    },
    real_timespent_domain: function(callback){
      return getlist('browsing_time_by_site', function(results){
        var domain_to_timespent, i$, len$, idx, item, host, interval;
        domain_to_timespent = {};
        for (i$ = 0, len$ = results.length; i$ < len$; ++i$) {
          idx = i$;
          item = results[i$];
          host = item.host, interval = item.interval;
          if (domain_to_timespent[host] == null) {
            domain_to_timespent[host] = interval * 1000;
          } else {
            domain_to_timespent[host] += interval * 1000;
          }
        }
        return callback(domain_to_timespent);
      });
    },
    real_timespent_url: function(callback){
      return getlist('browsing_time_by_site', function(results){
        var url_to_timespent, i$, len$, idx, item, url, interval;
        url_to_timespent = {};
        for (i$ = 0, len$ = results.length; i$ < len$; ++i$) {
          idx = i$;
          item = results[i$];
          url = item.url, interval = item.interval;
          if (url_to_timespent[url] == null) {
            url_to_timespent[url] = interval * 1000;
          } else {
            url_to_timespent[url] += interval * 1000;
          }
        }
        return callback(url_to_timespent);
      });
    },
    browsing_time_collection_starttime: function(callback){
      return getlist('browsing_time_by_site', function(results){
        var earliest_time, i$, len$, idx, item, timestamp;
        earliest_time = Date.now();
        for (i$ = 0, len$ = results.length; i$ < len$; ++i$) {
          idx = i$;
          item = results[i$];
          timestamp = item.timestamp;
          earliest_time = Math.min(earliest_time, timestamp);
        }
        return callback(earliest_time);
      });
    }
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
