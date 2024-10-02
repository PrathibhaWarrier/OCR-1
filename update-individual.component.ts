import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuillEditorComponent } from '../../../shared/components/quill-editor/quill-editor.component';
import { SignalContentComponent } from '../signal-content/signal-content.component';
import { SetupInformationComponent } from '../setup-information/setup-information.component';
import { ToolingComponent } from '../tooling/tooling.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { EventComponent } from '../event/event.component';
import { GeneralInfoComponent } from '../general-info/general-info.component';

@Component({
  selector: 'signaldb-update-individual',
  templateUrl: './update-individual.component.html',
  styleUrls: ['./update-individual.component.scss'],
})
export class UpdateIndividualComponent implements OnInit {
  constructor(  public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateIndividualComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  @ViewChild('quillEditorItem')
  quillEditorItem!: QuillEditorComponent;
  @ViewChild('signalContent') signalContentItem!: SignalContentComponent;
  @ViewChild('generalInfoItem') generalInfoItem!: GeneralInfoComponent;
  @ViewChild('event') eventInfo!: EventComponent;
  @ViewChild('setupInfo') setupInfoItem!: SetupInformationComponent;
  @ViewChild('tooling') toolingInfoItem!: ToolingComponent;
  @ViewChild('signalEntity') signalEntityItem!: EntityFormComponent
  commentsValue = '';
  fileError = '';
  valueChangedFrmChild(event:string) {
    // console.log(event);
    this.commentsValue = event;
  }
  close() {
    this.dialogRef.close();
  }

  submitData() {
    console.log(this.data);
    if(this.data.type == 'project') {
    this.dialogRef.close(this.quillEditorItem.commentsForm.value);
    } else if(this.data.type == 'general') {
      const contdata = this.generalInfoItem.projectInfoForm.value;
      this.dialogRef.close(contdata);
    } else if(this.data.type == 'advanced') {
      const contdata = this.generalInfoItem.advancedInfo.value;
      this.dialogRef.close(contdata);
    } else if(this.data.type == 'event') {
      const contdata = {
        event_list_comments: this.eventInfo.eventForm.value.event_list_comments,
        // total_repetitions:this.eventInfo.eventForm.value.total_repetitions,
      docParameterDetails: [
        this.eventInfo.eventListDocs,
      ]
      }
      this.dialogRef.close(contdata);
    } else if (this.data.type == 'signalContent') {
      const contdata = {
          event_list_comments: this.signalContentItem.contentForm.value.event_list_comments,
        channel_list_comments: this.signalContentItem.contentForm.value.channel_list_comments,
        docParameterDetails: [
          this.signalContentItem.eventListDocs,
          this.signalContentItem.channelListDocs
        ]
        }
        this.dialogRef.close(contdata);
      } else if(this.data.type == 'setupInfo') {
        const contdata = {
          suspension_part_comments: this.setupInfoItem.setpInfoForm.value.suspension_part_comments,
          kinematic_model_comments:  this.setupInfoItem.setpInfoForm.value.kinematic_model_comments,
          tooling_numbers: this.setupInfoItem.toolingComp.toolingNumbers,
          tooling_comments:  this.setupInfoItem.toolingComp.toolingForm.value.tooling_comments,
        docParameterDetails: [
          this.setupInfoItem.suspensionDocs,
          this.setupInfoItem.kinematicsDocs,
          this.setupInfoItem.toolingComp.toolingDocs,
        ]
        }
        this.dialogRef.close(contdata);
      } else if(this.data.type == 'toolingInfo') {
        const contdata = {
          tooling_number: this.toolingInfoItem.toolingForm.value.tooling_number,
          tooling_comments:  this.toolingInfoItem.toolingForm.value.tooling_comments,
        docParameterDetails: [
          this.toolingInfoItem.toolingDocs,
        ]
        }
        this.dialogRef.close(contdata);
      } else if (this.data.type == 'entity') {
        const formVal = this.signalEntityItem.entityForm.value;
    // const files = this.signalEntityItem.signalFiles;
      const files = this.data.myEntityFile;
      let comment=this.data.myEntityFile[1];
      console.log(Object.entries(files));
      files.forEach((val:any) => console.log(val));
      console.log(comment);
      console.log(files[0]);
      console.log(this.data.editData.file_comments);
      console.log(this.data.file_comments);


      console.log(this.signalEntityItem.entityForm)


    if(files.length == 0) {
      this.fileError = 'Event file should be uploaded';
    } else {
      // let file_comment= files[0].file_comments;
      // files[0].'0'.


      const chs = this.signalEntityItem.channel_types_arr;
    if(this.data.editData) {
      const entity = this.data.editData;
      entity.signal_name = formVal.signal_name;
      entity.wave_form = formVal.wave_form;
      entity.wave_form_id = formVal.wave_form?.id;
      entity.channel_type_ids = formVal.channel_type_ids;
      entity.file_comments = formVal.file_comments;
      entity.comments = formVal.comments;
      entity.signalEntityFiles = files;
      entity.channel_types_arr = chs;
      entity.preceding_entity = formVal.preceding_entity;
      entity.sequence_number = formVal.sequence_number;
      entity.repetitions = formVal.repetitions;
      this.dialogRef.close(entity);
    } else {
      const entity = {
        signal_name: formVal.signal_name,
        wave_form : formVal.wave_form,
        wave_form_id : formVal.wave_form?.id,
        channel_type_ids : formVal.channel_type_ids,
        comments: formVal.comments,
        file_comments : formVal.file_comments,
        signalEntityFiles: files,
        channel_types_arr : chs,
        preceding_entity :formVal.preceding_entity,
        sequence_number :formVal.sequence_number,
        repetitions : formVal.repetitions
      }
      this.dialogRef.close(entity)
    }
    
    }
    
      }
    }
  ngOnInit(): void {
    if(this.data.type == 'project') {
      this.commentsValue = this.data.comments;
    }
  }
}
