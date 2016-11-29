(function() {
  function seekBar($document) {
    /**
    * @function calculatePercent
    * @desc Calculates the horizontal percent along the seek bar where event occurred
    * @param {Object} seekBar, {Object} event
    */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;
        
        /** 
        * @desc Holds element that matches the <seek-bar> directive
        * @type {Object}
        */
        var seekBar = $(element);
        
        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });
        
        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });
        
        /** 
        * @function percentString
        * @desc Calculates a percentage from the value and max value of a seek bar
        * @return {String}
        */
        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };
        
        /**
        * @function fillStyle
        * @desc Returns width of the seek bar fill element
        * @return {Object}
        */
        scope.fillStyle = function() {
          return {width: percentString()};
        };
        
        /**
        * @function thumbStyle
        * @desc Returns position of seek bar thumb element
        * @return {Object}
        */
        scope.thumbStyle = function() {
          return {left: percentString()};
        }
        
        /**
        * @function onClickSeekBar
        * @desc Updates seek bar value based on seek bar's width and location of click event
        * @param {Object} event
        */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };
        
        /**
        * @function trackThumb
        * @desc Updates seek bar by constantly applying the change in value of scope.value when user drags thumb
        */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });
 
          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
            notifyOnChange(scope.value);
          });
        };
        
        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange({value: newValue});
          }
        };
      }
    };
  }
  
  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();