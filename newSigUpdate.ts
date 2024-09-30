updateSignalEntityFile(item: SignalEntity) {
  let precedingOption = [];
  console.log(this.signalItem);
  
  if (this.signalItem.precedingSignal) {
    precedingOption = this.signalItem.precedingSignal.signalEntities;
  }

  // Find the specific file in signalEntityFiles that matches the provided file ID
  let myEntityFile: any = item.signalEntityFiles.filter((val: any) => item.file_id === val.id);
  
  if (!myEntityFile || myEntityFile.length === 0) {
    console.error('No matching entity file found!');
    return; // Early return if no file is found
  }
  
  myEntityFile = myEntityFile[0]; // Get the first matching entity file
  
  // Prepare the data to pass to the dialog
  const data = {
    type: 'entity',
    title: 'Edit Event File',
    file_comments: myEntityFile.file_comments.replace(/<[\/]*p>/g, '')!, // Clean up the comments
    myEntityFile: myEntityFile, // Pass the selected file to the dialog
    eventFiles: myEntityFile, // Pass the selected file to the dialog
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
    if (updatedData) {
      // Update the file comments with the new value from the dialog
      myEntityFile.file_comments = updatedData.file_comments;

      // Check if a new file is provided
      if (updatedData.newFile) {
        myEntityFile.file = updatedData.newFile; // Replace the file with the new one
      }

      // Update the signal entity file with the edited data
      this.service.updateSignalEntityFile(myEntityFile).subscribe((result: any) => {
        // Optionally handle the result or errors
        this.notification.openSnackbar(
          'Event File updated successfully!!',
          'Close',
          snackbarColors.success
        );

        // Reload the signal item to reflect the changes
        this.getSignalItemById(this.signalItem?.id);
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
