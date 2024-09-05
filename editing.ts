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

