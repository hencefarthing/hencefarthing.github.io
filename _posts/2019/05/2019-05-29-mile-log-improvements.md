---
author: Logan G
layout: post
title: Mileage Log Improvements
categories: automation Drafts Shortcuts
---

I'm currently logging how many miles I drive each day, mainly so the information can help me with car purchasing decisions down the line. After brief thought I decided the most reasonable way to do that was to record the value of my odometer first thing in the morning, capturing _all_ of yesterday's driving, then resetting it. This is a documentation of the way it used to be done, and the new, improved method.  

The old method was created using the shortcuts app, and required a few steps of manual input. A quick swipe to the widgets and I could tap "Log Miles". Doing so presented me a date picker, because I sometimes found myself logging at the end of the day. Assuming I tap "Yes", I would be taken to a numeric input for number of miles.   
![Date picker on the top, mileage input on the bottom](/images/mile-log/widget.jpeg)  
The shortcut is shown below. I won't walk through all the details, because its a smaller script, but here is the executive summary. Ask if this is from yesterday or not, if not display a standard iOS date picker to select the date. If it was from yesterday, grab yesterday's date. Ask for the number of miles, using a standard number input widget. This is rounded to one decimal point, because I found sometimes shortcuts would output my final text file with 16… 😵. The date and rounded number are then written to a text file in CSV format. [^the `Append to File` action includes a deleted variable `version №` because I accidentally had to create a new version of the script to fix the decimal point bug. The version number was simply a text field at the beginning of the shortcut]  
![The shortcut as seen on my iPhone](/images/mile-log/shortcut-01.png)
This worked for a couple months, but continually annoyed me for a couple reasons. Foremost was the fact that I like to keep my phone in my backpack while I'm driving, and this virtually ensured it would be out during my drive to work. I was also finding myself frustrated at the number of taps required to get this simple task done. I thought there had to be a better way, especially because I was just using plain text. And then I remembered about Drafts and Scriptable.  
Despite Scriptable's superior JavaScript engine I ended up with Drafts, because the Watch app enables effortless data entry without my phone, whereas Scriptable suffers some of the same limitations Shortcuts does. Now I simply dictate a number into my Watch when I get in the car, then process it on my iPad or iPhone whenever I feel like it, even many days later.  

The processing is done using a `Log Miles` action, which consists of a script step and a file step. The script step[^only 4 lines! I'm getting better at this!] grabs the created date of the draft, sets the variable `logDate` to the date before, in the format I want in this file. The last 2 lines set the variable `logEntry` to have the date and mileage and then set that to a template `mileLog`.[^Yeah, I could've done this easier with fewer variables. But it works ¯\_(ツ)_/¯] Templates can be used in other parts of the Drafts action, simplifying the script.[^foreshadowing] The file step of my Drafts action just takes that template tag and appends to a file in iCloud. 

	// create new date object with draft's create time
	var d = new Date(draft.createdAt);
	
	// create a string in the format MM/DD/YYYY, with the correct month and the previous day's date
	var logDate = (d.getMonth()+1) + "/" + (d.getDate()-1) + "/" + d.getFullYear();
	
	// create template tag with date and miles logged
	var logEntry = logDate + "," + draft.content;
	draft.setTemplateTag("mileLog", logEntry);

I've been using the new approach for over two weeks and loving it. There are still improvements to be made, but it's good enough for now.