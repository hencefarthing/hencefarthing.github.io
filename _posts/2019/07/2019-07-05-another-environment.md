---
layout: post
author: Alex B
title: Multiple Environments means Multiple Phun
categories: code fun
excerpt: How I connected a single GitHub repo to multiple Netlify deploys with unique Firebase projects.
---

💥 Boom, baby! 💥 Almost exactly a month ago, on the 6th of June, [^4] I finally finished connecting my GitHub repository to a second Netlify deploy which connects to a second unique Firebase project. Dang that felt good! 💪

Ok so what now? Why am I writing this post? What's GitHub? Or Netlify? Or even Firebase? I'll try to give a clarifying intro into a project I'm working on, then I'll explain the three systems I just mentioned below in simple terms, and at the end I'll come back to how I connected them and why it is so exciting :)

# Quick intro

Back in December of 2018 I got promoted to the position System Development Coordinator. The purpose of this position is to coordinate development effort of two new systems: a new case management system (CMS) for community based organizations (CBOs) in Cairo, and a community forum for the aforementioned CBOs. I have been working on the CMS since early February, and the community form project will start early next year.

This is pretty much all you need to know for the introduction, but I do have one clarifying comment before continuing: _"system development"_ in programmer terminology is not the same as _"program development"_ in the NGO space. When first hearing about my new title, many people have assumed it has something to do with capacity building, monitoring and evaluation, or other similar positions that are vital for effective NGOs. Before I was the System Development Coordinator, I called myself a _"program officer"_ for a bit, then renamed myself a _"programming officer"_ in an attempt to clear up my title, but even that was still confusing to some people. [^1] Here's a nice defenition of a _"system development life cycle"_ that I'd like you to read, if you are still confused:

> The systems development life cycle, also referred to as the application development life-cycle, is a term used in systems engineering, information systems and software engineering to describe a process for planning, creating, testing, and deploying an information system.

Source: [Wikipedia - Systems development life cycle](https://en.wikipedia.org/wiki/Systems_development_life_cycle) 😜

Now you get it? This is all about software development. Cool, let's move on. [^2]

# [GitHub](https://github.com/)

## What is GitHub?

> GitHub is a code hosting platform for collaboration and version control. GitHub lets you (and others) work together on projects.

Source: [W3Schools - What is GitHub](https://www.w3schools.com/whatis/whatis_github.asp)

## How and why do I use GitHub?

<u>*Ease of collaboration*</u>: Github makes collaboration on many projects incredibly simple. When working with friends or colleagues, everyone can be a direct editor of a project, or in GitHub's terms, a _"repository"_. Everyone can submit changes to make new features, fix errors, or anything else. Whenever a change has been added, all members of the project can see the edits made so everyone stays up to date. GitHub is even smart enough to not let one user update the repository if someone else has recently edited it, _until_ the second person updates their local code (by typing a simple command). This helps members make sure they don't overwrite someone else's work. GitHub's ease of collaboration also enables millions of projects (repositories) to be open to the public, free for anyone to edit and use! For example, the code & text editor I'm using right now to write this post ([Visual Studio Code](https://github.com/microsoft/vscode)) is an incredibly popular product, and everyone can see its code! If you think you found a problem with the program, or if there's a new feature you want to be implemented, you can send the original creators a comment - or you can even try to make the change yourself :)

<u>*Version control*</u>: Version Control is another amazing feature of GitHub. Any time someone makes a change to a GitHub repository, a message must be added to the change, by the user. This message will be stored chronologically in GitHub, so anyone can see the exact order in which files have been changed. If someone finds out a change has caused some issues in the project, or if some feature is not ready to be released, GitHub makes it simple to revert the project back to any previous point in time. Back when I first started programming, I remember a time when I was working on a really cool project (like a super basic calculator, in python). I didn't know about GitHub at the time, so I was just making change on my local computer. After a few weeks of working on the calculator, I realized I broke something pretty badly, but I couldn't remember all of the recent changes I made, nor could I rememeber what the code looked like when it worked! Having GitHub's version control could have helped because I could have seen a history of edits I had made, and I could have reverted the project back to a time when it worked.

<img src="/images/GitHub-commits.jpg" alt="GitHub version control + collaboration" />

<u>*Built-in project management tools*</u>: Issue tracking is an incredibly useful project tool which comes out of the box with GitHub. You can easily create an "issue" as a member of the project _or_ as an outside observer! Here, my team keeps track of bugs in our code, features we'd like to build in the future, or some notes we need to remember to investigate later. It can be difficult to stay in sync with issues in your code if you use software that doesn't automatically hook up with your code base, so luckily GitHub has an amazing solution for that :)

<img src="/images/GitHub-issues.jpg" alt="GitHub issue list" />

<u>*Ecosystem of apps*</u>: Finally, GitHub released an API that allows developers to build additional apps on top of their already incredible system. Currently my team uses two apps that connect directly with our GitHub repository: [Fire](https://github.com/FundersClub/fire) and [Dependabot](https://dependabot.com/). Fire allows us to create GitHub issues just by sending an email to a given email address. In my project, we leveraged this by allowing users to report issues via email, and we made one email designated for creating automatic issues in our repository. Dependabot (which recently was bought by GitHub), is an incredible app that helps keep your repository up to date and secure. Every day (configurable) it will check to make sure your project is not using any out-dated or insecure code from other developers. This app gets into a specific file (`package.json`) which is a bit complicated for this post, so ask me if you have questions :)

# [Firebase](https://firebase.google.com/)

## What is Firebase?

> Firebase is a mobile and web app development platform that provides developers with a plethora of tools and services to help them develop high-quality apps, grow their user base, and earn more profit.

Source: [Hacker Noon - Introduction to Firebase](https://hackernoon.com/introduction-to-firebase-218a23186cd7)

## How and why do I use Firebase?

<u>*Authentication made easy*</u>: There are many ways to set up "user authentication" in an application, but what's the most secure way? Hashing a user's password on the client side? OR server side? What kind of password encryption is the best and how can this be implemented in the most secure way possible? Most of these questions can be disregarded when you use Firebase authentication. Firebase gives people some simple functions for creating and managing users, storing user data, and keeping everything secure. It even supports authentication from many major providers like Google, Facebook, GitHub, and more!

<u>*Simple management console*</u>: Firebase comes with a user-friendly console where users can manage absolutely everything about their project. The console includes settings for features like Authentication (explained above), Database (two types), File Storage, Server Hosting, Functions (explained below), and many more features that I haven't had time to try out! Althought it can look a bit overwhelming at first, the console is packed with incredibly useful tools that help developers efficiently create apps in one central environment. 

<u>*No-SQL database*</u>: Sorry in advance, this point may get a bit technical. Basically, the main types of database apps and websites store data in are [SQL](https://www.w3schools.com/sql/sql_intro.asp) or [No-SQL](https://www.mongodb.com/nosql-explained). Since there are many articles written explaining the [similarities and differences](https://www.upwork.com/hiring/data/sql-vs-nosql-databases-whats-the-difference/) between the [two types of databases](https://medium.com/swlh/should-you-use-nosql-or-sql-db-or-both-349cb26c9add), I will not be explaining this 😜 The reason I'm including this point here is because I want to mention how much I love No-SQL. The format of data sent to and returned from Firebase's No-SQL database is `JSON` (JavaScript Object Notation), which is great! You basically just create a JavaScript object, load it with whatever data you want, and send it off to the database! So easy and lovely!

# [Netlify](https://www.netlify.com/)

## What is Netlify?

> Netlify is a Platform as a Service that builds, deploys, and hosts static websites and apps.

Source: [Crunchbase - Netlify](https://www.crunchbase.com/organization/netlify)

## How and why do I use Netlify?

<u>*Hosts static sites directly from GitHub*</u>:  With only a few simple steps, a developer (like me) can start viewing a website from code in a GitHub respository. This means I can write some code for a website, store it in a GitHub repository, connect that repository to Netlify, and **_shazam_** my website is up and running for anyone to view! This is much simpler than hosting your website code on a server like [GoDaddy](https://ae.godaddy.com/hosting/web-hosting) [^3].

<u>*Free HTTPS hosted*</u>: With absolutely no extra configuration at all, Netlify hosts your website over HTTPS! The importance of HTTPS is highlighted in this [Netlify article](https://www.netlify.com/blog/2014/10/03/five-reasons-you-want-https-for-your-static-site/) and this [Google video + article](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https). This is an incredibly useful feature that Netlify provides for free (via [Let's Encrypt](https://letsencrypt.org/)), right out of the box.

<u>*Multiple sites from one code source*</u>: In Netlify, you can create multiple sites from one code source. I use this to create multiple websites with unique URLs, environment variables, etc. pointing to one GitHub repository. This is fantastic for me because I plan to create a unique website for each CBO to access their data from, and now I can have all of their sites pointing to one single source of code!

<u>*Multiple "Deploys" of every branch / pull request*</u>: It's not the best practice for developers to directly edit code used in live websites, without extensive testing and review. GitHub makes it easy for developers to edit code in an environment that isn't "live" (the main product) by introducing something called ["branches"](https://help.github.com/en/articles/about-branches). In short, branches are copies of "live" code that can be safely edited and tested, then merged into the "live" repository after being tested for errors. Why is this important? Netlify gives users an option to automatically create sites based on every branch in your GitHub repository. This is incredibly useful as it allows team members to test a developer's changes without copying all of the changes to their local computer and running the code - now anyone who wants to test can just open the site for that branch, test, and provide the developer with feedback! Brilliant!

<u>*Easily customizable and accessible environment variables*</u>: Users can set custom data that each Netlify site can have access to, without changing any code. This is similar to a database, but this data is usually used to enable / disable certain features to an app, or to provide some secret information like an `api key` or password. I currently use these "environment variables" to store a few settings like Firebase project configuration, some feature flags, and more.

# What does this mean?

Ok great so now you know a bit more about GitHub, Firebase, and Netlify. Now what was the point of this whole article?

As I mentioned in the beginning, "I finally finished connecting my GitHub repository to a second Netlify deploy which connects to a second unique Firebase project." What I really mean is that I basically have two unique websites with different databases, users, settings, etc - all for free **and** all configurable in the three systems I've mentioned in this article - GitHub, Firebase, and Netlify. GitHub helps me maintain the code used to create the websites, from issue tracking to version releases. Netlify allows me to create multiple deploys for unique entry points into the system, plus it has a nice interface for configuring settings related to each specific deploy / url. Firebase allows me to create multiple "projects" which each contain a unique user base, database, file "storage bucket", and more.

Since December 2018 I have been working on this case management system that I could basically copy / paste for each CBO. I was planning to either create one single entry point for all of the organizations, or create unique GitHub repositories for each website. Neither of those were very ideal, so I'm super excited that I can now set everything up with a few minimal steps :D

# Thanks

Thanks so much for reading!

If you're lost at this point, I'm sorry :D I tried to keep things relatively high level for most of the way, but I may have dug too deep here or there.

If you're tracking with me pretty well, keep going! Below I will get *super* technical by showing some configuration and some settings I'm using, just in case you want to try to set this up on your own some day :)

# Getting technical

So I decided to copy the documentation / steps I wrote in my work project on how to get up and running with a 2nd (or 3rd, 4th, etc...) Netlify / Firebase combined environment. I tried editing them to be as generic as possible, but if you follow the steps and anything isn't working as planned, *please* let me know :D

### Assumptions / Make sure you do this before continuing

1. Create new accounts on the 3 main systems above
    1. [GitHub](https://github.com/)
    1. [Firebase](https://console.firebase.google.com)
    1. [Netlify](https://app.netlify.com/signup)
1. Create a GitHub repository with some website code
    1. Minimally, include an `HTML` file with "Hello World"
    1. Nice tutorial here: [Hello World - GitHub Guides](https://guides.github.com/activities/hello-world/)

### Getting a Netlify deploy / Firebase project setup

1. Create new Firebase project
    1. In your [Firebase Console](https://console.firebase.google.com/), click "Add project"
    1. Add name of project (can be changed later), then click "Create project"
    1. Enable email & password sign-in method
        - Go to "Authentication"
        - Click "Set up sign-in method" or go to "Sign-in method" tab
        - Select "Email/Password", Click first "Enable" switch element, then click "Save".
        - **Note**: Feel free to enable whichever sign-in method you'd like, this is just what I used for my project
    1. Create initial project admin account
        - Go to "Authentication"
        - In "Users" tab, click "Add user"
        - Add email address & password for new user
        - Don't try logging in yet! Keep going!
    1. Create database & 1st user profile
        - Go to "Database"
        - Click "Create database"
        - Start in **locked mode**, then click "Enable"
        - Add database rules
            - **Note**: You'll want to add specific rules to make sure only authorized users can access specific data in your database. Check out [this video](https://www.youtube.com/watch?v=qLrDWBKTUZo) for a nice introduction.
1. Create new Site on Netlify
    1. On Netlify, click "New site from Git"
    1. Choose Git provider where source code is hosted (for us, Github)
        - Choose repository where code is stored (private is **OK**)
        - Choose branch were code to deploy is stored (probably `master`)
        - Keep standard build settings (_Build command: `npm run build`_, _Publish directory `build/`_)
    1. Click "Deploy Site"
    1. Rename deploy to desired url:
        - In Deployment "Settings", open "Domain management"
        - In "Custom domains", click menu (...) beside current Default subdomain
        - Click "Edit site name"
        - Rename site name / domain as desired
    1. Add Environment Variables to deployment
        - In Deployment "Settings", open "Build & deploy"
        - Look at the "Environment" section
        - Click "Edit Variables", then add any new environment variable needed.
            - **Note**: At the writing of this article, we currently use 12 environment varialbes, for things like Firebase project settings, feature enabling / disabling, and more. Here's some of our documentation for some of the main ones used to connect Firebase:
            -   Firebase project config variables (database, storage, auth, etc)
                -   `REACT_APP_API_KEY: ...`
                -   `REACT_APP_AUTH_DOMAIN: ...`
                -   `REACT_APP_BUCKET: ...`
                -   `REACT_APP_DATABASE_URL: ...`
                -   `REACT_APP_MSG_SENDER_ID: ...`
                -   `REACT_APP_PROJECT_ID: ...`
                - Each of these environment variables correspond to configuration keys in your Firebase Project. To find these keys, follow these steps: 
                    1. Log in to Firebase Console
                    1. Click the gear icon next to "Project Overview"
                    1. Click "Projet Settings"
                        - Make sure you have added a "Web App" for your project to connect to
                    1. Near the botton of the page, click "Config" next to "Firebase SDK snippet"
                    1. Copy the data from the config into your Netlify environment variables
                        - Example: `apiKey: "123...."` -> `REACT_APP_API_KEY: 123...`
                        - Example: `messagingSenderId: "758..."` -> `REACT_APP_MSG_SENDER_ID: 758...`
                        - etc.
            -   **NOTE**: after adding / editing / removing environment variables, retrigger deployment of the app.
    1. If Netlify auto-deployed (before environment variables added) and build failed, trigger new deploy in "Deploys" -> "Trigger deploy" -> "Deploy site"

Now you should be up and running with a unique url (from Netlify) where you can access your website (code in GitHub), and it should be able to connect to your database (from Firebase).

❤ Let me know if anything was unclear or didn't work for you! Happy coding! ❤

*Disclaimer: to create the second Netlify deploy + Firebase project using the same GitHub repo, we had to add some more advanced techniques (using a custom `npm` script with `firebase use <project alias>`). To explain this, I'd have to get into discussing the [node package manager](https://www.sitepoint.com/beginners-guide-node-package-manager/) which may lead to explaining [nodejs](https://nodejs.org/en/about/) so I intentionally left that out - maybe i'll add that another day* 😜

[^1]: Actually, originally my new position was going to be called _"IT Systems Coordinator"_ but that was too similar to the already existing position _"IT Coordinator"_ and I did **NOT** want to share responsibility for all of my organization's IT issues...

[^2]: Maybe I should just be called a _"software development"_ coordinator, but that title seemed a bit limiting. Hopefully over the next year I'll begin to truly feel what a System Development Coordinator can be.

[^3]: As I was writing this, I did a tiny bit of research into [AWS Amplify Console](https://aws.amazon.com/amplify/console/) which "provides a Git-based workflow for deploying and hosting fullstack serverless web applications" which seems nice, has a free tier, and may be simple to set up as well 😮

[^4]: Wow this took me a month to finish!! Yikes...