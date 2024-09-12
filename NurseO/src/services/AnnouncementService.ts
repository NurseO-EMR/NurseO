const sups:((announcement:string, type: Announcement)=>void)[]= []

export enum Announcement {
    error,
    info,
    success
}

export function broadcastAnnouncement(announcement: string, type:Announcement) {
    for(const sup of sups) {
        sup(announcement, type)
    }
    if(type === Announcement.error) console.error(announcement)
    if(type === Announcement.info) console.info(announcement)
    if(type === Announcement.success) console.log(announcement)
}


export function subscribeToAnnouncementBroadcast(fn: (announcement:string, type: Announcement)=>void) {
    sups.push(fn)
}


export function unsubscribeFromAnnouncementBroadcast(fn: (announcement:string, type: Announcement)=>void) {
    const index = sups.indexOf(fn)
    if(index>-1) {
        sups.splice(index,1)
    }
}