#!/usr/bin/env node
const colors        = require('colors')
const parseString   = require('xml2js').parseString
const http          = require('http')
    
const loaderOptions = {
    frames: [
        ' _____________🚌',
        ' ____________🚌_',
        ' ___________🚌__',
        ' __________🚌___',
        ' _________🚌____',
        ' ________🚌💨____',
        ' _______🚌__💨___',
        ' ______🚌____💨__',
        ' _____🚌______💨_',
        ' ____🚌________💨',
        ' ___🚌__________',
        ' __🚌___________',
        ' _🚌____________',
        ' 🚌_____________',
    ],
    interval: 80
}
const loader = require('cli-loader')(loaderOptions)


const API_URL = 'http://www.labs.skanetrafiken.se/v2.2/stationresults.asp?selPointFrKey=80147'

const xmlToJson = (url, callback) => {
  var req = http.get(url, function(res) {
    var xml = '';
    
    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    }); 

    res.on('timeout', function(e) {
      callback(e, null);
    }); 

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}

loader.start()
console.log()

xmlToJson(API_URL, (err, data) => {
    if (err) {
        return console.err(`Oh no! Error! ${err}`)
    }

    let allBusses = data['soap:Envelope']['soap:Body'][0].GetDepartureArrivalResponse[0].GetDepartureArrivalResult[0].Lines[0].Line

    let myBusses = allBusses.filter(bus => {
        return bus.Towards[0] === 'Västra hamnen via Dockan'
    })

    // Timeouting the output because loader is cute
    // One of those cases where slower performance === a better user experience
    setTimeout(() => {
        loader.stop()

        myBusses.forEach(bus => {
            const next          = new Date(bus.JourneyDateTime[0]).getTime()
            const now           = Date.now()
            const difference    = new Date(next - now)
            const hoursLeft     = String(difference.getHours()).substr(-2)-2 // TODO - not sure why -2 is needed
            const minutesLeft   = String(difference.getMinutes()).substr(-2)

            const preOutput     = ' 🚌 💨  En buss går om'
            const postHours     = hoursLeft <= 1 ? 'timme' : 'timmar'
            const postMinutes   = minutesLeft <= 1 ? 'minut' : 'minuter'

            if (hoursLeft == 0) {
                console.log(`${preOutput} ${colors.green(minutesLeft)} ${postMinutes}.`)
            } if(hoursLeft == 1) {
                console.log(`${preOutput} ${colors.green(hoursLeft)} ${postHours} och ${colors.green(minutesLeft)} ${postMinutes}.`)
            }
        })
    }, 2000)
})
