//import React from 'react';

console.log('Entering spotify.js');

const clientID = '266585de292c4818b19f2f50f824fbca';
const redirectUri = "http://akJammming.surge.sh";
let userToken;

const Spotify = {

  /*async search(searchTerm) {
    console.log("Spotify.search");
    console.log(searchTerm);
    const accessToken = this.getAccessToken();
    var headers = { headers: { Authorization: `Bearer ${accessToken}` } };
    var url = "https://api.spotify.com/v1/search?type=track&q=" + searchTerm;
    try {
      var httpResp = await fetch(url, headers);
      var jsonResp = await httpResp.json();
      var retVal = jsonResp.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
      console.log(retVal);
      return retVal;
    } catch (err) {
      console.log(err.message);
    }
  },*/

async search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  /*-H "Authorization: Bearer {your access token}" -H "Content-Type: application/json" --data "{\"name\":\"A New Playlist\", \"public\":false}"*/

  savePlaylist(name, trackUris) {
      if (!name || !trackUris.length) {
        return;
      }

      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;

      return fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => response.json()
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: name})
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
          });
        });
      });
    }
  /*savePlaylist(playlistName, trackUris) {
    //Check if there are values saved to the method's two arguments
    if (!(playlistName && trackUris)) {
      return;
    }
    const accessToken = this.getAccessToken();
    var headers = { Authorization: `Bearer ${accessToken}` };
    var userID = this.getUserId(headers);
    var playlistID = this.createPlaylist(playlistName, userID, headers);
    var playlistSnapshotId = this.addTracksToPlaylist(
      userID,
      accessToken,
      playlistID,
      trackUris
    );
    return playlistSnapshotId;
  }*/,

  async addTracksToPlaylist(userID, accessToken, playlistID, trackUris) {
    try {
      var headers = { Authorization: `Bearer ${accessToken}` };
      headers.append("Content-Type", "application/json");
      var url =
        "https://api.spotify.com/v1/users/" +
        userID +
        "/playlists/" +
        playlistID +
        "/tracks";
      var uris = { uris: trackUris };
      var jsonUris = JSON.stringify(uris);
      var fetchParams = {
        headers: headers,
        method: "post",
        body: jsonUris
      };
      const httpResp = await fetch(url, fetchParams);
      const jsonResp = await httpResp.json();
      return jsonResp.snapshot_id;
      //To-do: make sure this works
    } catch (err) {
      console.log(err.message);
    }
  },

  async createPlaylist(playlistName, userID, headers) {
    try {
      var url = "https://api.spotify.com/v1/users/" + userID + "/playlists";
      var fetchParams = {
        headers: headers,
        method: "post",
        body: JSON.stringify({ name: playlistName })
      };
      var httpResp = await fetch(url, fetchParams);
      var jsonResp = await httpResp.json();
      return jsonResp.id;
    } catch (err) {
      console.log(err.message);
    }
  },

  async getUserId(headers) {
    try {
      const hd = { headers: headers };
      const httpResp = await fetch("https://api.spotify.com/v1/me", hd);
      const jsonResp = await httpResp.jason();
      return jsonResp.id;
    } catch (err) {
      console.log(err.message);
    }
  },


  getAccessToken() {
  if (userToken) {
    return userToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenMatch && expiresInMatch) {
    userToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => (userToken = ''), expiresIn * 1000);
    window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
    return userToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  }
}

  /*getAccessToken() {
    if (userToken) {
      return userToken;
    }
    const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
    const expiresInMatch = window.location.href.match('/expires_in=([^&]*)/');
    if (accessTokenMatch && expiresInMatch) {
      userToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => userToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return userToken;
    } else {
      var redirectURL =
        "https://accounts.spotify.com/authorize?client_id=" +
        clientID +
        "&response_type=token&scope=playlist-modify-public&redirect_uri=" +
        redirectUri;
      window.location = redirectURL;
    }
  }*/

}
console.log("Leaving spotify.js");
console.log(Spotify);

export default Spotify;
