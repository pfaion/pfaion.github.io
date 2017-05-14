---
---
console.log "(Coffee)Javascript working"

$ ->
  $('h1').hover(
    -> $(this).toggleClass "warn"
    -> $(this).toggleClass "warn"
  )