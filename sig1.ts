updateSignalEntityFile(entityFile: SignalEntityFiles ) {
    console.log('update or insert signal entity file')
    const url = enviroment.apiUrl + '/signal/entity/entityFile';
    // const deletedBy = this.userId;
    return this.http.put(url,entityFile).pipe( response => {
      return response;
    })
  }
