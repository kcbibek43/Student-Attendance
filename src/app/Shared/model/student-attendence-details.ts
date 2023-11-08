export interface Attendance{
       date : Date,
        status : string, 
}

export interface StudentAttendance{
    id? : string
    sId : string,
    name : string,
    attendenceStatus : Array<Attendance>
}