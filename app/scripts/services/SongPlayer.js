(function() {
  function SongPlayer() {
    /**
    * @desc Object returned by the SongPlayer Service, making its properties and methods public to the application
    * @type {Object}
    */
    var SongPlayer = {};
    /** 
    * @desc Holds the currently selected song
    * @type {Object}
    */
    var currentSong = null;
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;
     
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentSong = song;
    };
    
    /**
    * @function playSong
    * @desc Plays the currentBuzzObject and sets song.playing to true
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }
    
    /**
    * @function SongPlayer.play
    * @desc Plays the clicked song whether it is a new selection or a song that was previously paused
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      }
      else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    
    /**
    * @function SongPlayer.pause
    * @desc Pauses the currently playing song and sets song.playing to false
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();