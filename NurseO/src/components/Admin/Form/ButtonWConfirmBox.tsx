import { Button } from "./Button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "~/components/common/ui/dialog";

type Props = {
    className?: string
    confirmPrompt: string
    onConfirm: () => void
    children: string

}

export function ButtonWConfirmBox(props: Props) {

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <Button className={props.className}>{props.children}</Button>
            </DialogTrigger>
            <DialogContent className="w-[30vw]">
                <DialogTitle>Confirm</DialogTitle>

                <div>
                    <h1 className="text-center font-bold">{props.confirmPrompt}</h1>

                    <DialogClose className="mt-5 flex gap-4 w-full">
                        <Button className="bg-darkGray">No</Button>
                        <Button onClick={props.onConfirm} className="bg-blue">Yes</Button>
                    </DialogClose>

                </div>

            </DialogContent>
        </Dialog>

    );
}	
