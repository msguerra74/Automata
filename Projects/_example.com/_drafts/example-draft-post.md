---
title: Page and post title. Should be less than 70 characters long.
description: Page description and post lead paragraph. Should be roughly 155 characters long.
layout: post
author:
author__url:
date: 2014-01-01
category: category-name
tags:
- tag1
- tag2
---

{{ page.title }}
================

<p class="post__authored"><span>{{ page.date | date: '%B %-d, %Y' }}</span> &mdash; {% if page.author and page.author__url == %}{{ page.author }}{% else %}<a href="{% if page.author__url %}{{ page.author__url }}{% else %}{{ site.url }}{% endif %}">{% if page.author %}{{ page.author }}{% else %}{{ site.owner }}{% endif %}</a>{% endif %}</p>
<p class="post__lead">{{ page.description }}</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, dicta, debitis, quaerat libero facere esse similique est quia quo ab incidunt ea sit praesentium. Quia, eveniet rem quo veniam saepe alias aperiam nisi ut. Sint, ut excepturi doloremque necessitatibus adipisci omnis culpa at dignissimos! Similique at voluptatem aliquam autem consequuntur.</p>