---
layout: post
author: Logan G
title: Never Tell Me the Odds: An NFL Probability Script
categories: ios automation
---

## What Did I Do Now? and Why?
As you may or may not be aware, NFL season has just started here in the US[^1]. Also as you may or may not know, the website FiveThirtyEight has a system for predicting the winners of games, and the winner of the Super Bowl. Their [game prediction page][2] also displays the data in their characteristically easy-to-visually-digest way. I adore casual statistics, and it seems most people I know know a lot about football, so I will spend quite a bit of time on this page over the next few months.  
  
For reasons, I will also be wanting to know the top 5 teams each week.[^3] Unfortunately for me, that page is a nightmare to pull data from. Copy-pasting it into excel involves several further minutes of reformatting. Attempts at pulling the html of the page leave all kinds of cruft, disorganized data, and random white space. I wanted a better way. A better way I could do from my phone. With zero effort. Enter automation.  
  
I had a few choices: iOS-only [Workflow][4]/[Shortcuts][5], python via [Pythonista][6], and JavaScript via [Drafts 5][7]. Workflow/Shortcuts is fun, but can get tedious with arbitrary data , reformatting, and loops. I don't really like/get python. And bouncing between the apps — while possible — is annoying. So, JavaScript was what I ended up on.   
  
Before we really dig into the details of what I've done, I should explain something about JavaScript in Drafts 5. It has quite a few custom methods for interacting with iOS, the device, APIs, and other apps. When I use these, I will mention them.   

## The Script
### Getting the Data
```JavaScript
var http = HTTP.create();
var response = http.request({
  "url": "https://projects.fivethirtyeight.com/nfl-api/2018/nfl_games_2018.csv",
  "method": "GET",
});
if (response.success) {
  var text = response.responseText;
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}
```
The first thing to do is to retrieve the file containing this week's games from the web. FiveThirtyEight _does_ publish the raw data from every NFL game ever, as well as the [python code][8] to run their simulation. At first I thought I would have to run their simulation instead of processing the webpage, because it would actually be significantly easier.[^9] But while actually reading their `README.md`, I discovered they have [this CSV file][10] showing just the current season, and including the probabilities for upcoming games. How convenient for my needs!  
  
So this first block of code relies on some methods built in to Drafts: [HTTP][11] and [HTTPResponse][12]. These are made for interacting with APIs, but they work well enough for just pulling down a data file as well. To be honest, I basically copied the examples then altered them slightly. The text returned by a GET call to the URL is saved as the variable `text`; the data response turned out to be useless, so I do not use that variable. The `else` statement returns an error if the script craps out here — a practice I did not keep up through the rest of the script.

### Time for a Transformation
```JavaScript
function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

var rawGames = csvJSON(text);
```
The data file is a pretty standard CSV: first line is the column headers, all columns are separated by commas, all rows by new lines. Nice that there's nothing wacky going on, but a text string riddled with commas doesn't do me much good, and it seemed a bit beyond my current skill to translate to a more useable format myself. So I went poking around on the internet. After not too long I stumbled upon [this][13]. The comments pointed out some flaws for edge cases, but my current use was not an edge case, and the code looked simple enough. It even included two different output options, which I though would give me any flexibility I needed.  
  
So, the TL;DR here is this: I searched for someone else's CSV→JSON function, copy-pasted it, and then called it. 👍🏼  It returns an array of objects that have a parameter for each column  of the CSV. Perfect.   

### The Part Where I Actually Do Something Besides Copy-Paste
```JavaScript
var upcomingGames = [];
for(var i = 0; i < rawGames.length; i++) {
	if (rawGames[i].elo_prob1 > 0 && rawGames[i].score1+rawGames[i].score2 == 0) {
		if(rawGames[i].elo_prob1 > 0.5) {
			upcomingGames.push(Math.round(rawGames[i].elo_prob1*10000)/100 + "% • " + rawGames[i].team1 + " d. " + rawGames[i].team2);
		} else if(rawGames[i].elo_prob1 < 0.5) {
			upcomingGames.push(Math.round((1-rawGames[i].elo_prob1)*10000)/100 + "% • " + rawGames[i].team2 + " d. " + rawGames[i].team1);
		}
	}
}
var ascending = upcomingGames.sort();
var descending = ascending.reverse();
```
Alright, the part we've all been waiting for, the part where Logan actually writes his own code.  
  
The JSON, like the CSV before it, included lots of data points: `date`,`season`,`neutral`,`playoff`,`team1`, `team2`, `elo1`, `elo2`, `elo_prob1`, `score1`, `score2`, and `result1`. I don't need every data point for every game this season, I only need the probabilities and teams playing for this week's upcoming games. So, I started by making an array to store that info. Off to a thrilling start!!   
  
Populating that array is done by looping through the list of games, and selecting the ones I want to add. The first `if` statement looks for games that _do_ have a probability `elo_prob1` assigned but _don't_ have a score reported for either team, `score1` and `score2`. 
- FiveThirtyEight's probabilities are based on the Elo rating each team is assigned, and those can only be calculated after each game is complete, so only games that are the next game each team will play have a value in `elo_prob1` — this rules out all future games. 
- I'm unaware of any NFL game ever ending in a 0–0 tie — assuming  this holds true, this eliminates all games that have already been played.  
  
This data file essentially gives the probability of the home team winning. But what I'm looking for are the most likely winners across the league — even if they're an away team. So what I need is a way to compare the likely winner from every game — every probability should be greater than 50%. So the `if` statement separates the games that are >50% and <50% so I can treat them differently when adding to my `upcomingGames` array.[^14]   
  
I decided to store everything in a single array and sort that, so it needs to be an array of strings to save probabilities as well as teams. The probabilities should be first for sorting reasons, and they should be reformatted to be more human readable. I settled on the format: `XX.XX% • YYY d. ZZZ` where `YYY` and `ZZZ` are the default team names in the file. I may change this later. Or maybe I won't. 🤷🏼‍♂️   
  
So I use the the `.push` command to add a new value to the array. In order to get the decimal places I wanted, I decided to multiply the probability by 10000, round, then divide by 100. Is there a better way to do this? Maybe.   
  
For games where the home team is expected to lose, I first subtract the probability from 1 to reverse it. The rest of the `.push` command concatenates strings in my desired formatting. Note: for `elo_prob1 > 0.5`, `team1` is added first; for `elo_prob2 < 0.5`, `team2` is added first.[^16]   
  
I asked my buddy Alex how to get the top 5 values from an array, and he gave me a very elegant one-line way to do it. Unfortunately, I ended up make an array of strings instead, so his solution threw an error when I ran it. Instead of troubleshooting I went with the inelegant but effective solution that seemed obvious from the W3Schools page on [arrays][17]: Sort (A→z, 0→9), then reverse (9→0).[^15] Now I have a list of upcoming games, sorted from most probable winner to least.  

### The Part Where I'm a Nerd
```JavaScript
var todo = TJSTodo.create();
todo.title = "Make Picks";
todo.when = "tomorrow";
todo.list = "NFL Pool";
todo.notes = "http://www.poolhost.com/index.asp?page=picks.asp";
for (var i = 0; i < 6; i++) {
	var checklistItem = TJSChecklistItem.create();
	checklistItem.title = descending[i];
	todo.addChecklistItem(checklistItem);
}
var container = TJSContainer.create([todo]);
```
What to do with this list? Well ultimately, I need to go to a website and check 5 boxes with my picks. But, since I'm easily confused and a bit of a dork, I felt the need to make a checklist in my task manager of choice, [Things 3][18]. Even better, I make this checklist appear in the right project and for tomorrow.  
  
Much of this section uses the methods built into Drafts for integrating with Things, and these are best explained in the [Drafts documentation][19]. To summarize:
1. Create a To Do
2. Set the title of the to do to make picks
3. Set the date of the to do to tomorrow
4. Set the list (project) for the todo to appear in to "NFL Pool"
5. Set the notes to the web page I open to make my picks so I can just tap it.
6. Create a checklist of the most likely games
7. Create a 'container' object, which is needed for actually sending the to do to Things.
  
The one thing worth noting here is the step to create a checklist. The loop iterates 6 times, each time pulling the item from the array corresponding to the iteration of the loop. It adds that item as a checklist item.   
  
You may be thinking "I thought you needed the top 5 Logan, but your loop iterates 6 times". You'd be absolutely correct. There is always a chance a team will be expected to beat the team we root for in this household, and if that's the case we don't pick against our team. We ignore that and pick the 6th most likely. A man has to stand for something after all.[^20]

### Sending It to Things
```JavaScript
var cb = CallbackURL.create();
cb.baseURL = container.url;
var success = cb.open();
if (success) {
	console.log("Task created in Things");
}
else {
	context.fail();
}
```
This code simply opens an x-callback URL — the standard method of inter-app communication on iOS — and displays a success or failure message. Pretty straight forward.

## But What Do You Do With It?
On Tuesday each week, for the rest of the NFL season, as task like this pops up in my task manager:

![The task that sets it all off](/images/NFLScript/ChooseTeams.jpeg "Choose Teams Task")

Tapping the link runs this script, and before I know it, everything we've talked about happens behind the scenes and I have a new task in my task manager for the next day (Wednesday). This new task looks like this:

![For Week 2 of the 2018 season](/images/NFLScript/MakePicks.jpeg "The Result")

The next day, when I tap the link in the notes it opens the page we make our weekly picks on. If I do this on my iPad (or a Mac), I can have both task & webpage open side by side. 

![image](/images/NFLScript/iPadPicking.jpeg)

As I select a team on the webpage, I check it off on the task. Whichever team from the task I don't use, I cancel. Ta-Da!!

Now I don't have to look for the top 5 numbers and hope I don't miss one, nor do I have to deal with reformatting and sorting in Excel or Numbers every week. Plus maybe I learned a thing or two about JavaScript along the way.

## For Your Copy-Paste Pleasure
```JavaScript
//create HTTP object
var http = HTTP.create();

//get contents of URL via HTTP
var response = http.request({
  "url": "https://projects.fivethirtyeight.com/nfl-api/2018/nfl_games_2018.csv",
  "method": "GET",
});

//save url contents and/or report error
if (response.success) {
  var text = response.responseText;
  var data = response.responseData;
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}

//function to convert CSV to JSON
// courtesy of http://techslides.com/convert-csv-to-json-in-javascript
//var csv is the CSV file with headers
function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

//convert game CSV data to JSON
var rawGames = csvJSON(text);

//create array to house upcoming games
var upcomingGames = [];

//find games that have a probability but have not been completed - effectively only this weeks
//games with a >50% probability get added to upcomingGames in the format "XX.XX% • YYY d. ZZZ"
//games with a <50% probability get the prob & teams swapped then added to upcomingGames
for(var i = 0; i < rawGames.length; i++) {
	if (rawGames[i].elo_prob1 > 0 && rawGames[i].score1+rawGames[i].score2 == 0) {
		if(rawGames[i].elo_prob1 > 0.5) {
			upcomingGames.push(Math.round(rawGames[i].elo_prob1*10000)/100 + "% • " + rawGames[i].team1 + " d. " + rawGames[i].team2);
		} else if(rawGames[i].elo_prob1 < 0.5) {
			upcomingGames.push(Math.round((1-rawGames[i].elo_prob1)*10000)/100 + "% • " + rawGames[i].team2 + " d. " + rawGames[i].team1);
		}
	}
}

//sort array, then reverse it so it goes high to low
var ascending = upcomingGames.sort();
var descending = ascending.reverse();

//create a todo to be sent to Things 3 on iOS (Things 3.4 or greater)
var todo = TJSTodo.create();
todo.title = "Make Picks";
todo.when = "tomorrow";
todo.list = "NFL Pool";
todo.notes = "http://www.poolhost.com/index.asp?page=picks.asp";

//add the first 6 items in the array to the Things checklist (should be highest probability games)
for (var i = 0; i < 6; i++) {
	var checklistItem = TJSChecklistItem.create();
	checklistItem.title = descending[i];
	todo.addChecklistItem(checklistItem);
}

// create a container to handle creation of Things URL
var container = TJSContainer.create([todo]);

// Use CallbackURL object to open URL in Things.
var cb = CallbackURL.create();
cb.baseURL = container.url;
var success = cb.open();
if (success) {
	console.log("Task created in Things");
}
else {
	context.fail();
}
```

[^1]: Go Broncos!!
[2]: https://projects.fivethirtyeight.com/2018-nfl-predictions/games/?ex_cid=rrpromo
[^3]: Ok, ok. I'm participating in a pool where you get to pick 5 winners each week. At the end of the season, top 3 people win a prize(💰). I screwed up the last two weeks last year and got 3rd ಠ_ಠ
[4]: https://www.workflow.is
[5]: https://www.apple.com/ios/ios-12-preview/
[6]: http://www.omz-software.com/pythonista/
[7]: https://getdrafts.com
[8]: https://github.com/fivethirtyeight/nfl-elo-game
[^9]: The simulation is surprisingly simple for being as accurate as it is. It only requires all the scores and dates of previous games, who the home team was, and a couple seconds to churn.
[10]: https://projects.fivethirtyeight.com/nfl-api/2018/nfl_games_2018.csv
[11]: https://reference.getdrafts.com/objects/HTTP.html
[12]: https://reference.getdrafts.com/objects/HTTPResponse.html
[13]: http://techslides.com/convert-csv-to-json-in-javascript
[^14]: Yes, I assumed no game is ever going to be exactly 50/50. FiveThirtyEights's probabilities are reported to 16 decimal places. And I would need **ALL 16** games in a given week to be 50/50 for it to affect me. I feel ok about this assumption.
[^15]: I shouldn't run into any problems unless theres a game this season with a 100%, which is so unlikely as to be negligible. There are no single digit probabilities because they will have been reversed into 90+% earlier in the script.
[^16]: An alternative method would be to add the odds of team 1 winning and the odds of team 2 winning for every upcoming game. This gives a more complete picture in an array double the size. But, it runs into some sorting edge cases that would be a pain. And I didn't think of it until I was already done. So too bad.
[17]: https://www.w3schools.com/js/js_array_sort.asp
[18]: https://culturedcode.com/things/
[19]: https://reference.getdrafts.com/objects/Things.html
[^20]: Go Broncos!