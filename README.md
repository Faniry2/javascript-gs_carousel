GS_CAROUSEL
=========================
GS_CAROUSEL helps you create carousels more easily

## Table of Contents

1.  [How to use it](#How-to-use-it) 
2.  [Settings](#Settings) 

## How to use it

Set up your HTML markup

```html
<div class="container">  
   <div id="gs_carousel">  
      <div>your content</div>  
      <div>your content</div>  
      <div>your content</div>  
   </div>  
</div>  
```

Add carousel.css in your  `<head>`  after fontawesome css v5.8.2

```html
 <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet"/>  
<link rel="stylesheet" href="carousel.css">
```

Add GS_CAROUSEL.js before your closing `<body>` tag

```html
 <script type="text/javascript" src="GS_Carousel.js"></script>
```

Initialize your slider in your script file or an inline script tag like this

```javascript
let element=document.querySelector("#gs_carousel");  
new GS_Carousel(element,{
    slideToScroll:1,  
    slideToShow:1,  
    pagination:false,  
    infinite:false,  
    center:false,  
    dragMode:false,  
    autoCarousel:false  
 })
 ``` 

When complete, your HTML should look something like:
```html
 <html>
  <head>
  <title>My Now Amazing Webpage</title>
  <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet"/>
  <link rel="stylesheet" href="carousel.css">   
  </head>
  <body>
 <div class="container">
    <div id="gs_carousel">
       <div>your content</div>
       <div>your content</div>
       <div>your content</div>
    </div>
 </div>
 <script type="text/javascript" src="GS_Carousel.js"></script>
 <script type="text/javascript">
    let element=document.querySelector("#gs_carousel");
   new GS_Carousel(element,{
    slideToScroll:1,
    slideToShow:1,
    pagination:false,
    infinite:false,
    center:false,
    dragMode:false,
    autoCarousel:false
   });
  </script>
 </body>
</html>
```
## Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
slideToScroll| Integer | 1 | This is the increment step of the scroll, for example if slidesToScroll is equal to 1 the slides will be scrolled 1 by 1 if equal to 2 they will be scrolled 2 by 2 and etc.
slideToShow | Int | 1 | Number of slides to display on the screen.
pagination | boolean | false | Enable pagination.
infinite | boolean | false ] Enable infinite looping.
center |  boolean | false |  Enable centered view with partial prev/next slides. 
Use it with numbered slidesToShow equal to 3.
dragMode| boolean | false | Enables desktop dragging.
autoCarousel | boolean | false | Enables auto scrolliong.

## Note ##

GS_Carousel is not yet perfect (will come as improvements are made), but it can help you learn how to make your own carousel system,   
because the code is clear and easy to understand
