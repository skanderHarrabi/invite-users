import { Component, OnInit, OnDestroy } from '@angular/core';
import { InviteService, User } from '../service/invite.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit, OnDestroy {
  users$: User[];
  duplicatedUsersArray: string[];
  serverErrors: string[];
  numberOfUsersInvited: number;
  loadingData = false;
  constructor(private inviteService: InviteService) {
  }

  ngOnInit(): void {
    this.loadingData = true;
    this.inviteService.get().subscribe(
      res => {
        this.users$ = res;
        this.loadingData = false;
      }
    );
    this.duplicatedUsersArray = [...this.inviteService.duplicatedUsers];
    this.serverErrors = [...this.inviteService.errors];
    this.numberOfUsersInvited = this.inviteService.succesfullyInvitedUsersCount;

    setTimeout(() => {
      this.cleanUp();
    }, 5000);
  }

  ngOnDestroy(): void {
    // Clear Service when comonent ends
    this.inviteService.duplicatedUsers.clear();
    this.inviteService.errors.clear();
    this.inviteService.succesfullyInvitedUsersCount = 0;
  }

  // clean up variables after timeout (5 seconds)
  cleanUp() {
    this.duplicatedUsersArray = [];
    this.serverErrors = [];
    this.numberOfUsersInvited = 0;
  }
}
