updateSignalEntityFile(entityFile: SignalEntityFiles ) {
    console.log('update or insert signal entity file')
    const url = enviroment.apiUrl + '/signal/entity/entityFile';
    // const deletedBy = this.userId;
    return this.http.put(url,entityFile).pipe( response => {
      return response;
    })
  }




//delete

deleteSignalEntityFile(id: string ) {
    console.log('deleting signal entity File')
    const url = enviroment.apiUrl + '/signal/entity/entityFile/delete';
    // const deletedBy = this.userId;
    // return this.http.delete(url + `/${id}` + `/${deletedBy}`).pipe( response => {
      return this.http.delete(url + `/${id}`).pipe( response => {

      return response;
    })
  }
