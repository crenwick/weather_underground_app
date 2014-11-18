weather_underground_app
=======================

[![Build Status](https://travis-ci.org/crenwick/weather_underground_app.svg?branch=master)](https://travis-ci.org/crenwick/weather_underground_app)

Pulls info from the weather underground api of any location and checks if its raining in comparasion to Seattle, WA.

Essentially just takes a useful API and creates a much less uesful one.

`GET /api/:long/:long` to recieve JSON data.

`GET /` to get an html page that tracks your current location, runs it against the API above, and swears at you.

uses http://www.wunderground.com/
