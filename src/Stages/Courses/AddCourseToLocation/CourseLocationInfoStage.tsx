import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { uniq, map, filter } from "lodash";
import { Course, LocationDefinition } from "nurse-o-core";
import { useEffect, useState } from "react";
import { Select } from "../../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "../../../Components/Stages/BaseStage";
import { Database } from "../../../Services/Database";
import { MultiSelect } from "../../../Components/Form/MultiSelect";

export type Props = BaseStageProps & {
    onNext: (locationId: string, coursesIds: string[]) => void;
}

export function CourseLocationInfoStage(props: Props) {

    const [locations, setLocations] = useState([] as LocationDefinition[])
    const [buildings, setBuildings] = useState([] as string[])
    const [stations, setStations] = useState([] as LocationDefinition[])
    const [locationId, setLocationID] = useState("");

    const [courses, setCourses] = useState([] as Course[]);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([])

    const [loading, setLoading] = useState(false);

    const db = Database.getInstance()

    useEffect(() => {
        async function getLocations() {
            const settings = await db.getSettings();
            const buildings = uniq(map(settings.locations, "building"))
            const courses = settings.courses
            setBuildings(buildings)
            setCourses([...courses])
            setLocations(settings.locations);
        }
        getLocations();
    }, [db])

    const onBuildingSelected = (buildingName: string) => {
        const filteredStations = filter(locations, { building: buildingName })
        setStations(filteredStations)
    }


    const onNextClickHandler = () => {
        setLoading(true)
        props.onNext(locationId,selectedCourses);
        setLoading(false)
    }

    return <BaseStage {...props} title="Where is it going?" icon={faBuilding} onNext={onNextClickHandler} customNextText={loading ? "Loading..." : "Add Medication"}>
        <div className="grid gap-x-8">
            <Select label="Building" onChange={e => onBuildingSelected(e.currentTarget.value)}>
                <option className="hidden"></option>
                <>{buildings.map((b, i) => <option value={b} key={i}>{b}</option>)}</>
            </Select>

            <Select label="Station" onChange={e => setLocationID(e.currentTarget.value)} value={locationId}>
                <option className="hidden"></option>
                <>{stations.map((s, i) => <option value={s.id} key={i}>{s.station}</option>)}</>
            </Select>

            <MultiSelect label="Courses" options={courses} 
            labelKeys={["name"]}  valueKey="id" 
            onChange={setSelectedCourses}/>
        </div>
    </BaseStage>
}