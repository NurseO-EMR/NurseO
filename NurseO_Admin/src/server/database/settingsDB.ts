import type { PrismaClient } from "@prisma/client";
import type { ProtocolStatus } from "~/types/protocolTypes";

export async function getCourses(db:PrismaClient) {
    const courses = await db.$queryRaw<{id: number, name: string}[]>`SELECT id, name FROM Course`
    return courses;
}

export async function deleteCourse(db:PrismaClient, courseId: number) {
    const data = await getNumberOfLocationsNPatientsByLocation(db, courseId)
    if(data && data.locationCount+data.studentPatientCount+data.templatePatientCount) {
        
        return {status: "Error", message: `There are ${data.locationCount} locations, ${data.templatePatientCount} template patients, and ${data.studentPatientCount} student patients profiles associated with this location`}
    }

    return await db.course.delete({
        where: {
            id: courseId
        }
    })
    .then(()=>{return {status: "Success", message: "Course deleted successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}

export async function updateCourse(db:PrismaClient, courseId: number, courseName: string): Promise<ProtocolStatus>  {
    return await db.course.update({
        data: {
            name: courseName
        },
         where: {
            id: courseId
         }
    })
    .then(()=>{return {status: "Success", message: "Course updated successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}

export async function addCourse(db:PrismaClient, courseName: string): Promise<ProtocolStatus>  {
    return await db.course.create({
        data: {
            name: courseName,
        },
    })
    .then(()=>{return {status: "Success", message: "Course added successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}


export async function getLocations(db:PrismaClient) {
    const locations = await db.$queryRaw<{id: number, building: string, station: string}[]>`SELECT id, building, station FROM Location`
    return locations
}

export async function getCoursesInSpecificLocation(db:PrismaClient, locationId: number) {
    const data = await db.$queryRaw<{id: number, name: string}[]>`
                                    SELECT Course.id, Course.name
                                    FROM Course
                                    INNER JOIN Course_Location_Information ON Course.id = Course_Location_Information.course_id
                                    WHERE Course_Location_Information.location_id = ${locationId};`
    return data
}

export async function deleteCourseFromLocation(db:PrismaClient, locationId: number, courseId: number) {
    return await db.course_Location_Information.deleteMany({
        where: {
            course_id: courseId,
            location_id: locationId
        }
    })
    .then(()=>{return {status: "Success", message: "Course deleted successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}

export async function addCourseToLocation(db:PrismaClient, locationId: number, courseId: number): Promise<ProtocolStatus> {
    return await db.course_Location_Information.create({
        data: {
            course_id: courseId,
            location_id: locationId
        }
    })
    .then(()=>{return {status: "Success", message: "Course created successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}

export async function deleteLocation(db:PrismaClient, locationId: number): Promise<ProtocolStatus> {
    const data = await getNumberOfCoursesNMedsByLocation(db, locationId)

    if(data && data.courseCount + data.medCount > 0) {
        return {status: "Error", message: `There are ${data.courseCount} courses and ${data.medCount} medications associated with this location`}
    } 

    return await db.location.delete({
        where: {
            id: locationId
        }
    })
    .then(()=>{return {status: "Success", message: "Location deleted successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})

}

export async function updateLocation(db:PrismaClient, locationId: number, buildingName: string, stationName: string): Promise<ProtocolStatus>  {
    return await db.location.update({
        data: {
            building: buildingName,
            station: stationName,
        },
         where: {
            id: locationId
         }
    })
    .then(()=>{return {status: "Success", message: "Location updated successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}

export async function addLocation(db:PrismaClient, buildingName: string, stationName: string): Promise<ProtocolStatus>  {
    return await db.location.create({
        data: {
            building: buildingName,
            station: stationName,
        },
    })
    .then(()=>{return {status: "Success", message: "Location added successfully"}})
    .catch((e)=>{return {status: "Error", message: String(e)}})
}

async function getNumberOfCoursesNMedsByLocation(db:PrismaClient, locationId: number) {
    const data = await db.$queryRaw<{medCount:number, courseCount: number}[]>`
         SELECT medCount, courseCount FROM
        (SELECT COUNT(1) as medCount FROM Medication_Location_Information WHERE Medication_Location_Information.location_id = ${locationId}) as meds,
        (SELECT COUNT(1) as courseCount FROM Course_Location_Information WHERE Course_Location_Information.location_id = ${locationId}) as courses
    `
    return data[0]
}

async function getNumberOfLocationsNPatientsByLocation(db:PrismaClient, courseId: number) {
    const data = await db.$queryRaw<{studentPatientCount:number, templatePatientCount: number, locationCount: number}[]>`
         SELECT studentPatientCount, templatePatientCount, locationCount FROM
        (SELECT COUNT(1) as studentPatientCount FROM Patient WHERE Patient.template = false AND Patient.course_id = ${courseId}) as studentPatients,
        (SELECT COUNT(1) as templatePatientCount FROM Patient WHERE Patient.template = true AND Patient.course_id = ${courseId}) as templatePatients,
        (SELECT COUNT(1) as locationCount FROM Course_Location_Information WHERE Course_Location_Information.course_id = ${courseId}) as courses
    `

    const studentPatientCount = Number(data[0]?.studentPatientCount)
    const templatePatientCount = Number(data[0]?.templatePatientCount)
    const locationCount = Number(data[0]?.locationCount)
    return {studentPatientCount, templatePatientCount, locationCount}
}