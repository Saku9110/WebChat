import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { bufferCount } from "rxjs/operators";

import { Thread } from "../../model/thread";
import { DataService } from "../../services/data.service";

@Component({
  selector: "wc-threads-list",
  templateUrl: "./threads-list.component.html",
  styleUrls: ["./threads-list.component.scss"]
})
export class ThreadsListComponent implements OnInit {
  threads: Thread[] = [];
  @Input() current: Thread = new Thread();
  @Output() threadChange = new EventEmitter<Thread>();

  avatarUrl = "https://randomuser.me/api/portraits/men/43.jpg";
  name = "John Doe";
  notification = { type: "EnableNotifications" };

  constructor(private dataService: DataService) {
    dataService.getThreadsAsync().subscribe((t: Thread) => {
      this.dataService.addOrUpdate(this.threads, t);
    });
  }

  changeThread(t: Thread) {
    this.current = t;
    this.threadChange.emit(t);
  }

  ngOnInit() {
    // this.threadChange.emit(this.current);
  }
}
