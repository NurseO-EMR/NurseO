import { faArrowsRotate, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function AutoChecker() {
    return <div className="bg-gray shadow-xl mx-auto rounded-lg min-h-[20vh] w-[20vw] py-5 px-4">
        <FontAwesomeIcon icon={faArrowsRotate} className="block m-auto text-3xl text-blue" />
        <h1 className="text-center font-bold mt-2">Checking for issues</h1>
        <div className="border-b my-4 hover:bg-blue hover:text-white hover:text-xl transition-all">
            <FontAwesomeIcon icon={faCaretRight} />
            <span className="ml-2">test</span>
        </div>
    </div>
}