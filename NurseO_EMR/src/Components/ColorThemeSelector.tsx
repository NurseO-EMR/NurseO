import colorThemes from "./../colorThemes.json"

export function ColorThemeSelector() {

    const colors = Object.entries(colorThemes)

    const onColorThemeChange = (colorTheme: string) => {
        document.getElementsByTagName("html")[0].className = colorTheme
    }
    return (
        <div className="flex gap-4">
            {colors.map((v,i)=>(
                <ColorThemeButton primaryColor={v[1].primary} secondaryColor={v[1].secondary} backgroundGrayColor={v[1].grayBackground}
                label={v[1].label} onClick={()=>onColorThemeChange(v[0])} />
            ))}
        </div>
    )
}



type Props = {
    primaryColor: string,
    secondaryColor: string,
    backgroundGrayColor: string
    label: string
    onClick: ()=>void
}

function ColorThemeButton(props:Props) {
    return (
        <div className="w-10 h-10 rounded-full overflow-hidden -rotate-12 cursor-pointer" title={props.label} onClick={props.onClick}>
            <div className="flex h-full">
                <div className="w-1/3" style={{backgroundColor: props.primaryColor}}></div>
                <div className="w-1/3" style={{backgroundColor: props.secondaryColor}}></div>
                <div className="w-1/3" style={{backgroundColor: props.backgroundGrayColor}}></div>
            </div>
        </div>
    )
}