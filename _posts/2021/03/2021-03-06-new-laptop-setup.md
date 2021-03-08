---
layout: post
author: Alex B
title: New MacOS Laptop - Setup Ideas
categories: opinion tech
excerpt: Essential applications (and more) when setting up a brand new laptop 🍽
---

Is it Christmas? [^1] Is it my Birthday? [^2] Nah... It's lappy-toppy-time!! [^3]

One of the first things we all think about when we get a new piece of tech is... **"What should I do first??"** The exciting (and daunting) thing about modern devices is that there are SO MANY ways to use them, customize them, break them!! Maybe you're a social media influencer, or a professional graphic designer? Maybe you're a basic user who just wants to check Facebook to stalk your kids? Me? Well...

I'd describe myself as a "tech-literate software dev + enthusiast with medium linux know-how". I find myself using mainly basic coding tools, but occasionally (when needed) I can get wild with more sophisticated tooling. With my specific set of skills and interests, I need a specific set of applications, utils, and slight modifications for optimal happiness / usage.

That's the purpose of this post! 😎 I'll share the main applications and utilities I install, UI adjustments I make, and more - as I set up my new MacBook Pro. Let's do this!

## Applications

To begin, let's look at the 🥩 and 🥔  [^4]

### Google Chrome

This web browser is amazing for many reasons. [^5] I'm an avid user for these main reasons:

1. The interface is very intuitive (probably because I'm a long-time user).
1. Bookmarks can be stored to your Google Account so they can be imported on other machines.
1. Dev tools are incredibly easy to use and useful for web dev.
1. Chrome Extensions are relatively easy to understand & build.

After installing, there's only a few additional steps needed:

- Sign in to google (in the Browser, not on Gmail) to get all of my bookmarks imported automatically.
- Make Chrome my default browser
    - **Serious Question**: Does _ANYONE_ prefer safari to chrome? If yes, why??

### Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/) is hands down the best code / file / text editor a web developer could ask for. It's free and open source, can be extended with a huge variety of extensions, and has a multitude of easily-searchable UI settings for a wide range of customizations. If you're a Java or C++ developer you may have to look into Visual Studio, an IDE with a compiler and additional features, but for my usage (mainly HTML, CSS, JS, PHP), it is more than enough.

After installing, here's some additional setup I'd highly recommend:

- Get `code .` working in the terminal
    - This allows you to open Visual Studio Code in your current directory, via the terminal. Since my day is often partially spent in the terminal (spinning up local web servers, installing node packages, etc), this enables me to open projects without ever leaving the terminal. Very useful and easy to set up 👍
    1. `Command + Shift + p`
    2. `Shell Command: Install 'code' command in PATH`
- Install extensions:
    - Prettier - Code formatter
        - I've mainly used this for automatic formatting of HTML, CSS, and JS code. It vastly reduces issues where team members have conflicting preferences in how to style their code (ex: semi-colons, indentation amount, parenthesis, etc).
- Color Theme: Monokai Dimmed
    - To tell the truth, I haven't tested out a wide variety of themes, but Monokai Dimmed is one of my favorites so far. It has a nice color palette for JS and Markdown files, which I tend to write most often.

### Discord

Over the years, [Discord](https://discord.com/) has been incredibly useful for me and my coding & gaming buddies to communicate with.

For coders, this platform is incredibly useful because you can easily create "rooms" / "channels" where specific topics (like programming languages) can be discussed. I've joined a few servers where 1,000+ coders help each other out with specific tools, languages, strategies, etc. and so far it seems to work very well. There's even documentation on creating Discord Bots, which have a wide variety of applications.

For gamers, this platform is amazing because you can have voice chat "rooms" / "channels" in the main "server" with all of your friends! It's simple to invite friends and get chatting in no time. You can even share your screen if you're so inclined!

You may be wondering "Why is this an essential application?" For me, it's essential because I'm a member of a few servers that I want to help maintain and grow. One server is for Cairo Codes, a team of refugees and expats learning web and application development. I love to assist when I can, and I hope to help encourage and teach more refugee devs in the future. A second server is for [Primo](https://primo.af/) development and discussions. When I have free time, I enjoy discussing new features and enhancements with the main Primo devs. Being a part of an open source project is very fulfilling - if only I had more time to contribute... 😅

### Slack and Zoom

[Slack](https://slack.com/) and [Zoom](https://zoom.us/) are two critical applications I use for most work-related communication. Slack is perfect for project management (and not at all catered towards devs / gamers like Discord), and Zoom is one of the simplest and most feature-rich video chatting applications. I won't go into much more detail here, as I assume everyone has heard about each during this pandemic. Check the links above and send me any comments / questions if you would recommend other tools for these purposes 😁

### Applications Wrapup

The above applications are absolutely essential for my day to day use, as promised. To make this post a bit more useful for a wider developer audience, here is a list of other applications that I'm 80% I'll need sooner or later, but I wouldn't consider _essential_ for myself (yet).

- [Docker](https://www.docker.com/)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)

## Coding Utils / Tools

A few applications I consider "essential" don't need a beautiful UI at all! I consider these applications "coding utilities / tools" since they're purely run from the terminal. They may not be beautiful, but they're incredibly powerful and useful.

### Git

[Git](https://git-scm.com/download) is a no-brainer if you're even a moderately seasoned developer. Git (not to be confused with [Github](https://github.com/)) is a version-control tool which helps a developer keep organized as they make changes to different parts of a coding project. It even allows you to back-track any changes you made, in case your new code broke something (this happens often for me... anyone else?). When combined with Github, Gitlab, or another git-hosting provider, Git helps team members easily collaborate on such projects and keep up to date on each other's work. Those hosting providers often offer additional project management features like issue tracking, comments / reviewing, and much more.

Now that we have Git installed, we also will want to modify out terminal so we can see some git-specific output (mainly the current branch you're on). I'll mention all terminal modifications later, in a section all by itself :)

### Homebrew

[Homebrew](https://brew.sh/) is a package manager that's incredibly easy to set up. This bad boy helped me quickly and easily get the rest of my utils set up, and I know it'll be useful in the future. There's tons of useful packages available on their website, I've only scratched the surface of what's available.

### Node version manager, N

I couldn't just label this section "N"... That would have looked like a typo. So I'll go into a bit more detail.

[Nodejs](https://nodejs.org) is a JavaScript runtime which allows devs to write terminal commands (and much more) in JavaScript, which run on computers instead of in browsers (where JavaScript started). One difficult thing about Node being open source, is that some other open source libraries only support certain versions of Node (obviously most libraries try to support the latest versions, but occasionally breaking changes in Node require huge overhauls of their libraries).

The first time I dealt with that issue (different projects requiring different versions of Node), I had a miserable time manually switching between two versions on my machine. Eventually I searched for a solution (I couldn't be the only one with this difficulty, right?) and luckily I found a Node Version Manager called [`N`](https://github.com/tj/n). This amazing utility helps Mac users easily organize and switch between multiple versions of Node installed on their machine.

Note: there were a few additional steps required to get N working, listed below...
- [This Stack Overflow Q/A](https://stackoverflow.com/a/61678102/2430414) was instrumental in solving an error I ran into when first running the util on my computer.
- I also had to install Node from the [main website](https://nodejs.org/en/download/) for `npm` to work properly. Running `n lts` didn't seem to bring `npm` with it for some reason.
- It's possible the above 2 steps could have been avoided if I remembered that last time I set up `n` with the [`n-install`](https://github.com/mklement0/n-install) library. But too late now :D

## General mac ui setup / edits

### Night shift (Sunset to Sunrise)

According to [this paper](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4734149/), setting your computer's monitor to "night shift" reduces blue light, which allows you to sleep easier at night (yes, that's a quick 'n dirty summary - read the abstract for more details). This is not a "new" feature for modern laptops, but it definitely sounds useful :D 

### Dock edits

The dock (the menu bar with all of the main applications) can be placed on the left, right, or bottom (default) of your screen. I tried all for a while to see what I prefer, but putting the Dock on the right is my favorite. When it's on the bottom, I sometimes have trouble resizing full-screen windows (clicking and dragging from the bottom), but when it's on the right I haven't had those problems! And when it's on the left, it often covers up web or application navbars, so right side it is!

Magnification and dock size? Medium and small :D

### New folder for Github projects

My favorite way to organize most of my random Github projects is to put them all inside a directory called "Github". The easiest way to do this is with the command `mkdir -p ~/Documents/Github`. Boom done :)

Note: adding `-p` is interesting because it's an _idempotent_ operation. Read more [here](https://superuser.com/questions/165157/what-does-the-p-flag-do-in-mkdir-p#:~:text=The%20%2Dp%20flag%20will%20create,you%20have%20write%20permissions%20for.&text=It%20is%20also%20an%20idempotent,but%20nothing%20will%20be%20created) if interested.

### Change terminal color / settings

Why would I want to change my terminal coloration / text output, you may ask? Well, if you're Logan you wouldn't ask "why", you would only ask "how" - and that's really the point. Once I found out it was possible to do some simple coding to adjust terminal text and colors, I couldn't help myself. Also, here's the current (very boring) terminal output that I seek to change:

<img src="/images/code/terminal-before.png" alt="terminal before edits" width="75%" style="display: block;margin: 0 auto;" />

Ok so we have the _why_, now the _how_. This could probably be an entire tutorial on its own, but I'll try to keep it brief. This involves many little steps, so hopefully everything is clear and reproducible - let's get started!

1. First, open your `.bash_profile` file.

    It's usually in the home (`~`) directory. If you don't have this file yet, simply run `touch ~/.bash_profile` in your terminal and you'll now have an empty file. This is where you can store config for your terminal - including custom coloring, modifying text output, and you can do so much more. To open the file for editing, I used Visual Studio Code. Just type `code ~/.bash_profile` in the terminal and you're ready to continue.

2. Git-related edits.

    For starters, I want to be able to see the git branch I'm working in, if my terminal is in a git-enabled directory (sadly this isn't available by default). For this, we have to do two things:
    
    First, create a function `parse_git_branch` which will grab any project's current git branch and return it. Here's this code:

    ```bash
    # function used to parse current git branch (and handle no branch)
    # -> displays branch in nice colors with no color leak
    # original source: https://stackoverflow.com/a/35881739/2430414
    function parse_git_branch {
        local branch="$(git branch 2>/dev/null | grep "\*" | colrm 1 2)"
        if [ -n "$branch" ]; then
            echo -e " ($branch)"
        fi
    }
    ```

    Next, we have to stick this output somewhere. To override the leading text in your terminal (the text to the left of where you can type your commands), you have to override a variable `PS1`. You can test this by doing `export PS1="test"`, save, then restart your terminal. If you did this properly, you'll see the word "test", and you can start typing a command directly after that text. This is not very nice looking, so you can make it better by copy / pasting the following code below the `parse_git_branch` function:

    ```bash
    # override the text output for each new line
    # \h is the home user name
    # \w is the current working directory
    export PS1="@\h \w - \$(parse_git_branch) $ "
    ```

    Now your output should look a bit better! Here's what mine looks like now:

    <img src="/images/code/terminal-edit-1.png" alt="terminal after edit 1" width="75%" style="display: block;margin: 0 auto;" />

    Feel free to mess around with removing `@\h` or changing your text. I will be adding a few more modifications to this line as we go.

    > Note: Any time you update your `.bash_profile` file, you will have to restart your terminal (or open a new one) to see the effects. You can also type `source ~/.bash_profile` to refresh your current terminal window.

3. Modifying the final character.

    This part is definitely not necessary, but pretty fun. The `$` character you see before you type is some kind of standard character for bash, but it is absolutely not required. Therefore, it's customize time! Add this above your `export PS1=...` line:

    ```bash
    # final character(s) of each terminal input line
    __final_char=">"
    ```

    Now you can put literally anything you want between the `""`! You can put multiple letters, a custom character, even emojis! Once you have what you want, make sure you add `$__final_char` to your `PS1` export, as shown below:

    ```bash
    # override the text output for each new line
    export PS1="@\h \w - \$(parse_git_branch) $__final_char "
    ```

4. Add your name, in 🔥 flames 🔥

    Here's something super fun :D I think it's way too boring to have `@Alexs-MBP` at the start of each line in my terminal. Let's make it a customized user name ("beamanator" for me, you can edit to whatever you'd like) that's colorful like fire :D Add this above your `export PS1=...` code:

    ```bash
    # Color your custom username
    b="\[\033[01;38;5;52m\]b"
    e="\[\033[01;38;5;124m\]e"
    a="\[\033[01;38;5;196m\]a"
    m="\[\033[01;38;5;202m\]m"
    a2="\[\033[01;38;5;208m\]a"
    n="\[\033[01;38;5;214m\]n"
    a3="\[\033[01;38;5;220m\]a"
    t="\[\033[01;38;5;226m\]t"
    o="\[\033[01;38;5;228m\]o"
    r="\[\033[01;38;5;230m\]r"
    __color_reset="\[\033[00m\]"
    __my_user_and_host="🔥 $b$e$a$m$a2$n$a3$t$o$r$__color_reset 🔥"
    ```

    Now, use your new variable `__my_user_and_host` in the `PS1` output (notice I removed `@\h` because I wanted my custom username to replace that):

    ```bash
    export PS1="$__my_user_and_host \w - \$(parse_git_branch) $ "
    ```

    Here's what I've got now:

    <img src="/images/code/terminal-edit-2.png" alt="terminal after edit 2" width="75%" style="display: block;margin: 0 auto;" />

So that was a ton of fun! If you want to learn more and dive deep into terminal modifications, check out [these docs](http://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt), and more resources linked to in my code below.

Just for future Alex's sake (and in case anyone else wants to know), below is my current favorite version of my `.bash_profile`. If any reader has questions about the few additional modifications I made, ask me :) Check it out:

```bash
# ===== Coloring =====
# 1) for bold (01) and black (38;5;232) path / git branch: \[\033[01;38;5;232m\]\w - \$(parse_git_branch)\[\033[00m\]
# 2) to add pink background, add (48;5;204;) in front of above color, in [...m\]
# 3) to use standard green color, change color to [32m\]
# 4) can't use \033 or \e in bash on mac! have to use \x1B
# -> source: https://superuser.com/a/33991/580340
# 5) can't use \[words\] to wrap non-printable chars in echo -e "something"
# -> have to use \001words\002 (or \x01words\x02)
# other resources:
# https://asciinema.org/a/162519
# https://robotmoon.com/256-colors/#shell-prompt
# (less useful) https://www.howtogeek.com/307701/how-to-customize-and-colorize-your-bash-prompt/

# this resets colors so last color doesn't bleed into future text:
__color_reset="\[\033[0m\]"
__color_reset_no_esc="\x01\x1B[0m\x02"

# dark gray background, light green text:
__color_git_branch="\[\033[48;5;238m\]\[\033[38;5;084m\]"
__color_git_branch_no_esc="\x01\x1B[48;5;238m\x02\x01\x1B[38;5;084m\x02"

# function used to parse current git branch (and handle no branch)
# -> displays branch in nice colors with no color leak
# original source: https://stackoverflow.com/a/35881739/2430414
function parse_git_branch {
    local branch="$(git branch 2>/dev/null | grep "\*" | colrm 1 2)"
    if [ -n "$branch" ]; then
        echo -e " ${__color_git_branch_no_esc}($branch)${__color_reset_no_esc}"
    fi
}

# final character(s) of each terminal input line
# -> note: for emojis, extra hidden character(s) (like skin color) can cause issues!!
# -> other interesting chars: ➡↳🔜➡️☞>👉💥🌬🚥💢❗️❕♾☾✦
__final_char="✦✦"

# Cool username coloring (from https://unix.stackexchange.com/a/285956/361317)
# -> ONLY for my specific user!
if [ "$USER" = "alexbeaman" ]; then
    b="\[\033[01;38;5;52m\]b"
    e="\[\033[01;38;5;124m\]e"
    a="\[\033[01;38;5;196m\]a"
    m="\[\033[01;38;5;202m\]m"
    a2="\[\033[01;38;5;208m\]a"
    n="\[\033[01;38;5;214m\]n"
    a3="\[\033[01;38;5;220m\]a"
    t="\[\033[01;38;5;226m\]t"
    o="\[\033[01;38;5;228m\]o"
    r="\[\033[01;38;5;230m\]r"
    __my_user_and_host="$b$e$a$m$a2$n$a3$t$o$r$__color_reset"
else
    __my_user_and_host="\[\033[01;36m\]\u$__color_reset"
fi

# PS1 Notes:
# - removed @\h because I don't currently care about seeing '@<my-computer-name>'
# - common ps1 values: https://ss64.com/bash/syntax-prompt.html
export PS1="$__my_user_and_host \w\$(parse_git_branch) $__final_char "
```

This led me to this final view of my terminal:

<img src="/images/code/terminal-edit-final.png" alt="terminal final edits" width="75%" style="display: block;margin: 0 auto;" />

Note: As of the writing of this post, Apple has now designated `zsh` as the default terminal, replacing `bash`. I'm not sure if they're planning to sunset `bash` (probably not), but eventually I plan to look into migrating my `.bash_profile` setup to `.zprofile` (an equivalent file for `zsh`, according to [this support page](https://support.apple.com/en-us/HT208050)).

## Post-setup thoughts

Hopefully this post is useful for any devs setting up a new Mac computer (including future me). I know everyone has their own preferences, whether it's coding tools, color themes, and even internet browser. I hope I made a good case for _why_ I use each tool above, but I'm willing to listen to arguments why a different application, tool, or setup style is _"better"_ than any I chose above. Let me know if you have recommendations for me!

## Thanks

I have lots of blog post "ideas" in the works, but... As we've realized over and over again... Life easily gets in the way of writing 🤷‍♂️ I have a few other things I want to get going before I start my new job (cleaning private data from my old machine, messing with the new touch bar, connecting a second monitor, etc.) and once that gets going I'll be pretty busy again, so I can't promise I'll get back to writing soon...

But here's to hoping 🥂

Thanks for reading :)

[^1]: Christmas in March? My Mom likes to say "Christmas in July" - which has a much better ring to it than "Christmas in March".
[^2]: Almost, actually!
[^3]: I do hope to write about my latest job-applying experience. It was far from what I expected, and I'd love to share some tips and other thoughts for my dev friends who may be looking for jobs :) But again... It's just an "idea" until I do it...
[^4]: Or 🥙 if you're like that...
[^5]: Ok maybe I have "planned" to switch to Firefox for a while...