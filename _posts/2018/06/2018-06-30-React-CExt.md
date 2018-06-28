---
layout: post
title: React / Chrome Extension Inception Conception
author: Alex B
categories: code on-theme
---

This month, Logan and I picked a theme much more involved than last month's theme "food". Logan came up with this one, and I can't wait to read what he writes about (shoot, I'm posting this after he already posted his). For June, we are writing about a challenge we've faced (or are currently facing) and how we motivated ourselves to work through it. I have definitely faced many challenges in my past, and I have probably not worked through many of them. However, today I'll shed some light on a project I'm working on that has taken me much longer than expected, and I'll hopefully provide enough detail for future Alex or future Logan to come back and follow the steps ease.

## The Project
The project I'm writing about today is not just a random side project that I've been working on. No, no... As Logan knows and has experienced, I'm not always good at following through on those types of projects. This project actually started as an idea I had at work, and when I mentioned it to my boss, it immediately jumped onto my to-do list with a relatively urgent priority. My project was to write some code that will make it possible to easily remind users to reset their passwords every 6 months. Users of what? Passwords to what? Not important. Let's just say it's some program you'll never need to access.

So why did I recommend some password reset reminder project like this to my boss? Around two months ago I had two different friends come up to me asking for tech help. One friend needed help recovering an account password, and another wanted ot know if I could hack into a stolen friend's smartphone. I was kindof honored to be asked if I knew how to hack phones, and I won't tell you if I helped that friend or not [^2], but the most interesting story to me was the friend of a friend who needed to recover an account password. In truth, this friend actually need to re-gain access to his / her Facebook account. This person had sent some nude pictures to a friend (I'm trying to be as vague as possible), and someone hacked the Facebook account and was attempting to blackmail said person. When I first heard about the situation, I researched about 50 different solutions and methods for recovering Facebook accounts, getting your account deleted, etc. To cut the long story short, the friend of a friend ended up going to the police station, the police tracked down the hacker, and now life is good and his / her Facebook account is "secure" again.

These stories would probably be a waste of everyone's time if nothing came of it... So what can you learn from them? For starters, creating a strong password for your online account is super useful! Don't assume everything will be just fine when you set a password as "password321". Yes you're sneaky by adding decreasing consecutive numbers instead of increasing, but that's not going to slow down anyone trying to hack your account. Second (and possibly more importantly), **never use the same password for multiple cricial accounts**. I'd consider only a few online accounts as "critical", such as Facebook and Google. These companies have lots of experience backing authenticating users and trying to keep data safe. They're also major targets for hackers, so following their recommendations is very important.

Ok I'm not here to just talk about password security, you can read more about that here: ([String Passwords](https://www.wired.com/story/7-steps-to-password-perfection/)) or here ([Using Password Managers](https://www.howtogeek.com/141500/why-you-should-use-a-password-manager-and-how-to-get-started/)). Now I'll explain how I am attempting to make the aforementioned "users" a bit safer. My project will remind people to change their passwords every 6 months so that it will be difficult for anyone to get someone's password. If anyone hacks an account and tries to use the account without anyone noticing, the password will get changed later and the hacker will no longer have access. Additionally, if a user saves his or her password in the browser they are using, that password will be invalid eventually, making it more difficult for anyone else to stumble onto that computer and into the "program". Users who don't change their password in time will get a strongly worded email reminding them to be safe, do the right thing, and make a new strong password.

## The Tools
Before beginning this project, I had to decide which tools to use. Passwords for the "system" are stored in an online database so I'd have to use some kind of web APIs (my favorite) to query the database, and I just finished a course on `React.js` which also included how to send API requests with [`axios`](https://www.npmjs.com/package/axios), so I decided to do something a bit funky. I decided to build a Chrome Extension that reads passwords from the database and passes that data to a React.js application, which analyzes the data and stores the output in Firebase. Was this the best idea ever? Who knows. But at least I would get to dive deeper into the React.js framework I've been learning about recently, AND integrate it into a Chrome Extension.

Before you begin following my project plan, I'd recommend downloading the [Git Powershell](https://git-scm.com/book/en/v2/Appendix-A%3A-Git-in-Other-Environments-Git-in-Powershell) windows app. If you're on Mac or linux, have fun with your beautiful terminal - there also may be some differences in this process, sorry - I've only tested this on Windows 10.

Chrome extensions are notoriously annoying to test, as you typically have to keep going back and refreshing the extension (in `chrome://extensions`), so my setup will allow you to spin up a basic chrome extension that points to a built react app. Before passing data from the chrome extension to the React app, you can just run and test the un-built app until you're ready to deal with production data. Once you're ready with the basic react app, you can then make sure it works in the chrome extension (as it should), and finally, deploy it to the Chrome web store (if desired).

Now let's look at the setup tasks needed to get this project off the ground.

## The Setup
- Make sure you have [`node.js`](https://nodejs.org/en/) installed on your machine (also `npm` -> I'd also recommend installing `nvm` for mac or [windows](https://github.com/coreybutler/nvm-windows), but I won't say much about `nvm` in this post)
- globally install [`create-react-app`](https://github.com/facebook/create-react-app) via `npm install -g create-react-app`. I would recommend installing this package globally on your machine (using the `-g` param) so that in the future, you can create new react apps from your terminal, in any directory.
- Using your favorite terminal program [^1], cd into the folder where you will want your app to be held.
- Create a new React app with `create-react-app appName` - you can use your own app name by replacing `appName` with the name you want.

From here, you should see a few `.json` files and a few folders called `/public`, `/scripts`, and `/src`. The `/public` and `/src` folders are very important. `/src` will hold pretty much all of the interesting `React.js` code, and `/public` will contain the Chrome Extension code. As I mentioned earlier, we're going to run our extension off of a 'build' React app. What you see right now is an un-build React app. To build your app, just type `npm run build` from your terminal editor. Once you do this, Webpack (I'm not going to go into how Webpack works - it's pretty complicated) will package your app into a new folder called `/build`, and files inside this folder will make up our chrome extension.

Ok, now it's time to take a brief look at how a chrome extension works. Chrome extensions need a few config files to pull everything together. If you've never build a chrome extension before, check out this [`Getting Started`](https://developer.chrome.com/extensions/getstarted) page. The `manifest.json` file holds much of the critical config for the extension, so we have to make sure it's in a suitable place in our code. React apps (built with `create-react-app`) also have a `manifest.json` file by default, located in the `/public` directory. You'll have to edit this file with properties needed by chrome extensions, but keep the `manifest.json` file here - in the `/public` directory! During the "build" stage, all files in this `/public` directory will be copied directoy into your `/build` folder, which is exactly what we want! When we set up our unpacked chrome extension, we will tell Chrome to look for our `manifest.json` file, right here in the `/build` folder (not the `/public` folder).

**Note**: If you want to build your app into a different directory (or with a different directory name), edit `/config/paths.js` -> the line `appBuild: resolveApp('<folder name>')` can be changed to whatever you want.

Finally, you'll need to hook up your extension's `manifest.json` file to your React app. The first thing you should do is to take a look at *Helpful Resources / Common Pitfalls #1* below - the article titled *How to build a Chrome Extension with React JS*. This article will explain the initial changes you will **need** to make to your `manifest.json` file to at least get things running. Additionally, I wanted a nice looking `options` page in my chrome extension, which would hold my React app, so in the `manifest.json` file I added this: `"options_page": "index.html"`. The `index.html` file should be in the same directory as your `manifest.json` file, and most importantly, your `index.html` file is now the root location for your React app! Now, if you attempt to open your `options` page, you should see your basic React app running.

Pretty neat, right?

## Helpful Resources / Common Pitfalls
As you may be able to guess, there are many technical details in this post and it's easy to get snagged on little things along the way. In this section, I've tried to document some of the most useful sites I found for moving my project along, as well as some of the most time consuming issues I've run into, and how I got past them.

1. [How to build a Chrome Extension with React JS](https://engineering.musefind.com/how-to-build-a-chrome-extension-with-react-js-e2bae31747fc)
    - This article explains the basic setup needed to connect chrome extension to a React application. It's a pretty basic explanation, but there's some useful sample code included.
1. [Using Messaging in Chrome Extension](https://medium.com/@gilfink/using-messaging-in-chrome-extension-4ae65c0622f6)
    - To make sure the React app doesn't freak out from the global `chrome` object available in chrome extensions, make sure you add this type of comment: `/*global chrome*/` as the first line of the `Component` where you will use it (ex: to send messages to `background.js`).
1. Using [`Redux DevTools Extension`](https://github.com/zalmoxisus/redux-devtools-extension) to test React Apps
    - **Note**: I tried using the Redux DevTools Extension inside my React app while it's running inside a Chrome Extension's `options` page. This caused me lots of grief and so far has not worked. I posted on Stack Overflow about the issue ([How to run Redux DevTools Extension INSIDE Chrome Extension running React](https://stackoverflow.com/questions/51003226/how-to-run-redux-store-extension-inside-chrome-extension-running-react)), and it seems there is no solution to this.
1. [Removing unharmful error "-> Uncaught (in promise) TypeError: Request scheme 'chrome-extension' is unsupported"](https://github.com/facebook/create-react-app/issues/3144)
    - Apparently this was just an easy fix - commenting out a few lines of code involving the `serviceWorker`, in the `index.js` file.

## Thanks!
In this post, I skipped a lot of specifics of my project. For example, setting up a port between my chrome extension and my react app, and setting listeners between the two. You can read about the basic setup in *Helpful Resources / Common Pitfalls #2*, but you may have to dive a bit deeper and see some examples to really feel how it can be used. Feel free to contact me or check out my Github repo if you have questions! Here's my Github repo: [RIPS-Pwd-Reset-CExt](https://github.com/Beamanator/RIPS-Pwd-Reset-CExt).

As always, thanks for reading.

P.S. As Logan mentioned in his post, I also don't know who reads our blog yet / if anyone else will, so LOGAN! I guess in this post I'm talking to YOU! Hopefully you don't get too bored reading :D




[^1]: As I recommended above, my favorite is Windows PowerShell, specifically with the config that comes with GitHub when downloaded for Desktop.

[^2]: I didn't... :(