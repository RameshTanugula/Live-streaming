import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-corp-video-player',
  templateUrl:'./youtubelive.component.html',
  styleUrls: ['./youtubelive.component.scss'
  ]
})

export class YoutubeliveComponent implements OnInit {
  private apiLoaded = false;
  @Input() videoId ='';
  playerVars = {
    cc_lang_pref: 'en',
  };
  // @Input() videoId: string = this.route.snapshot.params["id"]
// '3e8ntIdjAeo';
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.apiLoaded && this.videoId) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

}
