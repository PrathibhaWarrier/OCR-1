updateSignalEntityFile(item: SignalEntity) {
    let precedingOption = [];
    if(this.signalItem.precedingSignal) {
      precedingOption = this.signalItem.precedingSignal.signalEntities;
    }
    // item.comments=item.comments.replace(/<[\/]*p>/g, '');
    // console.log(item.comments);
    // find the file format name
    // const fileInd = this.dropdownOptionsSorted.FILE_FORMAT.map( (item:any) => { return item.id}).indexOf(this.signalItem?.file_format_id);
    const data = {
      type: 'entity',
      title: 'Edit Event File',
      // event_list_comments: this.signalItem.event_list_comments,
      event_list_comments: this.signalItem.event_list_comments,

      dropdownOptions: this.dropdownOptionsSorted,
      precedingEntityOption: precedingOption,
      // precedingValSelected: this.signalItem.preceding_sg_id ? true : false,
      editData: item,
      // fileFormatName: fileInd > -1 ? this.dropdownOptionsSorted.FILE_FORMAT[fileInd].name : 'Other',
      signalNumber: this.signalItem.signal_number,
      // precedingSinalNumber: this.signalItem.precedingSignal?.signal_number
    }
    const dialogRef = this.dialog.open(UpdateIndividualComponent, {
      width: '70%',
      data: data,
    });
    dialogRef.afterClosed().subscribe((data1) => {
      // data1.comments=data1.comments.replace(/<[\/]*p>/g, '');
      data1.file_comments=data1.file_comments? data1.file_comments.replace(/<[\/]*p>/g, '') : null;
      let myEntityFile;
      if (data1) {
        // if(data1.preceding_entity) {
        //   data1.preceding_entity_id = data1.preceding_entity.id;
        // }
        for (let i = 0; i < data1.signalEntityFiles.length; i++) {
          // data1.signalEntityFiles[i].file_number = item.id
          if(item.file_id===data1.signalEntityFiles[i].id)
          {
            console.log(data1);
            data1.signalEntityFiles[i].file_comments=data1.file_comments;
            myEntityFile=data1.signalEntityFiles[i];
            console.log(myEntityFile);
            break;
          }
        }
        const fields: {[key:string]:string}= {};
        // Object.keys(data1).forEach(key => data1[key] ? fields[key] = data1[key] : key);
        if(item.id) {
          this.service
          .updateSignalEntityFile(myEntityFile)
          .subscribe((result: any) => {
            this.getSignalItemById(this.signalItem?.id);
            // console.log(fields);
          });
          // console.log(data1);
          
        }
        
      }
    });
  }
  
, 






updateSignalEntityFile(item: SignalEntity) {
    let precedingOption = [];
    if (this.signalItem.precedingSignal) {
      precedingOption = this.signalItem.precedingSignal.signalEntities;
    }

    const data = {
      type: 'entity',
      title: 'Edit Event File',
      event_list_comments: this.signalItem.event_list_comments,
      dropdownOptions: this.dropdownOptionsSorted,
      precedingEntityOption: precedingOption,
      editData: item,  // Pass only the file entity from the specific row
      signalNumber: this.signalItem.signal_number,
    };

    const dialogRef = this.dialog.open(UpdateIndividualComponent, {
      width: '70%',
      data: data,
    });

    dialogRef.afterClosed().subscribe((data1) => {
      data1.file_comments = data1.file_comments ? data1.file_comments.replace(/<[\/]*p>/g, '') : null;
      
      if (data1 && item.id) {
        // Update only the specific file in the current row
        const updatedFile = {
          ...item,  // Keep existing properties
          file_comments: data1.file_comments,  // Update comments
        };

        this.service
          .updateSignalEntityFile(updatedFile)  // Send update for only this file
          .subscribe((result: any) => {
            this.getSignalItemById(this.signalItem?.id);
          });
      }
    });
  }
