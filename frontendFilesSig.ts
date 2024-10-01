updateSignalEntityFile(item: SignalEntity) {
    let precedingOption = [];
    console.log(this.signalItem);
    if (this.signalItem.precedingSignal) {
      precedingOption = this.signalItem.precedingSignal.signalEntities;
    }

    // Find the specific file in signalEntityFiles that matches the provided file ID
    let myEntityFile:any;
    // for (let i = 0; i < this.signalItem.signalEntities.signalEntityFiles.length; i++) {
    //   if (item.file_id === this.signalItem.signalEntities.signalEntityFiles[i].id) {
    //     myEntityFile = this.signalItem.signalEntities.signalEntityFiles[i];
    //     break;
    //   }
    // }

    console.log(item);
    console.log("file id:",item.file_id);
    console.log(item.id);
    myEntityFile=item.signalEntityFiles.filter((val:any)=> item.file_id===val.id);
    item.signalEntityFiles=myEntityFile;
    //  item.comments=item.signalEntityFiles.length > 0 ? item.signalEntityFiles[0].file_comments!: null!
    console.log(myEntityFile);

    // Prepare the data to pass to the dialog, including only the necessary fields
    const data = {
      type: 'entity',
      title: 'Edit Event File',
      file_comments: myEntityFile[0].file_comments.replace(/<[\/]*p>/g, '')!, // Clean up the comments if needed
      // signalNumber: this.signalItem.signal_number,
      myEntityFile: myEntityFile, // Pass the selected file to the dialog
      eventFiles: myEntityFile, // Pass the selected file to the dialog
      // original_name:item.original_name,
      // file_name:item.file_name,
      // file_number:item.file_number,
      // file_path:item.file_path,
      file_id:item.file_id,
      // id=item.file_id,
      
    
    
      event_list_comments: this.signalItem.event_list_comments,

      dropdownOptions: this.dropdownOptionsSorted,
      precedingEntityOption: precedingOption,
      // precedingValSelected: this.signalItem.preceding_sg_id ? true : false,
      editData: item,
      // fileFormatName: fileInd > -1 ? this.dropdownOptionsSorted.FILE_FORMAT[fileInd].name : 'Other',
      signalNumber: this.signalItem.signal_number
      // precedingSinalNumber: this.signalItem.precedingSignal?.signal_number
      
    };
    
    console.log(" Data files",data);

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




export interface SignalEntityFiles {
  id: string;
  original_name: string;
  file_name: string;
  signal_entity_id?: string;
  file_comments?: string;
  file_number?: string;
  file_id:string

}











 updateSignalEntityFile(entityFile: SignalEntityFiles ) {
    entityFile.id
    console.log('update or insert signal entity file')
    const url = enviroment.apiUrl + '/signal/entity/entityFile';
    console.log(entityFile)
    console.log(entityFile.id)

    // const deletedBy = this.userId;
    return this.http.put(url,entityFile).pipe( response => {
      return response;
    })
  }
