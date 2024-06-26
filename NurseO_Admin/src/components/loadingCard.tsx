import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Card} from "~/components/Card"
import PageView from "~/pages/_PageView"

export function LoadingCard() {
    return <PageView>
        <Card className="grid justify-center items-center">
            <div>
            <h1 className="text-center my-10 text-5xl">Loading...</h1>
            <FontAwesomeIcon icon={faSpinner} spinPulse className="text-9xl mx-auto block" />
            </div>
        </Card>
    </PageView>
}