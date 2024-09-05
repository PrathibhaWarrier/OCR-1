import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { YourService } from './your-service.service'; // Adjust the import path as necessary
import { NotificationService } from './notification.service'; // Adjust the import path as necessary

@Component({
  // ...
})
export class YourComponent {
  dataSource: any[] = []; // Assuming this is your data source
  signalItem: any; // Assuming this is defined somewhere

  constructor(
    private dialog: MatDialog,
    private yourService: YourService,
    private notification: NotificationService
  ) {}

  // Method to delete the specific row with confirmation
  deleteSignalEntity(element: any, index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { 
        title: 'Delete Event',
        message: `Event ${this.signalItem.signal_number}-${element.entity_number} will be permanently deleted. Are you sure?` 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Perform the actual delete operation on the backend
        this.yourService.deleteElement(element.id).subscribe({
          next: () => {
            // Remove element from the data source
            this.dataSource.splice(index, 1);

            // Provide success feedback
            this.notification.openSnackbar(
              'Event deleted successfully!!',
              'Close',
              { backgroundColor: 'green', color: 'white' } // Adjust snackbarColors as needed
            );
          },
          error: (error) => {
            // Provide error feedback
            this.notification.openSnackbar(
              'Failed to delete event. Please try again later.',
              'Close',
              { backgroundColor: 'red', color: 'white' } // Adjust snackbarColors as needed
            );
            console.error('Error deleting event:', error);
          }
        });
      }
    });
  }
}