# Website Performance Optimization portfolio project

Optimize the critical rendering path and make this page render as quickly as possible by applying the techniques in [Critical Rendering Path course](https://www.udacity.com/course/ud884).

### Intro

#### Part 1: Optimize PageSpeed Insights score for index.html
#### Part 2: Optimize Frames per Second in pizza.html

## Optimization 
#### Overview
1. Inlined CSS files. 
2. added media = "print" attribute to print style.
3. put async to every scripts
4. compressed and resized all images from JPEG Optimizer web page (http://jpeg-optimizer.com/) 
5. Tried to leverage browser caching by creating .htaccess file but it does't work. 

#### Optimization
1. moved dx and newwidth out of for-loop in changePizzaSizes(size) function.
```js
function changePizzaSizes(size) {
	var dx = determineDx(document.querySelector(".randomPizzaContainer"), size);
	for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
	var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
	document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
	}
}
```
to

```js
 function changePizzaSizes(size) {
	//don't need to iterate dx, newwidth  and newwidth_setter through for loop.
	//determine old and new width ratio
	var dx = determineDx(document.querySelector(".randomPizzaContainer"), size);
	//set new width
	var newwidth = (document.querySelector(".randomPizzaContainer").offsetWidth + dx) + 'px';
	//select all randomPizzaContainer elements
	var elements = document.querySelectorAll(".randomPizzaContainer"); 
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.width = newwidth;
	}
  }
```

2. initialized document.body.scrollTop / 1250 out side of for loop. 
```js
function updatePositions() {
	frame++;
	window.performance.mark("mark_start_frame");

	var items = document.querySelectorAll('.mover');
	for (var i = items.length; i--;) {
		var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
		items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
	}

	// User Timing API to the rescue again. Seriously, it's worth learning.
	// Super easy to create custom metrics.
	window.performance.mark("mark_end_frame");
	window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
	if (frame % 10 === 0) {
		var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
		logAverageFrame(timesToUpdatePosition);
	}
}
```
 to
```js
function updatePositions() {
	frame++;
	window.performance.mark("mark_start_frame");

	var items = document.querySelectorAll('.mover');
	//calculate scrollTop
	var scrollTop = document.body.scrollTop / 1250;
	for (var i = 0; i < items.length; i++) {
		var phase = Math.sin(scrollTop + (i % 5));
		items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
	}
```

3. Changed querySelctor('#a_id') to getElementById('a_id')
(getElementById has better performance).

4. Reduced the number of background pizzas. 
```js
// Generates the sliding pizzas when the page loads. 
document.addEventListener('DOMContentLoaded', function() {
	var cols = 8;
	var s = 256;
	for (var i = 0; i < 200; i++) {
		var elem = document.createElement('img');
		elem.className = 'mover';
		elem.src = "images/pizza.png";
		elem.style.height = "100px";
		elem.style.width = "73.333px";
		elem.basicLeft = (i % cols) * s;
		elem.style.top = (Math.floor(i / cols) * s) + 'px';
		document.querySelector("#movingPizzas1").appendChild(elem);
	}
	updatePositions();
});
```
to 
```js
document.addEventListener('DOMContentLoaded', function() {
	var cols = 8;
	var s = 256;
	//don't need to draw all of 200
	for (var i = 0, elem; i < 32; i++) {
		elem = document.createElement('img');
		elem.className = 'mover';
		elem.src = "images/pizza.png";
		elem.style.height = "100px";
		elem.style.width = "73.333px";
		elem.basicLeft = (i % cols) * s;
		elem.style.top = (Math.floor(i / cols) * s) + 'px';
		var movingPizza = document.getElementById("movingPizzas1");
		movingPizza.appendChild(elem);
	}
	updatePositions();
});
```

5. Declared variable outside the loop, so only DOM call is made one. 
```js
for (var i = 2; i < 100; i++) {
	var pizzasDiv = document.getElementById("randomPizzas");
	pizzasDiv.appendChild(pizzaElementGenerator(i));
}
```
to
```js
var pizzasDiv = document.getElementById('randomPizzas');
for (var i = 2; i < 100; i++) {
     pizzasDiv.appendChild(pizzaElementGenerator(i));
}
```

6. Some minimal Changes (such as define variable in for-loop rather than inside-for-loop)

### PageSpeed Insight (before and after)
![alt text](/readImage/opt2.jpeg)
![alt text](/readImage/opt1.jpeg) 


### Resized Pizzas (before and after)
![alt text](/readImage/pi1.png)
![alt text](/readImage/pi2.png)

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). 
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
