import React from 'react';
import type { PatientChart } from "~/core/index"
import SectionNamedInfo from './SectionNamedInfo';
import Image from 'next/image';
import { env } from '~/env';


type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default function ArmBand(props: Props) {

    return (
        <div className={`${props.className} flex mx-auto items-center`}>
            <div className={`text-secondary text-xl grid grid-rows-2 grid-cols-5 gap-x-8 items-center py-4 min-h-28 mt-4 flex-grow`}>
                <SectionNamedInfo name="" boldedValue={true}
                    valueClassNames="text-2xl "
                    removeColon={true}
                >{props.patient.name}</SectionNamedInfo>

                <SectionNamedInfo name="DOB">{props.patient.dob}</SectionNamedInfo>
                <SectionNamedInfo name="Age">{props.patient.age}</SectionNamedInfo>
                <SectionNamedInfo name="Gender">{props.patient.gender}</SectionNamedInfo>

                <SectionNamedInfo name="Allergies" boldedValue={true}>
                    {props.patient.allergies.length === 0 ? "NKDA" : props.patient.allergies.map(allergy => " " + allergy.name).toString()}
                </SectionNamedInfo>
                <SectionNamedInfo name="Flags" boldedValue={true}>
                    {props.patient.flags.length === 0 ? "None" : props.patient?.flags.map(flag => flag.name + " ")}
                </SectionNamedInfo>
                <SectionNamedInfo name="Height">{props.patient.height}</SectionNamedInfo>
                <SectionNamedInfo name="Weight">{props.patient.weight}</SectionNamedInfo>
                <SectionNamedInfo name="Code">{props.patient.code}</SectionNamedInfo>
                <SectionNamedInfo name="Sim Time">
                    {props.patient.time.hour.toString().padStart(2, "0")}:{props.patient.time.minute.toString().padStart(2, "0")}
                </SectionNamedInfo>
            </div>
            <Image src={`/${env.NEXT_PUBLIC_basePath}/logo.png`} height={38 * 1.5} width={38 * 2.1} className='' alt="logo" />

        </div>
    );
}