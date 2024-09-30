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
