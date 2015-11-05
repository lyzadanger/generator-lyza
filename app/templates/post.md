---
title: "<%= title %>"
<% if (tags) { %>tags: <% tags.forEach(function (tag) { %>
  - <%= tag %><% }); } %>
blurb: "<%= blurb %>"
status: <%= status %>
---
