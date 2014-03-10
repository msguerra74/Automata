---
title: Page and post title. Should be less than 70 characters long.
description: Page description and post lead paragraph. Should be roughly 155 characters long.
layout: post
author: Author Name
date: 2014-01-01
category: category-name
tags:
- tag1
- tag2
---

{{ page.title }}
================

<p class="post__authored">by {{ page.author }} <span>{{ page.date | date: '%B %-d, %Y' }}</span></p>
<p class="post__lead">{{ page.description }}</p>