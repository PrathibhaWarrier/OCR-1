updateSignalEntityFile(item: SignalEntity) {
    let precedingOption = [];
    console.log(this.signalItem);

    if (this.signalItem.precedingSignal) {
      precedingOption = this.signalItem.precedingSignal.signalEntities;
    }

    // Find the specific file in signalEntityFiles that matches the provided file ID
    let myEntityFile: any = item.signalEntityFiles.filter((val: any) => item.file_id === val.id)[0];
    
    if (!myEntityFile) {
      console.error('File not found!');
      return;
    }

    // Prepare the data to pass to the dialog, including only the necessary fields
    const data = {
      type: 'entity',
      title: 'Edit Event File',
      file_comments: myEntityFile.file_comments.replace(/<[\/]*p>/g, ''), // Clean up the comments if needed
      myEntityFile: myEntityFile,
      eventFiles: myEntityFile, 
      event_list_comments: this.signalItem.event_list_comments,
      dropdownOptions: this.dropdownOptionsSorted,
      precedingEntityOption: precedingOption,
      editData: item,
      signalNumber: this.signalItem.signal_number,
    };

    console.log("Data files", data);

    const dialogRef = this.dialog.open(UpdateIndividualComponent, {
      width: '70%',
      data: data,
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData && myEntityFile) {
        // Update the file comments with the new value from the dialog
        myEntityFile.file_comments = updatedData.file_comments;

        // Update the signal entity file with the edited data
        this.service.updateSignalEntityFile(myEntityFile).subscribe((result: any) => {
          // Reload the signal item to reflect the changes
          this.getSignalItemById(this.signalItem?.id);
        });
      }
    });
}



updateSignalEntityFile(item: SignalEntityFiles) {
  const dialogRef = this.dialog.open(UpdateFileDialogComponent, {
    width: '40%',
    data: {
      title: 'Update Event File',
      message: `Update comment and replace file for ${this.signalItem.signal_number}-${item.entity_number}-${item.file_id}.`,
      currentComment: item.comment,  // Assuming item has a 'comment' property
      currentFile: item.file_path,    // Assuming item has a 'file_path' property
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      const { updatedComment, newFile } = result; // Get updated comment and new file
      
      // Create a new SignalEntityFiles object with updated details
      const updatedEntityFile: SignalEntityFiles = {
        ...item,                     // Spread the existing item properties
        comment: updatedComment,     // Update comment
        file: newFile || item.file   // Replace file if new one is provided
      };

      // Call the service method to update the entity file
      this.service.updateSignalEntityFile(updatedEntityFile).subscribe((response) => {
        this.notification.openSnackbar(
          'Event File updated successfully!!',
          'Close',
          snackbarColors.success
        );
        this.getSignalItemById(this.signalItem.id); // Refresh data
      }, (error) => {
        this.notification.openSnackbar(
          'Error updating the Event File. Please try again.',
          'Close',
          snackbarColors.error
        );
      });
    }
  });
}
