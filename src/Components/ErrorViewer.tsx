import { useEffect, useState } from "react"
import { subscribeToAnnouncementBroadcast, unsubscribeFromAnnouncementBroadcast, Announcement } from "../Services/ErrorService"

type AnnouncementObject = {
    announcement: string,
    type: Announcement
}

export function ErrorViewer() {
    const [announcements, setAnnouncements] = useState<Array<AnnouncementObject>>([])

    useEffect(() => {
        let popperStarted = false
        function startPopper() {
            popperStarted = true
            const interval = setInterval(() => {
                announcements.pop()
                setAnnouncements([...announcements])
                if(announcements.length === 0) {
                    clearInterval(interval)
                    popperStarted = false
                }
            }, 3000)
        }


        function onAnnouncementHandler(a: string, type: Announcement) {
            announcements.push({
                announcement: a,
                type
            })
            setAnnouncements([...announcements])
            if(!popperStarted) startPopper()
        }





        subscribeToAnnouncementBroadcast(onAnnouncementHandler)

        return ()=>unsubscribeFromAnnouncementBroadcast(onAnnouncementHandler)
        }, [])


    return <div className="h-fit w-[30vw] absolute right-0 z-20 p-5 mt-24 grid gap-2">
        {announcements.map((a, i) => {
            if (a.type === Announcement.error) return (
                <div key={i}
                    className="bg-red rounded-lg min-h-max 
                    break-words p-3 text-white text-lg">
                    {a.announcement}
                </div>
            )
            if (a.type === Announcement.info) return (
                <div key={i}
                    className="bg-info rounded-lg min-h-max 
                    break-words p-3 text-white text-lg">
                    {a.announcement}
                </div>
            )
            if (a.type === Announcement.success) return (
                <div key={i}
                    className="bg-success rounded-lg min-h-max 
                    break-words p-3 text-white text-lg">
                    {a.announcement}
                </div>
            )
        })}

    </div>
}