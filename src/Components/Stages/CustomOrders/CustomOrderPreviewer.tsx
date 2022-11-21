import { CustomOrder } from "nurse-o-core"
import { ArrayPreviewer } from "../ArrayPreviewer"
import { CustomOrderPreviewerEntity } from "./CustomOrderPreviewerEntity"

type Props = {
    orders: CustomOrder[],
    onDeleteClickHandler: (index: number) => void,
    onIndexChangeHandler: (oldIndex: number, newIndex: number) => void
}

export function CustomOrderPreviewer(props: Props) {
    return <ArrayPreviewer headerItems={["Type", "Time", "Order", "Delete", ""]}
        show={props.orders.length > 0} title="Added Custom Orders"
        className="hover:w-[60rem] transition-all">
        {props.orders.map((entry, i) =>
          <CustomOrderPreviewerEntity order={entry} index={i} key={i} 
          onDelete={()=>props.onDeleteClickHandler(i)}
          onIndexChange={props.onIndexChangeHandler}
          />  
        )}
    </ArrayPreviewer>
}