import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WebSocketService {
  private url = 'http://localhost:5000';
  private socket = io(this.url);

  constructor() { }

  // Send location to server via socket
  sendLocation(location, count): void {
    this.socket.emit('location', [location, count]);
  }

  // Return observable for tweets
  getTweets() {
    const observable = new Observable(observer => {
      this.socket.on('tweets', tweets => {
        observer.next(tweets);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
