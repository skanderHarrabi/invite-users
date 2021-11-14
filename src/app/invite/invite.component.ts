import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InviteService, User } from '../service/invite.service';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' }
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  alreadyExistingUsers: User[];
  loadingData = false;
  constructor(public inviteService: InviteService, private router: Router) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.inviteService.get().subscribe(res => {
      this.alreadyExistingUsers = res;
      this.loadingData = false;
    });
  }

  onSubmit(): void {
    const usersAlreadyExistMaped = this.alreadyExistingUsers.map(user => user.email);

    // Determine the users that already exists
    usersAlreadyExistMaped.map(userEmail => this.inviteService.duplicatedUsers.add(userEmail));
    // Determine the users to invite
    const userToinvite = users.filter(user => !usersAlreadyExistMaped.includes(user.email));

    // invite the users sequentially
    userToinvite.forEach(async (user, index) => {
        this.inviteService.invite(user).subscribe(
          res => {
            this.inviteService.succesfullyInvitedUsersCount++;
            // redirect to the list route
            if (index === userToinvite.length - 1) {
              this.router.navigate(['/list']);
            }
          },
          err => {
            // save errors if exist
            this.inviteService.errors.add(`Server Error can't add ${user.email}`);
            if (index === userToinvite.length - 1) {
              this.router.navigate(['/list']);
            }
          }
        );
    });
  }
}
