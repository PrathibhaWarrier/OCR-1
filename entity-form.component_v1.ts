import { Component, Input, OnInit } from '@angular/core';
import { DocFile, DocParameterDetails } from '../../../shared/interface';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared/shared.service';
import { map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { SignalEntityFiles } from '../../../shared/interface';
// import { path } from 'path';

interface ChannelType {
  id: string;
  name: string;
}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'signaldb-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
})
export class EntityFormComponent implements OnInit {
  quillModules = {};
  constructor(private fb: FormBuilder, private shared: SharedService) {

    // This is the object for quill editor
    this.quillModules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],                         // link and image, video
        ['emoji']

      ]
    }
  }

  @Input() dropdownOptions: any;
  @Input() precedingEntityOption: any;
  @Input() precedingValSelected!: boolean;
  @Input() precedingSinalNumber = '';
  @Input() type = '';
  @Input() editData!: any;
  @Input() currenSignalNumber = '';
  @Input() entityFiles: any[] = [];
  // @Input() fileFormatSelected = '';
  signalDataFiles: SignalEntityFiles[] = [];
  // signalentity_fileid: [] = [];
  @Input() signalFiles: any[]=[];
  // files: { number: number, name: string }[] = [];

  isUploading = false;
  uploadProgress = 0;
  allowedExtensions = ['.sig', '.txt'];
  channel_types_arr: ChannelType[] = [];
  // signalentity_fileid[]=any;
  precedingEntity!:any;
  @Input() entityListDocs: DocParameterDetails = {
    owner: 'ENTITYLIST',
    files: [],
  };
  @Input() fileError!:string;
  entityForm = this.fb.group({
    entity_list_comments: [''],
    total_repetitions: [],
    signal_name:[''], //['', Validators.required],
    channel_type_ids: [[]],
    wave_form: [{ id: '', name: '', del: null, table: '' }],
    comments: [''],
    file_path: [''],
    file_number:[''],
    
    
    associated_directory: [''],
    preceding_entity_id: [''],
    preceding_entity:[],
    repetitions:[],
    sequence_number:[1]
  });

  get signal_name() {
    return 
    // this.entityForm.get('signal_name');
    
    
  }

  onFolderSelected(event: any) {
    const files: FileList = event.target.files;
    this.signalFiles=[];
    this.entityFiles = [];
    
    this.uploadFiles(this.signalFiles);
    this.scanFiles(files);
    console.log('Filtered Files:', this.signalFiles);
  }

  scanFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (this.isAllowedExtension(file.name)) {
        this.signalFiles.push(file);
      }
    }
    console.log('Filtered Files:', this.signalFiles);
  }

  

  isAllowedExtension(fileName: string): boolean {
    const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    return this.allowedExtensions.includes(extension);
  }

  uploadFiles(files: any[]) {
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append('file', files[index]);
    }
    this.isUploading = true;
    this.shared
      .bulkFileUpload(formData)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.uploadProgress = 0;
              event.loaded && event.total && (this.uploadProgress = Math.round((event.loaded * 100) / event.total));
              break;
            case HttpEventType.Response:
              return event;
          }
        })
      )
      
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          const files = event.body;
          this.isUploading = false;
          for (let x = 0; x < files.length; x++) {
            this.signalFiles.push({
              file_name: files[x].file_name,
              original_name: files[x].original_name,
            });
          }
        }
      }, (error: any) => {
        console.error('Upload failed:', error);
        this.isUploading = false;
      });
  }

  


  //delete a signal file from the array 
  deleteSignalFile(i: number, filename: string) {
    // this.shared.deleteFile(filename).subscribe((result: any) => {
      this.signalFiles.splice(i, 1);
    // });
  }
  showChannelTypes(event: any) {
    let ids: any[] = [];
    this.entityForm.value.channel_type_ids
      ? (ids = this.entityForm.value.channel_type_ids)
      : (ids = []);
    for (let x = 0; x < ids.length; x++) {
      const pos = ids.indexOf(event.id);
      if (pos == -1) {
        const pos1 = this.channel_types_arr.indexOf(event);
        if (pos1 > -1) {
          this.channel_types_arr.splice(pos1, 1);
        }
      } else {
        const pos1 = this.channel_types_arr.indexOf(event);
        if (pos1 == -1) {
          this.channel_types_arr.push(event);
        }
      }
    }
    if (ids.length == 0) {
      this.channel_types_arr = [];
    }
  }

  //This method makes API call to get the file from API service and downloads it to local machine
  downloadFile(dbName: string, original_name: string, event_name:string | null | undefined) {
    this.shared.downloadFile(dbName).subscribe((result: any) => {
      // this.blob = new Blob([result]);
      /** Create an anchor tag to download the recieved file */
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = event_name ? event_name + '-' + original_name : original_name;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    });
  }
  focus(event:any) {
    console.log(event)
  }
  

  /** Save the file in the backend service */

//   onSignalFileSelected(event: any) {
//     this.signalFiles = [];
//     const files = event.target.files;
//     if (files) {
//         const formData = new FormData();

//         for (let index = 0; index < files.length; index++) {
//             const file = files[index];
//             const filePath = file.webkitRelativePath;  // Get the path for each file
//             let allowed = this.isAllowedExtension(file.name);

//             // Append the file to the correct form data
//             if (allowed) {
//                 formData.append('allowedfiles', file);
//             } else {
//                 formData.append('othersfiles', file);
//             }

//             // Push to signalFiles only once
//             this.signalFiles.push({
//                 file_name: file.name,
//                 file_path: filePath,  // Store the path for each file
//                 file_number: this.signalFiles.length + 1,
//                 original_name: file.name,
//                 allowedFiles: allowed
//             });
//         }

//         console.log('Form Data:', formData);
//         console.log('Signal Files:', this.signalFiles);

//         this.isUploading = true;
//         this.shared
//             .bulkFileUpload(formData)
//             .pipe(
//                 map((event: any) => {
//                     switch (event.type) {
//                         case HttpEventType.UploadProgress:
//                             files.progress = Math.round((event.loaded * 100) / event.total);
//                             this.uploadProgress = files.progress;
//                             break;
//                         case HttpEventType.Response:
//                             return event;
//                     }
//                 })
//             )
//             .subscribe((event: any) => {
//                 if (typeof event === 'object') {
//                     this.isUploading = false;
//                     this.fileError = '';
//                     const files = event.body;
//                     let fileNames = [];

//                     for (let x = 0; x < files.length; x++) {
//                         fileNames.push(files[x].original_name);
//                         console.log('Signal Files:', this.signalFiles);
//                     }
//                 }
//             });
//     }
// }

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
              allowedFiles: allowed,
              // signalentity_fileid:this.signalFiles.length + 1,
              // (this.signalFiles.length+1).toString()
          });
          
      }

      console.log('Form Data:', formData);
      console.log('Signal Files:', this.signalFiles);
      // console.log('Signal File ID again:', this.file_number);


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
  // onSignalFileSelected(event: any) {
  //   // console.log('File selected');
  //   const files = event.target.files;
  //   // this.scanFiles(files);
  //   for(let i = 0; i < files.length; i++)
  //   {
  //     const file = files[i];
  //     if (this.isAllowedExtension(file.name)) {
  //       this.entityFiles.push(file);
  //       // if(file)
  //       // {
  //       const formData = new FormData();
  //     for (let index = 0; index < file.length; index++) {
  //       formData.append('file', file[index]);
  //     }
  //     this.isUploading = true;
  //     this.shared
  //       .bulkFileUpload(formData)
  //       .pipe(
  //         map((event: any) => {
  //           switch (event.type) {
  //             case HttpEventType.UploadProgress:
  //               files.progress = Math.round((event.loaded * 100) / event.total);
  //               this.uploadProgress = files.progress;
  //               break;
  //             case HttpEventType.Response:
  //               return event;
  //           }
  //         })
  //       )
  //       .subscribe((event: any) => {
  //         if (typeof event === 'object') {
  //           this.isUploading = false;
  //           this.fileError = '';
  //           const files = event.body;
  //           for (let x = 0; x < files.length; x++) {
  //             // console.log(this.signalFiles);
  //             /** Creating the file object to save it to the database with its 
  //              * original name and unique name that is recieved from API while storing the file in the server
  //              *  */
  //             this.signalFiles.push({
  //               file_name: files[x].file_name,
  //               original_name: files[x].original_name,
  //             });
  //           }
  //         }
        
  //       });
  //     }
  //   }
  //     // }
  //     console.log('Filtered Files:', this.entityFiles);
  //     // console.log(' Files:', file);
   
  // //   if (file) {
  // //     // console.log(file.type);
      
  // // }
  // }
  onSignalFileSelectedFn(event: any) {
    const file = event.target.files;
    const formData = new FormData();
    for (let index = 0; index < file.length; index++) {
      formData.append('file', file[index]);
    }
    // formData.append('file', file);
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
          const files = event.body;
          for (let x = 0; x < files.length; x++) {
            this.signalFiles.push({
              file_name: files[x].file_name,
              original_name: files[x].original_name,
            });
          }
        }
        this.isUploading = false;
      });
    // this.signalFiles.push(...event.target.files);
  }
  // export class FileUploadComponent { 
  //   files: { number: number, name: string }[] = [];
  
  //   onFileSelected(event: any) {
  //     const selectedFiles = event.target.files;
  //     this.files = [];
  
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       this.files.push({ number: i + 1, name: selectedFiles[i].name });
  //     }
  //   }
  // }
  

  // This method will get the selected channel types from channel_type_ids by checking in the dropdownOptions object
  fillChannelTypes(ids: string[]) {
    if (ids) {
      for (let x = 0; x < ids.length; x++) {
        const pos = this.dropdownOptions.CHANNEL_TYPE.map((item: any) => {
          return item.id;
        }).indexOf(ids[x]);
        if (pos !== -1) {
          this.channel_types_arr.push(this.dropdownOptions.CHANNEL_TYPE[pos]);
        }
      }
    }
  }


  autoFill() {
    let wavePos = -1;
    let entPos = -1;
    if (this.editData.wave_form_id) {
      // Find the index of wave_form of the oentity's wave_form_id in the 'dropdownOptions' object
      wavePos = this.dropdownOptions.WAVE_FORM.map((item: any) => {
        return item.id;
      }).indexOf(this.editData.wave_form_id);
    }
    if(this.editData.preceding_entity_id) {
      //Find the index of the precedinng entity 
      entPos = this.precedingEntityOption.map((item:any) => { return item.id}).indexOf(this.editData.preceding_entity_id);
      }

      //creating the signal entity form object
      this.entityForm.patchValue({

        signal_name: this.editData.signal_name,
        channel_type_ids:  this.editData.signalEntityFiles,
        file_path:this.editData.file_path,
        // this.editData.channel_type_ids,
        file_number:this.editData.file_number,
        wave_form: this.dropdownOptions.WAVE_FORM[wavePos],
        comments: this.editData.comments,
        preceding_entity_id: this.editData.preceding_entity_id,
        preceding_entity: this.precedingEntityOption[entPos],
        repetitions:this.editData.repetitions,
        sequence_number: this.editData.sequence_number
      });
      if(this.editData.preceding_entity) {
        this.precedingValSelected = true;
      }
    this.signalFiles = this.editData.signalEntityFiles;
    this.fillChannelTypes(this.editData.channel_type_ids);
    console.log('Filtered Files:', this.signalFiles);
  }
  ngOnInit(): void {
    /** Auto populate the entity form with data when operation is edit
     * type == 'edit' when the edit is clicked from the create signal dialog
     * type == 'editView' when entity edit is clicked from the 'signal view' screen
     */
    if (this.editData && this.type == 'edit' || this.editData && this.type == 'editView') {
      this.autoFill();
    }
  }
}
