(function() {
  function SongPlayer($rootScope, Fixtures) {
    /**
    * @desc Object returned by the SongPlayer Service, making its properties and methods public to the application
    * @type {Object}
    */
    var SongPlayer = {};

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
        preload: true,
      });
      
      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
          if (SongPlayer.currentTime === parseFloat(SongPlayer.currentSong.duration)) {
            SongPlayer.next();
          }
        })
      })
      
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
      return SongPlayer.currentAlbum.songs.indexOf(song);
    };
    
    /** 
    * @desc Holds the currently selected song
    * @type {Object}
    */
    SongPlayer.currentSong = null;
    
    /**
    * @desc Holds the current time for the currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;
    
    /**
    * @desc Holds the current volume level
    * @type {Number}
    */
    SongPlayer.volume = 80;
    
    /**
    * @desc Holds the current album Object from Fixtures.getAlbum()
    * @type {Object}
    */
    SongPlayer.currentAlbum = Fixtures.getAlbum();
    
    /**
    * @function play
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
    * @function pause
    * @desc Pauses the currently playing song and sets song.playing to false
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = null;
    };
    
    /**
    * @function previous
    * @desc Changes the currently playing song to the previously indexed song
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      
      if (currentSongIndex < 0) {
        stopSong();
      }
      else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    
    /**
    * @function next
    * @desc Changes the currently playing song to the next indexed song
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      
      if (currentSongIndex > SongPlayer.currentAlbum.songs.length-1) {
        stopSong();
      }
      else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    
    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of the currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };
    
    /**
    * @function setVolume
    * @desc Set volume of the song playback
    * @param {Number} value
    */
    SongPlayer.setVolume = function(value) {
      currentBuzzObject.setVolume(value);
    }
    
    /**
    * @function mute
    * @desc Toggles from muting to unmuting the playback
    */
    SongPlayer.muteToggle = function() {
      currentBuzzObject.toggleMute();
      if (currentBuzzObject.isMuted()) {
        SongPlayer.currentSong.muted = true;
      }
      else {
        SongPlayer.currentSong.muted = false;
      }
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();