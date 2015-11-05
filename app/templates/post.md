---
title: "<%= title %>"
<% if (tags && tags.length) { %>tags: <% tags.forEach(function (tag) { %>
  - <%= tag %><% }); } %>
blurb: "<%= blurb %>"
status: <%= status %>
---
