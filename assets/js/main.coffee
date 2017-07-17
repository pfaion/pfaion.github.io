---
---

$ ->
  $(".clickable-row").click ->
    window.location = $(this).data("href");
