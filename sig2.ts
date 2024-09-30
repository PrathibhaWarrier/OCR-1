updateSignalFiles(index: number, file: any) {
    // Prepare options for file update, similar to updateSignalEntity
    const precedingOption = this.signalItem.precedingSignal ? this.signalItem.precedingSignal.signalEntities : [];

    // Prepare data for dialog, including file information and preceding options
    const data = {
        type: 'file',
        title: 'Edit File',
        dropdownOptions: this.dropdownOptionsSorted,
        precedingEntityOption: precedingOption,
        precedingValSelected: this.signalItem.preceding_sg_id ? true : false,
        editData: file, // Pass the file object here
        signalNumber: this.signalItem.signal_number,
        precedingSignalNumber: this.signalItem.precedingSignal?.signal_number,
    };

    // Open dialog to allow the user to update file, comments, or upload a new file
    const dialogRef = this.dialog.open(UpdateIndividualComponent, {
        width: '70%',
        data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            // Clean up the comments field (if necessary)
            if (result.comments) {
                result.comments = result.comments.replace(/<[\/]*p>/g, '');
            }

            // Handle comments update
            const updatedFileData = {
                ...file,  // Keep existing file data
                comments: result.comments,  // Update comments
                signal_entity_file_id: file.id,  // Use signal_entity_file_id for updating
            };

            // Check if there is a new file to be uploaded
            if (result.newFile) {
                // Delete old file using deleteSignalEntityFile
                this.service.deleteSignalEntityFile(file.id).subscribe(
                    () => {
                        console.log('Old file deleted successfully!');
                        // Once the old file is deleted, upload the new file
                        const formData = new FormData();
                        formData.append('file', result.newFile);
                        formData.append('comments', result.comments || '');  // Append the updated comments
                        formData.append('signal_entity_id', file.signal_entity_id);  // Include signal_entity_id to associate the file

                        // Use the service's `updateSignalEntityFile()` to create a new file entity
                        this.service.updateSignalEntityFile(formData).subscribe(
                            (response: any) => {
                                console.log('New file uploaded and comments updated successfully!', response);
                                // Refresh signal item data
                                this.getSignalItemById(this.signalItem?.id);
                            },
                            (error) => {
                                console.error('Error uploading new file or updating comments:', error);
                            }
                        );
                    },
                    (error) => {
                        console.error('Error deleting old file:', error);
                    }
                );
            } else {
                // If no new file is uploaded, update comments only
                this.service.updateSignalEntityFile(updatedFileData).subscribe(
                    (response: any) => {
                        console.log('Comments updated successfully!', response);
                        this.getSignalItemById(this.signalItem?.id); // Refresh data
                    },
                    (error) => {
                        console.error('Error updating comments:', error);
                    }
                );
            }
        }
    });
}




updateSignalFiles(index: number, file: any) {
    // Prepare options for file update, similar to updateSignalEntity
    const precedingOption = this.signalItem.precedingSignal ? this.signalItem.precedingSignal.signalEntities : [];

    // Prepare data for dialog, including file information and preceding options
    const data = {
        type: 'file',
        title: 'Edit File',
        dropdownOptions: this.dropdownOptionsSorted,
        precedingEntityOption: precedingOption,
        precedingValSelected: this.signalItem.preceding_sg_id ? true : false,
        editData: file, // Pass the file object here
        signalNumber: this.signalItem.signal_number,
        precedingSignalNumber: this.signalItem.precedingSignal?.signal_number,
    };

    // Open dialog to allow the user to update file, comments, or upload a new file
    const dialogRef = this.dialog.open(UpdateIndividualComponent, {
        width: '70%',
        data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            // Clean up the comments field
            result.comments = result.comments.replace(/<[\/]*p>/g, '');

            // Handle the file update and comment update in a single JSON object
            const updatedFileData = {
                id: file.id,  // Keep the file ID for reference
                comments: result.comments,  // Updated comments
                signal_entity_file_id: file.id,  // Use signal_entity_file_id for updating
                newFileMetadata: result.newFile ? result.newFile : null  // Optional: If you want to handle new file metadata (but not the file itself)
            };

            // Send the updated data to the backend (file and comments)
            this.service.updateSignalEntityFile(updatedFileData).subscribe(
                (response: any) => {
                    console.log('File and comments updated successfully!', response);
                    // Refresh signal item data
                    this.getSignalItemById(this.signalItem?.id);
                },
                (error) => {
                    console.error('Error updating file or comments:', error);
                }
            );
        }
    });
}
