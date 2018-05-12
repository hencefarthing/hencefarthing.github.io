---
layout: post
author: Logan G
title: Creating an RSS "App" in Workflow 
categories: workflow code
---
A few months ago, I found that I have a problem. 
I could not find an RSS reader that I really liked and enjoyed using. 
After trying them all to great frustration, I thought ɪ ʜᴀᴠᴇ ᴠᴇʀʏ ʟɪᴍɪᴛᴇᴅ ᴄᴏᴅɪɴɢ ᴇxᴘᴇʀɪᴇɴᴄᴇ ᴀɴᴅ ᴏɴʟʏ ᴜsᴇ ɪᴏs, ʜᴏᴡ ʜᴀʀᴅ ᴄᴏᴜʟᴅ ɪᴛ ʙᴇ ᴛᴏ ᴍᴀᴋᴇ ᴍʏ ᴏᴡɴ? [^1]. 
So with that settled, I decided to go ahead and do just that. 
Let us begin. 
 


Having heard great things about Pythonista, and being quite addicted to all of [Dr. 
Drang's](leancrew.com) posts about using Python, I decided to give that a shot. 
Things went… *poorly*. 
As previously alluded to, I have very limited experience coding with actual words and syntax. 
One class for one semester in college is about it. 
[^2] So, having failed, I gave up and went back to the last reader I'd been using — `insert dramatic pause here` — for about a week, until I got frustrated again. 
So I decided to set out and see what I could do with a tool I *do* understand: [Workflow](workflow.io). 
[^3]

## My Requirements
My first step in the process was to figure out what exactly it was that I wanted from an RSS Reader. 
This was relatively easy, since I had been thinking about it every time I got frustrated at another app. 
All I really had to do was put them in order:

1. 
iCloud syncing so it is available on all my devices. 
 

1. 
Triage Mode to quickly filter through articles I read somewhere else or have little to no interest in. 
 

2. 
 Default open in a consistent (and pretty) reader view, but be trivially easy to switch to the full page as I would see it in Safari (including add blockers). 
 

3. 
Easy to share to any other app and/or reading list. 
 

4. 
Use JSON feed where possible. 
[^4]

## Where to start?
I had previously played with downloading and interpreting both RSS feeds and JSON feeds in Workflow before, and both are quite easy. 
It has dedicated actions for fetching from RSS feeds and interpreting the 'articles' that are returned and it has relatively intuitive handling of dictionaries. 
Confident these would not be the main problem, I decided to start by doodling on a piece of paper and contemplating how to store my feeds and articles. 
 


I started with a data structure similar to [Dr Drang's](http://leancrew.com/all-this/2018/02/my-feed-reading-system/), but ended up a bit far afield so that it would be stored in one file and because I felt I did not have as many variable I cared about for each. 
The final data file includes:

* The last refreshed time
* An array of the JSON Feeds
	* containing the Keys: `title`, `feed_url`, `description`, and `home_page_url`
* An array of the RSS Feeds
	* Each is just a single Key:Value pair of URL and Feed Title
* An array of articles (limited to the last 3 days)
	* containing the keys: `date_published`, `_read`, `title`, and `url`

I don't necessarily need all this data, but — and I'm being perfectly honest here — I was bored of thinking about data files and just wanted to make a thing. 
So I moved on to how I wanted this to work. 
 


As far as I could tell, my 'app' needed to do 3 main things: check for new articles, open/display articles, and mark them as read. 
 


## Reading Articles
This section is simple. 
This section is *so* simple that I probably didn't have to make a section for it. 
But it was the first thing I did. 
Because sometimes we need small wins to gain momentum. 
So, here is how I implemented the reading of articles:

![This is the only screensho because I got lazy.](/images/201805workflow.jpg)

So, that was fun, wasn't it? Lets move right along. 
 


Ok, fine, I'll explain the picture. 
The first block in this code retrieves a dictionary where each key is a title and each value is a URL. 
The next block presents a list of these to the user.[^5] The `Get URLs from Input` block is not strictly necessary, as Workflow is already very smart about knowing how to present each piece of data, but it makes me feel better. 
And the part that actually does things: `Show Web Page` shows… your… webpage… ʏᴇᴀʜ, sʜᴏᴄᴋɪɴɢ ʀɪɢʜᴛ?. 
I have `Enable Safari Reader` turned on because I generally prefer that standardized version of reading. 
But to each their own. 
 


## Updating the List of Articles
This is where it starts to get a little involved. 
After several false starts at the updating portion of this, I actually ended up creating several different Workflows — essentially the way that "real" coding uses functions. 
I created 4 subservient functions, the relevant one of which I cleverly called **Updater**. 
The Updater starts with initiating a counting variable then reads in the existing list of articles to read and stores it as `articles`. 
Then for each feed, it loads anything published in the last 2 days[^6]. 
It compares this list to the list of read articles, anything new it finds it reformats, adds to `articles`, then increments the count variable. 
Finally, it saves the new list of articles back into `data.txt` along with a new updated time. 
Finally it displays an alert of how many articles were added to the list. 
 



## Marking Articles as Read
Marking as read seems easy, doesn't it? I thought so too. 
Until I realized there was a feature I wanted to add: the ability to triage my list of articles and remove anything I wasn't interested in or had already read elsewhere. 
So marking as read actually happens 2 places: the sub-workflow called **Read** and the sub-workflow called **Triage**.[^7]

The Read workflow is relatively simple:
1. 
Instantiate a dictionary `Reading list`
2. 
Retrieve list of articles from `data.txt`
3. 
Add anything with a value of `false` in the `_read` key to `Reading list`
4. 
Let the user choose an article to read (see the Reading Articles section)
5. 
Update the list of articles with the *one* that has been read.[^8]
6. 
Save `data.txt`

The Triage workflow I actually just duplicated the Read workflow and changed a few things:
* Add a counter of how many articles are removed
* Get rid of the `Show Web Page` action. 
 

* Change the `Choose from List` action to allow selecting multiple. 
 


## Putting It All Together
That's all well and good, but its a pain to go run each sub-workflow on its own. 
Its also a pain because the **Read** workflow only reads a single article, so you have to continuously re-run it. 
So I made one main workflow that calls the others while managing flow and providing a structure. 
This being the main Feeder, I decided to name it **Hummingbird**[^9]. 
 


The first thing Hummingbird does is pull up the main data file and read the `updated` key for the last time the list was refreshed. 
Next, it runs the fourth (and hitherto unmentioned) sub-workflow: **Count**. 
Count gets called several more times, because pulling up a number for how many unread articles there are is more actions than I wanted to put in here 4 times. 
Could I have included this in `data.txt`? Probably, but I didn't think of that until *right now*. 
So ¯\\\_(ツ)\_/¯

With this new information it presents the user with a dialogue with the number of unread articles and how long ago the list was updated and a checklist of which options to do next:

>🔄 Update
>☑️ Triage
>🤓 Read

By default, all the options are checked. 
The user may adjust these before pushing continue. 
Then:
1. 
If `🔄 Update` is selected, the sub-workflow **Updater** is run. 
 

2. 
**Count** is run. 
If it returns 0, the user is told `😱 Nothing to read!` and Hummingbird quits. 
Otherwise we continue. 
 

3. 
If `☑️ Triage` had been selected, the sub-workflow **Triage** is run. 
 

4. 
If `🤓 Read` was selected, **Count** is run. 
This provides the number of time to iterate through running **Read**. 
At any time in the repeat, the user can push cancel to quit. 
If they get through all the articles they are told `All articles read!` and Hummingbird quits. 
 


# Conclusion
This way of reading RSS feeds is inferior to literally every other way I have heard of, even Dr Drang's post which inspired me. 
That said, it fits my needs perfectly and I will continue using it for the foreseeable future. 
Yes, it is a bit cumbersome and not as polished as a dedicated app would be, but I only follow a few feeds, none of which has particularly high output, so I have about a dozen articles added on busy days, and just a couple on slow days. 
It certainly couldn't be considered pretty by any stretch of the imagination, but I prefer the Safari Reader view to every other RSS or read-it-later app I've tried and I'm not really spending much time in the UI anyway. 
It has zero built in integrations with any services, but typically, I don't need to share articles to other services or people, and when I do, Safari's share sheet is perfectly serviceable. 
 

As of late, I have been trying to limit both the number of apps I have on my phone and the number of services I rely on.[^10] This certainly helps with that effort. 
Now I have fewer apps to manage, fewer accounts/subscriptions to worry about, and — importantly — my feed reader is completely portable to any iOS device with 0 effort and any device that can read JSON with just a little effort. 
But most of all, every day when I sit down to do some casual reading, I open something I created and feel a little bit of pride at having been able to do it. 
 


[^1]: Ok, I have lots of problems. But lets stay focused on the RSS reader for now. 
 


[^2]: What can I say, I’m a mechanical engineer ¯\_(ツ)_/¯

[^3]: If you want to learn how to use Workflow, read anything and everything by Federico Viticci over at [MacStories](macstories.net). Club MacStories is worth the price of admission for that alone. 
 


[^4]: I have a bit of a fondness for JSON feed just because it is easier to interpret and I am a huge fan of how workflow handles JSON (which it calls dictionaries). 
 


[^5]: Conveniently, when Workflow asks a user to “Choose from List”, it present the Keys as larger font in bright blue, with the values smaller and in black beneath them. 
 


[^6]: To avoid a problem [Dr. Drang ran into.](http://leancrew.com/all-this/2018/02/feed-reader-robustification/)

[^7]: You think I’m clever now? Just wait until I tell you what I decided to name the entire set-up. 
 


[^`8]: **SPOILER ALERT** The fact that its just one comes back soon. 
 


[^9]: You thought it actually wasn’t going to be clever, but it was slightly clever. Go me!

[^10]: I’m trying to simplify some parts of my life and view my devices and apps as tools instead of toys. This helps with that effort.