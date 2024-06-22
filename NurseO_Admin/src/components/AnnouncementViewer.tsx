import { useEffect, useState } from "react"
import { subscribeToAnnouncementBroadcast, unsubscribeFromAnnouncementBroadcast, Announcement } from "../Services/AnnouncementService"
import { motion, AnimatePresence } from "framer-motion"
type AnnouncementObject = {
    announcement: string,
    type: Announcement
}

export function AnnouncementViewer() {
    const [announcements, setAnnouncements] = useState<Array<AnnouncementObject>>([])

    useEffect(() => {
        let popperStarted = false
        function startPopper() {
            popperStarted = true
            const interval = setInterval(() => {
                announcements.splice(0, 1)
                setAnnouncements([...announcements])
                if (announcements.length === 0) {
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
            if (!popperStarted) startPopper()
        }





        subscribeToAnnouncementBroadcast(onAnnouncementHandler)

        return () => unsubscribeFromAnnouncementBroadcast(onAnnouncementHandler)
    }, [])


    return <div className="h-fit w-[30vw] absolute right-0 z-20 p-5 mt-24 grid gap-2 overflow-x-hidden">
        <AnimatePresence>
            {announcements.map((a, i) => (
                    <motion.div key={i} initial={{ x: 1000 }} animate={{ x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`rounded-lg min-h-max 
                    break-words p-3 text-white text-lg
                    ${a.type === Announcement.error ? "bg-red" : null}
                    ${a.type === Announcement.info ? "bg-info" : null}
                    ${a.type === Announcement.success ? "bg-success" : null}
                    `}>
                        {a.announcement}
                    </motion.div>
            ))}
        </AnimatePresence>
    </div>
}