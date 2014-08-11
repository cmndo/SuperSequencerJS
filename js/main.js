/*
	Super Sequencer
	A tool for playing sequenced animations through a sprite sheet

	For details on setting up a spritesheet, please visit: http://draeton.github.io/stitches/

	Parameters
	$elem - jQuery element with which to target
	framesPerSecond - Choose how many frames per second you'd like this sprite to update
	classPrefix - what is the prefix before the numbers of your css classes
*/
function SuperSequence($elem, framesPerSecond, classPrefix){
	
	var startFrame = 1;
	var targetFrame = 1;
	var currentFrame = 1;

	var lastClass = classPrefix + startFrame;

	var fpsToMs = (1/framesPerSecond) * 1000;
	var _this = this;
	var interval;

	function stopAt(frame){
		currentFrame = frame;
		$elem.removeClass(lastClass);
		lastClass = classPrefix + currentFrame;
		$elem.addClass(lastClass);
	}
	function stepBack(){
		currentFrame--;
		$elem.removeClass(lastClass);
		lastClass = classPrefix + currentFrame;
		$elem.addClass(lastClass);
		dispatchEvent(currentFrame, {label: lastClass});
	}
	function stepForward(){
		currentFrame++;
		$elem.removeClass(lastClass);
		lastClass = classPrefix + currentFrame;
		$elem.addClass(lastClass);
		dispatchEvent(currentFrame, {label: lastClass});
	}

	function run(){
		if(currentFrame < targetFrame){
			stepForward();
		}else if(currentFrame > targetFrame){
			stepBack();
		}else{
			kill();
		}
	}
	function kill(){
		clearInterval(interval);
		dispatchEvent('complete', {frame:lastClass});
	}

	
	var events = {};
	function dispatchEvent (key, dataObj) {
	    if (events.hasOwnProperty(key)) {
	        var dataObj = dataObj || {};
	        dataObj.currentTarget = this;
	        for (var i in events[key]) {
	            events[key][i](dataObj);
	        }
	    }
	}
	return {
		playTo: function(tarFrame){
			kill();
			targetFrame = tarFrame;
			interval = setInterval(run, fpsToMs);	
		},
		on: function(key, callback){
			if (!events.hasOwnProperty(key)) {
			    events[key] = [];
			}
			events[key].push(callback);
		}
	};



}