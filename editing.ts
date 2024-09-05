<div *ngIf="column.name === 'settings' ">
  <!-- Check if this row is being edited -->
  <ng-container *ngIf="editIndex === i; else viewMode">
    <!-- Render save/cancel buttons when in edit mode -->
    <mat-icon color="primary" matTooltip="Save changes" class="clickable-item" (click)="saveChanges(element, i); $event.stopPropagation()">save</mat-icon> &nbsp;&nbsp;
    <mat-icon color="warn" matTooltip="Cancel editing" class="clickable-item" (click)="cancelEdit(); $event.stopPropagation()">cancel</mat-icon>
  </ng-container>
  <ng-template #viewMode>
    <!-- Default edit and delete buttons when not in edit mode -->
    <mat-icon color="primary" matTooltip="Edit event" class="clickable-item" (click)="editRow(i); $event.stopPropagation()">edit_note</mat-icon> &nbsp;&nbsp;
    <mat-icon color="warn" matTooltip="Delete event" class="clickable-item" (click)="deleteSignalEntity(element); $event.stopPropagation()">delete</mat-icon>
  </ng-template>
</div>





////////////////////////////////////////////////////////////////////




export class YourComponent {
  editIndex: number | null = null;  // To track which row is being edited

  // Trigger edit mode for the specific row
  editRow(index: number): void {
    this.editIndex = index;
  }

  // Save changes and exit edit mode
  saveChanges(element: any, index: number): void {
    // Implement your save logic here (e.g., updating backend)
    // Once saved, exit edit mode
    this.editIndex = null;
  }

  // Cancel editing mode
  cancelEdit(): void {
    this.editIndex = null;
  }

  // Existing delete functionality
  deleteSignalEntity(element: any): void {
    // Your delete logic
  }
}


///deleteSignal

deleteSignalEntity(item:any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      data: {
        title: 'Delete Event',
        message: `Event ${this.signalItem.signal_number}-${item.entity_number} will be permanently deleted. Are you sure?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirmed') {
        this.service.deleteSignalEntity(item.id).subscribe((result) => {
          this.notification.openSnackbar(
            'Event deleted successfully!!',
            'Close',
            snackbarColors.success
          );
          this.getSignalItemById(this.signalItem.id);
        });
      }
    });
  }
//////////////////////////////////////////////////

deleteSignalEntity(item: any) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '40%',
    data: {
      title: 'Delete Event',
      message: `Event ${this.signalItem.signal_number}-${item.entity_number} will be permanently deleted. Are you sure?`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result == 'confirmed') {
      // Optimistically remove from UI or show a loading state
      this.datasource = this.datasource.filter(event => event.id !== item.id);

      this.service.deleteSignalEntity(item.id).subscribe({
        next: () => {
          this.notification.openSnackbar(
            'Event deleted successfully!',
            'Close',
            snackbarColors.success
          );
          // Refresh data from backend if needed
          this.getSignalItemById(this.signalItem.id);
        },
        error: () => {
          this.notification.openSnackbar(
            'Error occurred while deleting event.',
            'Close',
            snackbarColors.error
          );
        }
      });
    }
  });
}









//////////////////////////////////////////////

<div *ngIf="column.name === 'settings' ">
  <mat-icon 
    color="primary" 
    matTooltip="Edit event" 
    class="clickable-item" 
    (click)="updateSignalEntity(i, element); $event.stopPropagation()">edit_note</mat-icon> &nbsp;&nbsp;
  <mat-icon 
    color="warn" 
    matTooltip="Delete event" 
    class="clickable-item" 
    (click)="deleteSignalEntity(element); $event.stopPropagation()">delete</mat-icon> 
</div>


      


deleteSignalEntity(item: any) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '40%',
    data: {
      title: 'Delete Event',
      message: `Event ${this.signalItem.signal_number}-${item.entity_number} will be permanently deleted. Are you sure?`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === 'confirmed') {
      this.service.deleteSignalEntity(item.id).subscribe(() => {
        this.notification.openSnackbar(
          'Event deleted successfully!',
          'Close',
          snackbarColors.success
        );
        // Remove the item from the list
        this.signalItems = this.signalItems.filter((signal) => signal.id !== item.id);
      });
    }
  });
}



deleteSignalEntity(item: any) {
  // Open confirmation dialog
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '40%',
    data: {
      title: 'Delete Event',
      message: `Event ${this.signalItem.signal_number}-${item.entity_number} will be permanently deleted. Are you sure?`,
    },
  });

  // Handle dialog result
  dialogRef.afterClosed().subscribe((result) => {
    if (result === 'confirmed') {
      // Call backend service to delete the signal entity by its ID
      this.service.deleteSignalEntity(item.id).subscribe({
        next: (response) => {
          // Show success notification
          this.notification.openSnackbar(
            'Event deleted successfully!!',
            'Close',
            snackbarColors.success
          );
          
          // Refresh data to reflect changes
          this.getSignalItemById(this.signalItem.id);
        },
        error: (error) => {
          // Handle error and show notification
          this.notification.openSnackbar(
            'Failed to delete event.',
            'Close',
            snackbarColors.error
          );
        }
      });
    }
  });
}

















deleteSignalEntity(item: any) {
  // Open confirmation dialog
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '40%',
    data: {
      title: 'Delete Event',
      message: `Event ${this.signalItem.signal_number}-${item.entity_number} will be permanently deleted. Are you sure?`,
    },
  });

  // Handle dialog result
  dialogRef.afterClosed().subscribe((result) => {
    if (result === 'confirmed') {
      // Call backend service to delete the signal entity by its ID
      this.service.deleteSignalEntity(item.id).subscribe({
        next: (response) => {
          // Show success notification
          this.notification.openSnackbar(
            'Event deleted successfully!!',
            'Close',
            snackbarColors.success
          );
          
          // Refresh data to reflect changes
          this.getSignalItemById(this.signalItem.id);
        },
        error: (error) => {
          // Handle error and show notification
          this.notification.openSnackbar(
            'Failed to delete event.',
            'Close',
            snackbarColors.error
          );
        }
      });
    }
  });
}


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

  // Method to open confirmation dialog
  confirmDelete(element: any, index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { 
        title: 'Delete Event',
        message: `Event ${this.signalItem.signal_number}-${element.entity_number} will be permanently deleted. Are you sure?` 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteSignalEntity(element, index);
      }
    });
  }

  // Method to delete the specific row
  deleteSignalEntity(element: any, index: number): void {
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
}
