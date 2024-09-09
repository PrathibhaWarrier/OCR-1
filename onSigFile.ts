onSignalFileSelected(event: any) {
  const files = event.target.files;
  if (files) {
      // Create a new FormData instance for this upload
      const formData = new FormData();

      for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const filePath = file.webkitRelativePath;  // Get the path for each file
          let allowed = this.isAllowedExtension(file.name);

          // Append the file to the correct form data
          if (allowed) {
              formData.append('allowedfiles', file);
          } else {
              formData.append('othersfiles', file);
          }

          // Add file to signalFiles array
          this.signalFiles.push({
              file_name: file.name,
              file_path: filePath,  // Store the path for each file
              file_number: this.signalFiles.length + 1,
              original_name: file.name,
              allowedFiles: allowed
          });
      }

      console.log('Form Data:', formData);
      console.log('Signal Files:', this.signalFiles);

      this.isUploading = true;
      this.shared
          .bulkFileUpload(formData)
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
                      let fileNames = [];

                      for (let x = 0; x < uploadedFiles.length; x++) {
                          fileNames.push(uploadedFiles[x].original_name);
                      }
                      console.log('Signal Files:', this.signalFiles);
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
                  inputElement.value = '';  // Clear the file input
              }
          });
  }
}
