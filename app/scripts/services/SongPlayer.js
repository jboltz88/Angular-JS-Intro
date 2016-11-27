(function() {
  function SongPlayer(Fixtures) {
    /**
    * @desc Object returned by the SongPlayer Service, making its properties and methods public to the application
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc Holds the current album Object from Fixtures.getAlbum()
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();
    
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;
        
    /**
    * @function stopSong
    * @desc Stops the currentBuzzObject and sets song.playing to null
    * @param {Object} song
    */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };
    
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      SongPlayer.currentSong = song;
    };
    
    /**
    * @function playSong
    * @desc Plays the currentBuzzObject and sets song.playing to true
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    
    /**
    * @function getSongIndex
    * @desc Determines the index of the selected song from the current album
    * @param {Object} song
    * @returns {Number}
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    
    /** 
    * @desc Holds the currently selected song
    * @type {Object}
    */
    SongPlayer.currentSong = null;
    
    /**
    * @function SongPlayer.play
    * @desc Plays the clicked song whether it is a new selection or a song that was previously paused
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      }
      else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = null;
    };
    
    /**
    * @function SongPlayer.previous
    * @desc Changes the currently playing song to the previously indexed song
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      
      if (currentSongIndex < 0) {
        stopSong();
      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    
    /**
    * @function SongPlayer.next
    * @desc Changes the currently playing song to the next indexed song
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      
      if (currentSongIndex > currentAlbum.songs.length) {
        stopSong();
      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();