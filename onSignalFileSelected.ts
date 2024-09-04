onSignalFileSelected(event: any) {
    this.signalFiles = [];
    const files = event.target.files;
    if (files) {
        const formData = new FormData();

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const filePath = file.webkitRelativePath;  // Get the path for each file

            if (this.isAllowedExtension(file.name)) {
                formData.append('allowedfiles', file);
                this.signalFiles.push({
                    file_name: file.name,
                    file_path: filePath,  // Store the path for each file
                    file_number: this.signalFiles.length + 1,
                    original_name: file.name,
                    allowedFiles: true
                });
            } else {
                formData.append('othersfiles', file);
                this.signalFiles.push({
                    file_name: file.name,
                    file_path: filePath,  // Store the path for each file
                    file_number: this.signalFiles.length + 1,
                    original_name: file.name,
                    allowedFiles: false
                });
            }
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
                            file.progress = Math.round((event.loaded * 100) / event.total);
                            this.uploadProgress = file.progress;
                            break;
                        case HttpEventType.Response:
                            return event;
                    }
                })
            )
            .subscribe((event: any) => {
                if (typeof event === 'object') {
                    this.isUploading = false;
                    this.fileError = '';
                    const files = event.body;
                    let fileNames = [];

                    for (let x = 0; x < files.length; x++) {
                        if (this.isAllowedExtension(files[x].file_name)) {
                            this.signalFiles.push({
                                file_name: files[x].file_name,
                                file_path: this.signalFiles[x].file_path,  // Ensure the correct file path is used
                                file_number: this.signalFiles.length + 1,
                                original_name: files[x].original_name,
                                allowedFiles: true
                            });
                        } else {
                            this.signalFiles.push({
                                file_name: files[x].file_name,
                                file_path: this.signalFiles[x].file_path,  // Ensure the correct file path is used
                                file_number: this.signalFiles.length + 1,
                                original_name: files[x].original_name,
                                allowedFiles: false
                            });
                        }

                        fileNames.push(files[x].original_name);
                        console.log('Signal Files:', this.signalFiles);
                    }
                }
            });
    }
}
