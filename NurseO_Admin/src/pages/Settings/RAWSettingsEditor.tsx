import { useEffect, useState } from "react";
import { Card } from "../../Components/Card";
import { ButtonWConfirmBox } from "../../Components/Form/ButtonWConfirmBox";
import { Database } from "../../Services/Database";
import PageView from "../PageView";

export function RAWSettingsEditor() {

    const [settings, setSettings] = useState("");
    const [buttonText, setButtonText] = useState("Save");



    useEffect(() => {
        async function getSettings() {
            const db = Database.getInstance();
            const settingsJSON = await db.getSettings();
            const settingsText = JSON.stringify(settingsJSON, null, 4);
            setSettings(settingsText);
        }
        getSettings()
    }, [])


    const onSave = async () => {
        setButtonText("Loading...")
        const db = Database.getInstance();
        const settingsJSON = JSON.parse(settings);
        await db.updateSettings(settingsJSON)
        setButtonText("Save")
    }


    return <PageView>
        <Card>
            <textarea className="border border-blue w-full h-[90%]" value={settings} onChange={ e=>setSettings(e.currentTarget.value)}/>
            <ButtonWConfirmBox className="bg-blue" confirmPrompt="Are you sure you want to save this?" onConfirm={onSave}>{buttonText}</ButtonWConfirmBox>
        </Card>
    </PageView>
}