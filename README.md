jquery-floater
==============

A JQuery library for floating elements when the user scrolls through the website.

Examples
---------------

To float the Navigation Bar with an id of "navBar"

and your element looks like this:

`<nav id="navBar">
  ...
</nav>`

then all you would have to do is write a little script:

`$('#navBar').float();`

and Bam Baby! Floating elements that scroll with the page!

### Available Settings

These are the available settings:


+ <b>transitionDuration</b> <span style="color: grey;">//How long it takes for the element to fall into place (in ms)</span>
+ <b>generatedClassName</b> <span style="color: grey;">//How long it takes for the element to fall into place (in ms)</span>
+ <b>topMargin</b> <span style="color: grey;">//How long it takes for the element to fall into place (in ms)</span>
+ <b>transitionEnabled</b> <span style="color: grey;">//How long it takes for the element to fall into place (in ms)</span>
+ <b>transitionTimingFunction</b> <span style="color: grey;">//How long it takes for the element to fall into place (in ms)</span>

In order to use them, pass it as an object into the `float` function like so:

`$('#navBar').float({transitionDuration: 1500, topMargin: 50});`

Be sure to always wait until the document is ready and JQuery is loaded before doing any dom manipulation:

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
        $('#navBar').float({transitionDuration: 1500, topMargin: 50});
});
</script>
```