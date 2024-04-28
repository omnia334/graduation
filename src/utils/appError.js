class appError extends Error{
    constructor(){
        super()
    }
    Error(message,code,status){
        this.message =message
        this.code = code
        this.status = status
        return this
    }
}
module.exports =new appError()