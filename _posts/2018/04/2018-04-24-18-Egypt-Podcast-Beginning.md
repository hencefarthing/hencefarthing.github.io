---
layout: post
title: Podcasting in Egypt - The Beginning
author: Alex B
---

At my work, a fellow techie and I recently discussed starting a new project. This project includes creating a static website where StARS employees can record updates in the refugee space (new laws and regulations, for example) and display them in an easy-access format for CBOs (community based organizations) or individuals in Cairo. When I say "display", I really mean "make available". The updates would not be available in text (maybe we'll add short summary somewhere), but mainly by voice - similar to a podcast.

If you haven't heard before, Logan and I tried podcasting in the past, but it didn't go far for many reasons (we may pick it up again in the future, so I won't blame the main person at fault **cough** *me* **cough**). I know my new partner and I are going to run through some similar difficults Logan and I ran into during our brief podcasting career, so this time I decided to write some notes down!

To begin our "difficulties" section (is this too soon?), I want to note that this project has been in the "planning" / "design" phases for quite some time. The mastermind behind the project (a good friend named... let's call him Mr. Bombastic) came up with the initial idea late last year (at least 5 months ago). We decided the project would be both "fun" and "useful for the community", but we still seemed to move forward like two geeky slugs. We initially tried working with Soundcloud (more details on why that failed below), and eventually got a basic mockup site working, but it wasn't what we wanted. Mr. Bombastic and I really like making custom things, so using the standard Soundcloud API (which doesn't allow for much customization) made us a bit sad inside. So we set out to fulfill our desires - customizing a Soundcloud player! Sadly, this wasn't as easy as we expected, and we ended up stalling out for a while during this phase. Many times I had this same conversation with my partner:

    Mr. Bombastic: "So any updates, my super cool awesome friend Alex? Have you found a way to style the Soundcloud Player?"
    Me: "Naaw, still looking..."

In mid April (literally earlier this week), I decided it was time to stop being lazy and do some research on alternatives. I was also partially motivated by something Logan and I had talked about in the past - when we do research for any project we're working on, why not write it down in our blog so at the *bare minimum* we can check it out later and not redo the same research? In addition, our research could potentially help each another out in personal projects, or even anyone else who stumbles onto this page!

So that's pretty much left me where I're at right now. My goal for this post is to discuss some basic research on possible hosting methods, and how *and why* we ended up with our current system. I hope you learn something today :)

# Podcast-hosting Sites

1) [Soundcloud](https://soundcloud.com/stream)
    - Pros:
        - Platform already established and used by many
        - Nice clean look for podcasters & listeners
        - Easy to embed player in other websites
        - Easy to upload files
        - Can create playlists easily
    - Cons:
        - Only 180 minutes available of upload time in free version
        - Player not easily customized
        - Registring a "[Soundcloud App](http://soundcloud.com/you/apps/new)" currently unavailable
    - [Pro plans](https://soundcloud.com/pro?ref=t100)
        - $7 per month (or $63 per year)
            - Up to 6 hours total of uploaded content
            - Advanced stats 'n stuff (didn't read closely)
        - $11 per month (or $99 per year)
            - Unlimited upload time
            - More stats 'n stuff (didn't read closely)
    - Final review:
        - Cost: 3 hours for free is not going to last us long, and only 6 hours at a paid rate will not be much better, so we would have to upgrade to the top paid plan with unlimited upload time. At this time, this is too expensive for us.
        - Customizable: The default player looks okay, but we were not able to find a way to customize the player as we would like. Something with this limited flexibility is not fun to work with. Additional API functions may be available when making your own "Soundcloud App" (see [developer docs](https://developers.soundcloud.com/)), but as I mentioned above - this is currently unavailable. So no.
1) [YouTube](https://www.youtube.com/)
    - Pros:
        - Platform already established and used by many
        - Free, unlimited uploads
        - Easy playlist creation
        - Easy to embed player in other websites
        - Some ways it can be nice [here](https://theaudacitytopodcast.com/youtube-with-podcasting-and-growing-your-podcast-audience-tap186/) - by AudacityToPodcast
    - Cons:
        - Some reasons to **NOT** use YouTube [here](https://theaudacitytopodcast.com/why-you-should-not-publish-audio-podcasts-on-youtube-tap332/) - by AudacityToPodcast
        - Bad at retaining listeners (YouTube is mostly for videos)
        - Bad if trying to monitize the platform
        - Not easy to customize player
    - Final review:
        - Cost: Free is always great, so this will always be an option for us due to the free, unlimited upload nature.
        - Customizable: The default player looks ok for video playback, but I would have liked to hide the video element without doing a crazy javascript or html hack (since those don't always work in every browser). We're only doing podcasts, after all. Maybe this is a tiny point to get stuck on, but the lack of customization of the player made us move on to other options.
1) [Podomatic](https://www.podomatic.com/)
    - 500MB storage
    - Up to 6 hours recording for free
    - Final review:
        - Didn't look into the specifics very deeply for Podomatic, but a limited storage space & limited free recording time made me believe it was just another app, not worth deep diving into specifics.
1) [Libsyn](https://www.libsyn.com/plans-pricing/)
    - Not free!
    - Minimum of $5 / month for 50 MB per month
    - Final review:
        - With a monthly cost as a minimum plan, I quickly skipped past using Libsyn. Logan and I could probably afford a mini $5 per month, but here in Egypt I was pretty dead-set on finding an entirely free solution.
1) [Podbean](https://www.podbean.com/podcast-hosting-pricing)
    - Not free
    - Minimum of $3 / month (billed annually) for 100MB monthly
    - Final review:
        - See final review of Libsyn. Not free? Not happenin.

During all of this research, I came across another useful article by The Audacity To Podcast, listing some cool podcasting tools that are free or cheap, as alternatives to premium software. Here's the post: [25 free podcasting tools as good as their paid alternatives](https://theaudacitytopodcast.com/25-free-podcasting-tools-good-premium-alternatives-tap185/)

# Our Current System

While the above options have their pros & cons, in the end we decided to go with something new, a system that gives us lots of flexibility customizing the player and is entirely free. This new system is called [Plyr](https://github.com/sampotts/plyr). Plyr is not a typical podcasting website, but a simple wrapper for creating nice, customizable video or audio players. The github page showed some nice examples for integrating with YouTube or Vimeo videos, which both allow unlimited uploads - hooray! When I saw how nice the player could look, and that unlimited upload times were available, I had to try it out. Below are some notes I took on the process of setting up Plyr:

- Initial thoughts convincing me to try Plyr:
    - Maybe can host sounds on YouTube, vimeo, or directly on Github and serve them up in a nicely cursomized player?
    - Codepen linked in Github `README.md` - I can probably use that as an easy starting point
    - Github page mentions using `npm` to install code - maybe we can host Plyr on Firebase? Do we need to host on server? Kinda confusing "getting started" details
- Attempt #1:
    - Goal = get any plyr to work, playing my test 10 second track
    - Recalled this video to get started hosting dynamic Firebase pages: [Node.js apps on Firebase Hosting Crash Course - Firecasts](https://www.youtube.com/watch?v=LOeioOKUKI8)
    - Put all [Codepen](https://codepen.io/sampotts/pen/jARJYpn) files into `public` directory since they look like static files
    - Changed basic `index.html` page to use `handlebars` view engine (following video)
    - Still not everything was looking right, so tried `npm install plyr` (nothing changed yet)
    - Styling: needed to include both `<link...>` tags:
        - https://cdn.plyr.io/2.0.7/demo.css - styling used in <u>Codepen</u> above
        - https://cdn.plyr.io/2.0.7/plyr.css - basic plyr styling
        - github `README.md` points to v3.2.0 in cdn links, which didn't work by default for me
    - Hosting sound tracks on Archive.org - src of files comes from download links
    - Successful! Ended up successfully getting an audio player to work!
    - Difficulties:
        - YouTube embed still can't get ride of video
        - Why do we have to use Firebase? Not sure what `npm install plyr` did for me
        - Storing sounds on Archive.org was difficult for the first file attempted
- Attempt #2:
    - Goal = stop using Firebase, since I don't think `npm install plyr` changed anything, meaning maybe it doesn't need a server to do backend stuff!
    - Host code on Github is successful! No server needed
    - Successful! Player works, just being hosted on Github!
    - Problem(s):
        - Archive.org is annoying and not super easy to upload / organize / get download links for songs
- Attempt #3:
    - Goal = host songs on a nicer site than Archive.org (still for free)
    - Found it's possible to reference songs that are stored on Github!
    - Hosting songs on Github:
        1) Upload song to any Github repo
        2) Copy link to song from Github, paste into main [RawGit](https://rawgit.com/) page
        3) Enter new rawgit link into `Plyr` player
            - Follow directions - `cdn...` is for production sites, so use the other link for testing
    - Success! Will stick with this solution for now, until we find problems :)

Here are some final little notes I have while developing the page. I thought they may be useful for me in the future, and they don't *necessarily* relate to Plyr, which is why I separated them out.

- Errors I ran into
    - Console errors occurred often while trying to import a specific font from the plyr csn. So I replaced those with [Google Fonts](https://fonts.google.com/specimen/Work+Sans?selection.family=Work+Sans:400,700) `Work Sans` font
        - Easy to import & get setup in a project, just follow instructions on the `fonts.google.com` page

# Wrap-up

So there we go, this is my first post on research I've done for a coding project! I'm not sure if this post will be static, or if I'll update it when I do additional research in the future. From my noob perspective, I can see the benefit of both methods and I'd like to say I'll come back and update this post when I can, but I'm not sure how realistic this is. I've read some coding articles in the past that get updated after something changes, but I'm not sure if that is usually spurred by comments, emails to the editor, or just fantastic memory of old posts. I guess this will just be a fun "science" experiment for the future.

As always, thanks for reading! Hope you had fun :)

P.S. My research notes in the "Podcast-Hosting Sites" and "Our Current Solution" sections were left slightly unformatted and are a bit sporadic, as they represent part of my "stream of conscience" method of doing research. Hopefully they aren't too confusing!
