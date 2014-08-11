SuperSequencerJS
===
SuperSequencerJS works by cycling classnames associated with a spritesheet. It starts by adding the classname `frame1` then removes `frame1` and adds `frame2` then removes `frame2` and adds `frame3`.
 
Build your spritesheet with <a href="http://draeton.github.io/stitches/" target="_blank">Stitches</a> and you wind up with css like this. 

	.sprite {
	    background-image: url(spritesheet.png);
	    background-repeat: no-repeat;
	    display: block;
	}
	
	.sprite-frame-_1_ {
	    width: 320px;
	    height: 240px;
	    background-position: -5px -5px;
	}
	
	.sprite-frame-_2_ {
	    width: 320px;
	    height: 240px;
	    background-position: -335px -5px;
	}
	
	.sprite-frame-_3_ {
	    width: 320px;
	    height: 240px;
	    background-position: -5px -255px;
	}

The next step is to rename your classes. I haven't looked too much into automatically renaming. But what you're after are names that follow this pattern frameName#.

	.sequence {
	    background-image: url(spritesheet.png);
	    background-repeat: no-repeat;
	    display: block;
	}	
	.frame1 {
	    width: 320px;
	    height: 240px;
	    background-position: -5px -5px;
	}
	
	.frame2 {
	    width: 320px;
	    height: 240px;
	    background-position: -335px -5px;
	}
	
	.frame3 {
	    width: 320px;
	    height: 240px;
	    background-position: -5px -255px;
	}

Lets take a look at the DOM element that we're controlling with this library

	<div class="sequence"></div>

And finally, lets look at the JavaScript


	var $sequence = $('.sequence'),
		mySequence = new SuperSequence($sequence, 30, "frame");

**SuperSequencer($elem, framesPerSecond, classPrefix);**

- $elem - jQuery element of the DOM element to control
- framesPerSecond - Control how fast the animation plays by modifying how many frames are displayed per second
- classPrefix - Everything before the number in the class. (.frame10's classPrefix is "frame")

**Make it go**

*playTo(Num)*


     mySequence.playTo(40);
	
**When a frame is displayed**
	
	mySequence.on(15, function(e){
		console.log("You've displayed: " + e.label); //You've displayed: frame15
	});

That's it. Pretty darn simple.