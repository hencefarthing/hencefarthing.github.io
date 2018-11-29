---
layout: post
author: Logan G
title: Watching Along With Star Wars Minute
categories: ios automation StarWars
---

One of my favorite podcast is [Star Wars Minute][SWM], the daily podcast in which they analyze, scrutinize, and celebrate the _Star Wars_ movies one minute at a time.[^1]  As I write this, the are just beginning their seventh season, featuring _The Force Awakens_. For those of you not quite as entrenched in _Star Wars_ as me, this is the first movie after Disney bought Lucasfilm and hasn't quite been out for 3 years. Seeing how that is less than 2 decades and I've only seen the movie a handful of times, I cannot quite recite it the way I can the Lucas-era Trilogies. So I decided it would be fun to watch the relevant minute of the movie immediately before listening to the podcast each morning. And, being a geek, I felt compelled to make it **way** more complicated than it needed to be.  
[SWM]: starwarsminute.com
[^1]: After nearly 800 episodes, _of course_ I have the intro memorized.

## Break It Down Now
Now, I _could_ just watch the movie like a normal human, except pause at the end of each minute and resume the next day. But that is too easy. Lucky for me, _The Force Awakens_ is one of the last movies I bought on DVD, and I had previously ripped that DVD onto computer for viewing in [Plex][plex]. So, great, I have `The Force Awakens (2015).m4v` file on my computer, how does that help?   
[plex]: plex.com

If I have the bits, there is presumably a way to break them into chunks. My first instinct is to look at [Shortcuts][short] on iOS. No dice, the `Trim Media` action there simply opens the horribly inaccurate native iOS tool to trim manually. Not cool. Maybe my the new-kid-on-the-block [Scriptable][scr] has a way? Not that I see immediately… 🤔  
[short]: https://itunes.apple.com/us/app/shortcuts/id915249334
[scr]: scriptable.app

Well… I did just get a Mac Mini set up as a home server…[^2] TO THE MAC MINI!! Automator proves to be not terribly helpful. But, I stumble up on the documentation for QuickTime's AppleScript support, and what do I behold but a `trim` command? With some reluctance I decide to dive in.   
[^2]: Thank you for _finally_ updating it Apple!

We will go ahead and ignore the things I that didn't work, and focus on the final product:  

```applescript
property segment_length : (60 * 1)tell application "QuickTime Player"	activate	if not (exists document 1) then error number -128	repeat		display dialog "Enter the base name for the export movie file:" default answer ""		set the base_name to the text returned of the result		if the base_name is not "" then exit repeat	end repeat	set the movie_length to the duration of document 1	set the destination_path to the file of document 1	set the origin_path to the name of document 1	set the segment_count to the (movie_length div segment_length)	if (movie_length mod segment_length) is not 0 then set the segment_count to the segment_count + 1	set start_time to 0	repeat with i from 1 to the segment_count		set end_time to start_time + segment_length		set current time of document 1 to start_time		trim document 1 from start_time to end_time		set the target_file to ("Jango Fett:Plex Data:SWM:" & base_name & "-" & (i as string) & ".mov")		export document 1 in file target_file using settings preset "720p"		delay 1		close document 1 without saving		open (destination_path as string)		set start_time to end_time	end repeatend tell
```
I started with code found [here][source], but sadly it threw some errors and never successfully saved more than the first minute, so extensive modification was required.  
[source]: http://hints.macworld.com/article.php?story=20100305070247890

I won't walk through this line-by-line, because that seems like it would be a boring post, and probably unhelpful. Instead, I'll just highlight the interesting (to me) areas and what I struggled with.  

The biggest thing requiring modification was the flow for stepping to the next minute. The original script I downloaded had a function to send a `cmd-Z` keystroke to QuickTime, undoing the trim function. For reasons I am not clear on, that keystroke never got sent, which is why that script only ever created a single minute. My workaround is to collect the file path of the document to be split into `origin_path` in line 13. Then after the export has been completed, the script closes the document, and re-opens the original in QuickTime. This worked flawlessly, though it did make the QuickTime window pop in and out of existence quite a bit.[^3]
[^3]: 139 times, to be exact.

The other thing that I got hung up on is the formatting of file paths. Apparently, the colon character `:` is used a directory separator in APFS, like HFS+ before it. If you don't know what that sentence means, you've probably spent your free time in a more meaningful way than I have.  

There's certainly ways to make this script better, but I will see to those in a year when it's time for Rogue One Minute.  

## The Daily Show
Cool, now I've got one hundred and thirty-nine files named `TFA-№.mov`, what am I supposed to do with that? Well, since I mainly use iOS and I exclusively listen to podcasts iOS, it seemed natural to give Shortcuts a shot for this. And sure enough, I was able to create a shortcut that opens today's minute, allows me to watch it, then begins playing the days podcast.  

![My Star Wars Minute Shortcut](\images\2018-11-SWM.png)

I decided to figure out which minute to watch by using date math, although I could also grab the RSS feed, and use RegEx to pull out an episode number. If the current method fails, I will do that, but for now this works. First thing to do is get the day of the week as a number, with Monday as 1. Then I find the number of weeks since the first episode of this season. Then, _MATH!_  
`episodeNumber = weeksSinceStart * 5 + dayOfWeek`  
You can see some of the tradeoffs of Shortcuts here: I appreciate that I don't have to come up with (and forget) variable names, but it is very irritating to have to drag out a `Calculate` block for each operation instead of just typing it.  
The next bit makes sure we are running from the Shortcuts app, mainly to avoid any memory constraints or glitchyness when opening the video. A `Get File` step is used to open the correct `TFA-№.mov` file, replacing `№` with the episode number. `Quick Look` opens the file in a very rudimentary player, but it has a play button, which is really all i need. The penultimate step starts playing the episode in [Overcast][overcast], my podcast player of choice. And the last step should be removed, and the toggle just above it should be flipped on. Oops. `¯\_(ツ)_/¯`
[overcast]: overcast.fm

## Conclusions? Take aways?
Was this a waste of my time? Probably.  
But I had lots of fun doing it, and I learned some things. I'm not a big fan of AppleScript, although I can definitely appreciate that it is pretty easy to learn for someone who's never coded before. I do have some changes to make in the future, but I'm honestly pretty happy with what I've got right now.

For future Logan's sake, here's the changes you (I) should make:
- Make the AppleScript prettier, more streamlined, and **more commented**
- Pull the current episode number from the RSS Feed to ensure accuracy
- Remove extraneous steps in Shortcuts
- Add a "Hey Siri" command to run the Shortcut.