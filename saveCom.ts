onSignalFileSelected(event: any) {
  const files = event.target.files;
  let allowedFileCounter = 1; // Counter for allowed files

  if (files) {
    // Create a new FormData instance for this upload
    const formData = new FormData();

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const filePath = file.webkitRelativePath; // Get the path for each file
      let allowed = this.isAllowedExtension(file.name);
      console.log(event.target);

      // Append the file to the correct form data
      if (allowed) {
        formData.append('allowedfiles', file);

        // Add file to signalFiles array with file_number only for allowed files
        this.signalFiles.push({
          file_name: file.name,
          file_path: filePath,  // Store the path for each file
          file_number: allowedFileCounter, // Assign file_number for allowed files
          original_name: file.name,
          allowedFiles: true,
          file_comments: this.entityForm.value.comments?.replace(/<[\/]*p>/g, '') || '' // Ensure comments are added or default to an empty string
        });

        allowedFileCounter++; // Increment counter for next allowed file
      } else {
        formData.append('othersfiles', file);

        // Add non-allowed files without file_number
        this.signalFiles.push({
          file_name: file.name,
          file_path: filePath, // Store the path for each file
          original_name: file.name,
          allowedFiles: false,
          file_comments: this.entityForm.value.comments?.replace(/<[\/]*p>/g, '') || '' // Ensure comments are added or default to an empty string
        });
      }
    }

    console.log('Form Data:', formData);
    console.log('Signal Files:', this.signalFiles);

    this.isUploading = true;
    
    // First upload the files
    this.shared.bulkFileUpload(formData)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((event.loaded * 100) / event.total);
              this.uploadProgress = progress;
              break;
            case HttpEventType.Response:
              return event;
          }
        })
      )
      .subscribe({
        next: (event: any) => {
          if (typeof event === 'object') {
            this.isUploading = false;
            this.fileError = '';
            const uploadedFiles = event.body;

            // You can process uploadedFiles if needed
            console.log('Uploaded Files:', uploadedFiles);

            // After successful upload, update the comments
            this.updateComments(uploadedFiles); // Call to update comments after upload
          }
        },
        error: (error: any) => {
          this.isUploading = false;
          this.fileError = 'An error occurred while uploading files.';
          console.error('File Upload Error:', error);
        }
      })
      .add(() => {
        // Reset the file input after uploading is complete
        const inputElement = event.target as HTMLInputElement;
        if (inputElement) {
          inputElement.value = ''; // Clear the file input
        }
      });
  }
}

// Function to update comments for already uploaded files
updateComments(uploadedFiles: any): void {
  const commentsFormData = new FormData();

  this.signalFiles.forEach(file => {
    if (file.file_comments && file.file_comments !== '') {
      // Append comments related to each file
      commentsFormData.append('file_comments', file.file_comments);
      commentsFormData.append('file_name', file.file_name);  // Include file name to link comments with files
      commentsFormData.append('file_id', file.file_id);  // Include file ID if available
    }
  });

  if (commentsFormData.has('file_comments')) { // If there are comments to update
    this.shared.bulkFileUpload(commentsFormData) // Reuse the existing bulkFileUpload method
      .subscribe({
        next: (response) => {
          console.log('Comments updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating comments:', error);
        }
      });
  } else {
    console.log('No comments to update.');
  }
}
