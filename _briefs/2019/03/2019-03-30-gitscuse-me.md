---
layout: brief
author: Alex B
title: gItscuse Me! 
categories: technology
---

In a recent [_brief_](https://hencefarthing.blog/briefs/2019/03/21/git-squash-merge/) I described a delicious trick I found on `github` called "Squash 'n Merge". After a few days I found this candy had lured me into an ugly, sketchy-looking house of never-ending git commits and ever-elongating pull requests. Why? I guess I hadn't read the fine print. [^1] 

To be slightly more verbose, simply squashing a multitude of commits from a remote branch into one master commit doesn't do much more than confuse Github. Commits in the remote branch don't actually squash in their originating branch, they squash _en route_ to master. So you're now stuck with the same ol' chunk o' commits in your remote branch and a new, unrelated, squashed commit in master. This, according to Github, means you didn't actually pull your commits into master... So the next time you want to submit a pull request from your development branch, what happens? Woohoo! Let's re-pull **ALL** of your commits!

😵

[^1]: In truth, fine print doesn't exist for the trick, but I wanted to continue the metaphor. 