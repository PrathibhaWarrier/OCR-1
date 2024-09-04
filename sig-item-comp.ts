<div class="container">
  <div class="general-info" *ngIf="signalItem">
    <div class="version-alert" [ngClass]="versionClass" *ngIf="versionClass !== 'current'">
      <!-- <marquee direction="right" height="30%"> -->
        {{versionMessage}}
        <!-- </marquee> -->
    </div>
    <div class="item-headers">
      <span><h1 class="header-name">{{signalItem.project_name}}</h1></span>
      <div class="header-action-div">
        <div class="item-header-div">
          <div class="item-header" *ngIf="signalItem">
            <button mat-icon-button matTooltip="Edit signal info"  class="clickable-item" (click)="editGeneralInfo()">
              <mat-icon color="primary" 
              class="">edit_note</mat-icon>
            </button>
            <button mat-stroked-button class="version-menu" matTooltip="Signal versions"  [matMenuTriggerFor]="versions">
              <mat-icon  class="" color="primary">arrow_drop_down</mat-icon>v{{signalItem.signalVersion?.version_number}}</button>
              <span>
                  <button mat-icon-button 
                      [matMenuTriggerFor]="menu" 
                      aria-label="settings"
                      class=""
                      color="primary"
                      matTooltip="Actions" >
                      <mat-icon>settings</mat-icon>
                </button>
            <mat-menu #menu="matMenu">
              <ng-template matMenuContent>
              <!-- <button mat-menu-item  (click)="editGeneralInfo()" >
                <mat-icon matTooltip="View signal" color="primary">edit_note</mat-icon>
                <span>Edit</span>
              </button> -->
              <button mat-menu-item (click)="copySignal(signalItem.id)">
                <mat-icon matTooltip="Edit signal" color="primary">content_copy</mat-icon>
                <span>Copy</span>
              </button>
              <!-- <button mat-menu-item (click)="setStatus(signalItem.id)">
                <mat-icon [matTooltip]="statusTooltipText" color="primary">update</mat-icon>
                <span>Status</span>
              </button> -->
              <button mat-menu-item (click)="deleteSignal(signalItem.id)" *ngIf="currentVersion === selectedVersion">
                  <mat-icon matTooltip="Delete signal"  color="warn">delete</mat-icon>
                  <span>Delete</span>
                </button>
              </ng-template>
            </mat-menu>
            <mat-menu #versions="matMenu">
              <button mat-menu-item (click)="newVersionOfSignal()"><mat-icon matTooltip="Add version" color="primary">add</mat-icon></button>
              <button mat-menu-item 
                      *ngFor="let version of SignalVersions;index as i"
                      [ngClass]="signalItem.id === version.signal_id ? 'active-version' : null"
                      [disabled]="!version.isAvailable"
                      (click)="updateSignalItem(version)">v{{version.version_number }}</button>
              
            </mat-menu>
              </span>
          </div>
        </div>
        </div>
    </div>
    <div style="display: flex; justify-content: space-between;" >
      <div class="general-info-data">
        <div class="general-info-row">
          <div class="general-info-label"><b></b></div>
          <div class="general-info-value"></div>
        </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Signal number:</b></div>
          <div class="general-info-value">{{signalItem.signal_number}}</div>
        </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Creator:</b></div>
          <div class="general-info-value">{{signalItem.requestor}}</div>
        </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Project number:</b></div>
          <div class="general-info-value">{{signalItem.project_xnr}}</div>
        </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Customer:</b></div>
          <div class="general-info-value">{{signalItem.customer?.name}}</div>
        </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Control mode:</b></div>
          <div class="general-info-value">{{signalItem.controlMode?.name}}</div>
        </div>
        <!-- <div class="general-info-row">
          <div class="general-info-label"><b>File format:</b></div>
          <div class="general-info-value">{{signalItem.fileFormat?.name}}</div>
        </div> -->
        <div class="general-info-row flex-cancel" >
          <div class="general-info-label"><b>Test domain:</b></div>
            <div class="multiple-values">
              <ng-container *ngFor="let c of signalItem.signalTestDomain; let last = last">
                <span >{{c.test_domain.name}}{{!last ? ', ':''}}</span></ng-container>      
            </div>
          </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Associated directory:</b></div>
          <div class="general-info-value">{{signalItem.associated_directory}}</div>
        </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Preceding SG number:</b></div>
          <div class="general-info-value">{{signalItem.precedingSignal?.signal_number}}</div>
        </div>
        <div class="general-info-row">
          <div class="general-info-label"><b>Status:</b></div>
          <div class="general-info-value">
            <mat-icon color="success" *ngIf="signalItem.in_use">check</mat-icon>
            <mat-icon color="warn" *ngIf="!signalItem.in_use">close</mat-icon>
  
          </div>
        </div>
        
      </div>
      <div>
        <mat-accordion>
          <mat-expansion-panel expanded="true">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <b><p style="font-size: 17px;">Preceding Signals</p></b>&nbsp;<mat-icon style="color:#3f51b5;" class="tooltipClass" [matTooltip]='toolTipContent'>help</mat-icon>
              </mat-panel-title>
            </mat-expansion-panel-header>
              <signaldb-network-graph [signalId]="signalItem.id" [signalNumber]="signalItem.signal_number"></signaldb-network-graph>
          </mat-expansion-panel>
        </mat-accordion>
       
      </div>
     
    </div>
    
    <!-- <div class="general-info-main">
      <div class="general-info-content">
        <div class="general-info-row">
          <div class="general-info-item">
              <div class="general-info-label">Signal number</div>
              <div class="general-info-value">{{signalItem.signal_number}}</div>
          </div>
          <div class="general-info-item">
            <div class="general-info-label">Requestor</div>
            <div class="general-info-value">{{signalItem.requestor}}</div>
          </div>
          <div class="general-info-item">
            <div class="general-info-label">Signal name</div>
            <div class="general-info-value">{{signalItem.project_name}}</div>
          </div>
          <div class="general-info-item">
            <div class="general-info-label">Project number</div>
            <div class="general-info-value">{{signalItem.project_xnr }}</div>
          </div>
        </div>
        <div class="general-info-row">
          <div class="general-info-item">
            <div class="general-info-label">Customer</div>
            <div class="general-info-value">{{signalItem.customer?.name}}</div>
          </div>
          <div class="general-info-item">
            <div class="general-info-label">Control mode</div>
            <div class="general-info-value">{{signalItem.controlMode?.name}}</div>
          </div>
          <div class="general-info-item">
            <div class="general-info-label">File format</div>
            <div class="general-info-value">{{signalItem.fileFormat?.name}}</div>
          </div>
          <div class="general-info-item">
            <div class="general-info-label">Test domain</div>
            <div class="general-info-value">{{signalItem.testDomain?.name}}</div>
          </div>
        </div>
        <div class="general-info-row">
          
          <div class="general-info-item">
            <div class="general-info-label">Associated directory</div>
            <div class="general-info-value">{{signalItem.associated_directory}}</div>
          </div>
          <div class="general-info-item">
            <div class="general-info-label">Preceding SG number</div>
            <div class="general-info-value">{{signalItem.precedingSignal?.signal_number}}</div>
          </div>
        </div>
        
      </div>
      <div class="header-action-div">
      <div class="item-header-div">
        <div class="item-header" *ngIf="signalItem">
          <button mat-icon-button class="white-icon-btn" (click)="editGeneralInfo()">
            <mat-icon matTooltip="View signal" 
            class="white-icon-btn">edit_note</mat-icon>
          </button>
          <button mat-stroked-button class="white-icon-btn version-menu" [matMenuTriggerFor]="versions">
            <mat-icon  class="white-icon-btn">arrow_drop_down</mat-icon>v{{signalItem.signalVersion?.version_number}}</button>
            <span>
                <button mat-icon-button 
                    [matMenuTriggerFor]="menu" 
                    aria-label="settings"
                    class="white-icon-btn"
                    matTooltip="actions" >
                    <mat-icon>settings</mat-icon>
              </button>
          <mat-menu #menu="matMenu">
            <ng-template matMenuContent>
            <button mat-menu-item (click)="copySignal(signalItem.id)">
              <mat-icon matTooltip="Edit signal" color="primary">content_copy</mat-icon>
              <span>Copy</span>
            </button>
            <button mat-menu-item (click)="deleteSignal(signalItem.id)" *ngIf="currentVersion === selectedVersion">
                <mat-icon matTooltip="Delete signal"  color="warn">delete</mat-icon>
                <span>Delete</span>
              </button>
            </ng-template>
          </mat-menu>
          <mat-menu #versions="matMenu">
            <button mat-menu-item (click)="newVersionOfSignal()"><mat-icon matTooltip="Add version" color="primary">add</mat-icon></button>
            <button mat-menu-item 
                    *ngFor="let version of SignalVersions;index as i"
                    [ngClass]="signalItem.id === version.signal_id ? 'active-version' : null"
                    [disabled]="!version.isAvailable"
                    (click)="updateSignalItem(version)">v{{version.version_number }}</button>
            
          </mat-menu>
            </span>
        </div>
      </div>
      </div>
    </div> -->
  </div>
    <mat-card class="content-card">
    
        <div *ngIf="signalItem">
         
          <mat-accordion multi>
            <mat-expansion-panel expanded="true" class="expansion-pane-class">
              <mat-expansion-panel-header>
                <mat-panel-title class="expansion-panel-title-text">
                  <mat-icon  color="primary">query_stats</mat-icon>&nbsp;&nbsp;
                  Events
                </mat-panel-title>
                <mat-panel-description>
                </mat-panel-description>
              </mat-expansion-panel-header>
            
              <div class="event-actions">
                <button mat-stroked-button  matTooltip="Event column settings"  (click)="entityColumnSettings()" class="add-event-btn">
                  <mat-icon color="primary">view_column</mat-icon>
                </button>
                <button mat-stroked-button (click)="addEvent()" matTooltip="Add Event"  class="add-event-btn">
                  <mat-icon color="primary">add</mat-icon>
                </button>
              </div>
              <table matSort (matSortChange)="sortEventsTableHeader($event)" mat-table [dataSource]="datasource" class="entity-table" multiTemplateDataRows>
                <ng-container
                  [matColumnDef]="column.name"
                  *ngFor="let column of displayedEventColumns"
                >
                  <ng-container *ngIf="column.isChecked">
                    <ng-container *ngIf="column.name === 'settings' || column.name === 'channel_type_ids' || column.name === 'signalEntityFiles'">
                      <th
                      mat-header-cell
                      *matHeaderCellDef
                    >
                      {{ column.displayName }}
                    </th>
                    </ng-container>
                    <ng-container *ngIf="column.name !== 'settings'">
                      <th
                      mat-header-cell
                      *matHeaderCellDef
                      [mat-sort-header]="column.name"
                    >
                      {{ column.displayName }}
                    </th>
                    </ng-container>
                    <td mat-cell *matCellDef="let element; let i = index">
                      <ng-container
                        *ngIf="
                          column.name === 'entity_number' ||
                          column.name === 'signal_name' ||
                            column.name === 'channel_type_ids' ||
                            column.name === 'signalEntityFiles' || 
                            column.name === 'comments' || 
                            column.name === 'settings' ;
                          else otherContent
                        "
                      >
                        <div *ngIf="column.name === 'entity_number' ">
                          {{ signalItem?.signal_number + '-' + element.mysignalEntityFileID }}
                        </div>
                        <div *ngIf="column.name === 'signal_name' "> <!--Event Name -->
                          {{element.mysignalEntityOriginalFileName.split('.')[0]}}
                          </div>
                        <div *ngIf="column.name === 'channel_type_ids'"> <!--FilePath -->
                          <!-- {{element.mysignalEntityOriginalFileName}} -->
                          <!-- <ng-container *ngFor="let c of element.channel_type_ids">
                            {{ channelTypesWithName[c] }}
                          </ng-container> -->
                        </div>
                       
                          <div *ngIf="column.name === 'signalEntityFiles' " class="signal-entity-file"
                          (click)="
                            downloadFile(
                              element.mysignalEntityFileName,
                              element.mysignalEntityOriginalFileName,
                              element.signal_name
                            )
                          ">
                            {{element.mysignalEntityOriginalFileName}}
                          </div>
                        
                        <div *ngIf="column.name === 'comments' ">
                          {{ element.comments }}
                        </div>

                        
                        <div *ngIf="column.name === 'settings' ">
                          <mat-icon  color="primary" matTooltip="Edit event" class="clickable-item" (click)="updateSignalEntity(i, element);$event.stopPropagation()">edit_note</mat-icon> &nbsp;&nbsp;
                          <mat-icon  color="warn" matTooltip="Delete event" class="clickable-item" (click)="deleteSignalEntity(element);$event.stopPropagation()">delete</mat-icon> 
                        </div>
                      </ng-container>
                      <ng-template #otherContent>
                        {{
                          typeOfVar(element[column.name]) === 'object'
                            ? element[column.name].name
                            : element[column.name]
                        }}
                      </ng-template>
                    </td>
                  </ng-container>
                </ng-container>
                <ng-container matColumnDef="expandedDetail" >
                  <td mat-cell *matCellDef="let element" [attr.colspan]="displayedEventColumnsString.length">
                    <div class="example-element-detail"
                    [@detailExpand]="element === expandedElement ? 'expanded' : 'collapsed'">
                      <signaldb-signal-channel-types [datasource]="[element]"></signaldb-signal-channel-types>

                    </div>
                  </td>
                </ng-container>
     
                
                  <tr mat-header-row *matHeaderRowDef="displayedEventColumnsString"></tr>
                  <tr mat-row *matRowDef="let element; columns: displayedEventColumnsString"
                    (click)="expandedElement = expandedElement === element ? null : element"></tr>
                    <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
              </table> 
              
              <br>
              <hr>
              <div class="events-sequence-row">
                <div class="event-sequence-value">
                  <div class="remarks-row-header">
                    <div class="remarks-owner">  </div>
                    <div class="content-files"><b>Files</b></div>
                    <div class="remarks" > <b>Comments</b> </div>
                  </div> 

                  
                  <div class="remarks-row">
                    <div class="remarks-owner"> Event information -test </div>
                    <div class="content-files">
                      <div *ngFor="let file of eventFiles"
                           class="file-name"
                           (click)="downloadFile(file.file_name, file.original_name)">
                            {{file.original_name}}
                          </div>
                    </div>
                    <div class="remarks" [innerHTML]="signalItem.event_list_comments">  </div>
                  </div>
          
                </div>
                <div class="event-sequence-action">
                  <mat-icon  color="primary" matTooltip="Edit eventlist info" class="clickable-item" (click)="editEventContent(signalItem.id)">edit_note</mat-icon>
                </div>
              </div>
              
              
            </mat-expansion-panel>





            <!-- ///////////////////// -->


<!--  
            <mat-expansion-panel expanded="true" class="expansion-pane-class">
              <mat-expansion-panel-header>
                <mat-panel-title class="expansion-panel-title-text">
                  <mat-icon  color="primary">query_stats</mat-icon>&nbsp;&nbsp;
                  Other Files
                </mat-panel-title>
                <mat-panel-description>
                </mat-panel-description>
              </mat-expansion-panel-header>
              <div class="event-actions">
                <button mat-stroked-button  matTooltip="Event column settings"  (click)="entityColumnSettings()" class="add-event-btn">
                  <mat-icon color="primary">view_column</mat-icon>
                </button>
                <button mat-stroked-button (click)="addEvent()" matTooltip="Add Event"  class="add-event-btn">
                  <mat-icon color="primary">add</mat-icon>
                </button>
              </div>
              <table matSort (matSortChange)="sortEventsTableHeader($event)" mat-table [dataSource]="datasource" class="entity-table" multiTemplateDataRows>
                <ng-container
                  [matColumnDef]="column.name"
                  *ngFor="let column of displayedEventColumns"
                >
                  <ng-container *ngIf="column.isChecked">
                    <ng-container *ngIf="column.name === 'settings' || column.name === 'channel_type_ids' || column.name === 'signalEntityFiles'">
                      <th
                      mat-header-cell
                      *matHeaderCellDef
                    >
                      {{ column.displayName }}
                    </th>
                    </ng-container>
                    <ng-container *ngIf="column.name !== 'settings'">
                      <th
                      mat-header-cell
                      *matHeaderCellDef
                      [mat-sort-header]="column.name"
                    >
                      {{ column.displayName }}
                    </th>
                    </ng-container>
                    <td mat-cell *matCellDef="let element; let i = index">
                      <ng-container
                        *ngIf="
                          column.name === 'entity_number' ||
                            column.name === 'channel_type_ids' ||
                            column.name === 'signalEntityFiles' || 
                            column.name === 'comments' || 
                            column.name === 'settings';
                          else otherContent
                        "
                      >
                         <div *ngIf="column.name === 'entity_number'">
                          {{ signalItem?.signal_number + '-' + element.entity_number }}
                        </div> -->
                        <!-- <div *ngIf="column.name === 'channel_type_ids'">
                          <ng-container *ngFor="let c of element.channel_type_ids">
                            {{ channelTypesWithName[c] }}
                          </ng-container>
                        </div> -->
                        <!-- <ng-container *ngIf="column.name === 'signalEntityFiles'">
                          <div
                            *ngFor="let file of element.signalEntityFiles; index as j"
                            class="signal-entity-file"
                            (click)="
                              downloadFile(
                                file.file_name,
                                file.original_name,
                                element.signal_name
                              )
                            "
                          >
                            <div *ngIf="j === element.entity_number-1">
                              {{ file.original_name }}
                            </div>
                          </div>
                        </ng-container>
                        <div *ngIf="column.name === 'comments'">
                          {{ element.comments }}
                        </div>
                        <div *ngIf="column.name === 'settings'">
                          <mat-icon  color="primary" matTooltip="Edit event" class="clickable-item" (click)="updateSignalEntity(i, element);$event.stopPropagation()">edit_note</mat-icon> &nbsp;&nbsp;
                          <mat-icon  color="warn" matTooltip="Delete event" class="clickable-item" (click)="deleteSignalEntity(element);$event.stopPropagation()">delete</mat-icon> 
                        </div>
                      </ng-container>
                      <ng-template #otherContent>
                        {{
                          typeOfVar(element[column.name]) === 'object'
                            ? element[column.name].name
                            : element[column.name]
                        }}
                      </ng-template>
                    </td>
                  </ng-container>
                </ng-container>
                <ng-container matColumnDef="expandedDetail" >
                  <td mat-cell *matCellDef="let element" [attr.colspan]="displayedEventColumnsString.length">
                    <div class="example-element-detail"
                    [@detailExpand]="element === expandedElement ? 'expanded' : 'collapsed'">
                      <signaldb-signal-channel-types [datasource]="[element]"></signaldb-signal-channel-types>

                    </div>
                  </td>
                </ng-container>
                
                  <tr mat-header-row *matHeaderRowDef="displayedEventColumnsString"></tr>
                  <tr mat-row *matRowDef="let element; columns: displayedEventColumnsString"
                    (click)="expandedElement = expandedElement === element ? null : element"></tr>
                    <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
              </table>            
              
            </mat-expansion-panel> -->
            

            
            <mat-expansion-panel expanded="true" class="expansion-pane-class">
              <mat-expansion-panel-header>
                <mat-panel-title class="expansion-panel-title-text">
                  <mat-icon  color="primary">query_stats</mat-icon>&nbsp;&nbsp;
                  Other Files-non signal files
                </mat-panel-title>
                <mat-panel-description>
                </mat-panel-description>
              </mat-expansion-panel-header>
            
              <div class="event-actions">
                <button mat-stroked-button  matTooltip="Event column settings"  (click)="entityColumnSettings()" class="add-event-btn">
                  <mat-icon color="primary">view_column</mat-icon>
                </button>
                <button mat-stroked-button (click)="addEvent()" matTooltip="Add Event"  class="add-event-btn">
                  <mat-icon color="primary">add</mat-icon>
                </button>
              </div>
              <table matSort (matSortChange)="sortEventsTableHeader($event)" mat-table [dataSource]="datasource" class="entity-table" multiTemplateDataRows>
                <ng-container
                  [matColumnDef]="column.name"
                  *ngFor="let column of displayedEventColumns"
                >
                  <ng-container *ngIf="column.isChecked">
                    <ng-container *ngIf="column.name === 'settings' || column.name === 'channel_type_ids' || column.name === 'signalEntityFiles'">
                      <th
                      mat-header-cell
                      *matHeaderCellDef
                    >
                      {{ column.displayName }}
                    </th>
                    </ng-container>
                    <ng-container *ngIf="column.name !== 'settings'">
                      <th
                      mat-header-cell
                      *matHeaderCellDef
                      [mat-sort-header]="column.name"
                    >
                      {{ column.displayName }}
                    </th>
                    </ng-container>
                    <td mat-cell *matCellDef="let element; let i = index">
                      <ng-container
                        *ngIf="
                          column.name === 'entity_number' ||
                          column.name === 'signal_name' ||
                            column.name === 'channel_type_ids' ||
                            column.name === 'signalEntityFiles' || 
                            column.name === 'comments' || 
                            column.name === 'settings' ;
                          else otherContent
                        "
                      >
                        <div *ngIf="column.name === 'entity_number' ">
                          {{ signalItem?.signal_number + '-' + element.mysignalEntityFileID }}
                        </div>
                        <div *ngIf="column.name === 'signal_name' "> <!--Event Name -->
                          {{element.mysignalEntityOriginalFileName.split('.')[0]}}
                          </div>
                        <div *ngIf="column.name === 'channel_type_ids'"> <!--FilePath -->
                          <!-- {{element.mysignalEntityOriginalFileName}} -->
                          <!-- <ng-container *ngFor="let c of element.channel_type_ids">
                            {{ channelTypesWithName[c] }}
                          </ng-container> -->
                        </div>
                       
                          <div *ngIf="column.name === 'signalEntityFiles' " class="signal-entity-file"
                          (click)="
                            downloadFile(
                              element.mysignalEntityFileName,
                              element.mysignalEntityOriginalFileName,
                              element.signal_name
                            )
                          ">
                            {{element.mysignalEntityOriginalFileName}}
                          </div>
                        
                        <div *ngIf="column.name === 'comments' ">
                          {{ element.comments }}
                        </div>

                        
                        <div *ngIf="column.name === 'settings' ">
                          <mat-icon  color="primary" matTooltip="Edit event" class="clickable-item" (click)="updateSignalEntity(i, element);$event.stopPropagation()">edit_note</mat-icon> &nbsp;&nbsp;
                          <mat-icon  color="warn" matTooltip="Delete event" class="clickable-item" (click)="deleteSignalEntity(element);$event.stopPropagation()">delete</mat-icon> 
                        </div>
                      </ng-container>
                      <ng-template #otherContent>
                        {{
                          typeOfVar(element[column.name]) === 'object'
                            ? element[column.name].name
                            : element[column.name]
                        }}
                      </ng-template>
                    </td>
                  </ng-container>
                </ng-container>
                <ng-container matColumnDef="expandedDetail" >
                  <td mat-cell *matCellDef="let element" [attr.colspan]="displayedEventColumnsString.length">
                    <div class="example-element-detail"
                    [@detailExpand]="element === expandedElement ? 'expanded' : 'collapsed'">
                      <signaldb-signal-channel-types [datasource]="[element]"></signaldb-signal-channel-types>

                    </div>
                  </td>
                </ng-container>
     
                
                  <tr mat-header-row *matHeaderRowDef="displayedEventColumnsString"></tr>
                  <tr mat-row *matRowDef="let element; columns: displayedEventColumnsString"
                    (click)="expandedElement = expandedElement === element ? null : element"></tr>
                    <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
              </table> 
              
              <br>
              <hr>
              <div class="events-sequence-row">
                <div class="event-sequence-value">
                  <div class="remarks-row-header">
                    <div class="remarks-owner">  </div>
                    <div class="content-files"><b>Files</b></div>
                    <div class="remarks" > <b>Comments</b> </div>
                  </div> 

                  
                  <div class="remarks-row">
                    <div class="remarks-owner"> Event information -test </div>
                    <div class="content-files">
                      <div *ngFor="let file of eventFiles"
                           class="file-name"
                           (click)="downloadFile(file.file_name, file.original_name)">
                            {{file.original_name}}
                          </div>
                    </div>
                    <div class="remarks" [innerHTML]="signalItem.event_list_comments">  </div>
                  </div>
          
                </div>
                <div class="event-sequence-action">
                  <mat-icon  color="primary" matTooltip="Edit eventlist info" class="clickable-item" (click)="editEventContent(signalItem.id)">edit_note</mat-icon>
                </div>
              </div>
              
              
            </mat-expansion-panel>















            <mat-expansion-panel  expanded="true"  class="expansion-pane-class">
              <mat-expansion-panel-header>
                <mat-panel-title class="expansion-panel-title-text" color="primary">
                  <mat-icon  color="primary">list_alt</mat-icon>&nbsp;
                  Signal Content
                </mat-panel-title>
                <mat-panel-description>
                </mat-panel-description>
              </mat-expansion-panel-header>

              <div class="comments-container">
                <div class="comments-value">
                  <div class="remarks-row-header">
                    <div class="remarks-owner">  </div>
                    <div class="content-files"><b>Files</b></div>
                    <div class="remarks" > <b>Comments</b> </div>
                  </div> 
                  <!-- <div class="remarks-row">
                    <div class="remarks-owner"> Event list  </div>
                    <div class="content-files">
                      <div *ngFor="let file of eventFiles"
                           class="file-name"
                           (click)="downloadFile(file.file_name, file.original_name)">
                            {{file.original_name}}
                          </div>
                    </div>
                    <div class="remarks" [innerHTML]="signalItem.event_list_comments">  </div>
                  </div>  -->
                  <div class="remarks-row">
                    <div class="remarks-owner"> Channel information  </div>
                    <div class="content-files">
                      <div *ngFor="let file of channelFiles"
                           class="file-name"
                           (click)="downloadFile(file.file_name, file.original_name)">
                           {{file.original_name}}</div>
                    </div>
                    <div class="remarks" [innerHTML]="signalItem.channel_list_comments">  </div>
                  </div> 
                </div>
                <div class="comments-action"><mat-icon  color="primary" class="clickable-item" matTooltip="Edit signal content" (click)="editSignalContent(signalItem.id)">edit_note</mat-icon></div>

              </div>
            </mat-expansion-panel>
            <mat-expansion-panel  expanded="true"  class="expansion-pane-class">
              <mat-expansion-panel-header>
                <mat-panel-title class="expansion-panel-title-text">
                  <mat-icon color="primary">build</mat-icon>&nbsp;&nbsp;
                  Setup information
                </mat-panel-title>
                <mat-panel-description>
                </mat-panel-description>
              </mat-expansion-panel-header>
              <div class="comments-container">
                <div class="comments-value">
                  <div class="toolings-list"><b>Tooling numbers:</b>&nbsp;
                    <ng-container *ngIf="signalItem.tooling_numbers?.length">
                      <span *ngFor="let s of signalItem.tooling_numbers;index as m">{{s}}
                        <span *ngIf="m !== signalItem.tooling_numbers?.length -1">,&nbsp; </span>
                      </span>
                    </ng-container>
                  </div>
                  <div class="remarks-row-header">
                    <div class="remarks-owner">  </div>
                    <div class="content-files"><B>Files</B></div>
                    <div class="remarks"> <b>Comments</b> </div>
                  </div> 
                  <div class="remarks-row">
                    <div class="remarks-owner"> Kinematic & 3D model  </div>
                    <div class="content-files">
                      <div *ngFor="let file of kinematicsFiles"
                           class="file-name"
                           (click)="downloadFile(file.file_name, file.original_name)">
                           {{file.original_name}}</div>
                    </div>
                    <div class="remarks"  [innerHTML]="signalItem.kinematic_model_comments"> </div>
                  </div> 
                  <div class="remarks-row">
                    <div class="remarks-owner"> Tool & setup drawing</div>
                    <div class="content-files">
                      <div *ngFor="let file of toolingFiles"
                           class="file-name"
                           (click)="downloadFile(file.file_name, file.original_name)">
                            {{file.original_name}}
                          </div>
                    </div>
                    <div class="remarks" [innerHTML]="signalItem.tooling_comments">  </div>
                  </div> 
                  <div class="remarks-row">
                    <div class="remarks-owner"> Suspension parts  </div>
                    <div class="content-files">
                      <div *ngFor="let file of suspensionFiles"
                           class="file-name"
                           (click)="downloadFile(file.file_name, file.original_name)">
                            {{file.original_name}}
                          </div>
                    </div>
                    <div class="remarks" [innerHTML]="signalItem.suspension_part_comments">  </div>
                  </div> 
                  
                  </div>
                  <div class="comments-action"><mat-icon  color="primary" class="clickable-item" matTooltip="Edit setup info" (click)="editSetupInfo(signalItem.id)">edit_note</mat-icon></div>

              </div>
              
            </mat-expansion-panel>
            <mat-expansion-panel expanded="true" class="expansion-pane-class">
              <mat-expansion-panel-header>
                <mat-panel-title class="expansion-panel-title-text">
                  <mat-icon  color="primary">comment</mat-icon>&nbsp;&nbsp;
                  Comments
                </mat-panel-title>
                <mat-panel-description>
                </mat-panel-description>
              </mat-expansion-panel-header>
              <div class="comments-container">
                <div class="comments-value"
                [innerHTML]="signalItem.project_comments"></div>
                <div class="comments-action"><mat-icon color="primary" class="clickable-item" matTooltip="Edit signal comments" (click)="editComments(signalItem.id, signalItem.project_comments)">edit_note</mat-icon></div>

              </div>
            </mat-expansion-panel>
            <mat-expansion-panel  expanded="false"  class="expansion-pane-class">
              <mat-expansion-panel-header>
                <mat-panel-title class="expansion-panel-title-text">
                  <mat-icon  color="primary">directions_car</mat-icon>&nbsp;&nbsp;
                  Vehicle & track Info
                </mat-panel-title>
                <mat-panel-description>
                </mat-panel-description>
              </mat-expansion-panel-header>
              <div class="advanced-container">
                <table class="advanced-info-table">
                  <tr>
                    <th>Vehicle classification</th>
                    <th>Vehicle brand</th>
                    <th>Vehicle model</th>
                    <th>Vehicle model code</th>
                    <th>Platform</th>
                    <th>Test track name</th>
                  </tr>
                  <tr>
                    <td>{{signalItem.carClassification?.name}}</td>
                    <td>{{signalItem.vehicle_brand}}</td>
                    <td>{{signalItem.vehicle_model}}</td>
                    <td>{{signalItem.vehicle_model_code}}</td>
                    <td>{{signalItem.platform}}</td>
                    <td>{{signalItem.test_track_name}}</td>
                  </tr>
                </table>
                  <!-- <div class="advanced-info-row">
                    <div class="advanced-info-item">
                      <div class="advanced-info-label"><b>Vehicle classification</b></div>
                      <div class="advanced-info-value">{{signalItem.carClassification?.name}}</div>
                    </div>
                    <div class="advanced-info-item">
                      <div class="advanced-info-label"><b>Vehicle brand</b></div>
                      <div class="advanced-info-value">{{signalItem.vehicle_brand}}</div>
                    </div>
                    <div class="advanced-info-item">
                      <div class="advanced-info-label"><b>Vehicle model</b></div>
                      <div class="advanced-info-value">{{signalItem.vehicle_model}}</div>
                    </div>
                    <div class="advanced-info-item">
                      <div class="advanced-info-label"><b>Platform</b></div>
                      <div class="advanced-info-value">{{signalItem.platform}}</div>
                    </div>
                    <div class="advanced-info-item">
                      <div class="advanced-info-label"><b>Vehicle model code</b></div>
                      <div class="advanced-info-value">{{signalItem.vehicle_model_code}}</div>
                    </div>
                    <div class="advanced-info-item">
                      <div class="advanced-info-label"><b>Test track name</b></div>
                      <div class="advanced-info-value">{{signalItem.test_track_name}}</div>
                    </div>
                </div> -->
                <div class="comments-action"><mat-icon color="primary" matTooltip="Edit advanced info" class="clickable-item" (click)="editAdvancedInfo()">edit_note</mat-icon></div>
              </div>
              
            </mat-expansion-panel>
          </mat-accordion>

            </div>
    </mat-card>
</div>
