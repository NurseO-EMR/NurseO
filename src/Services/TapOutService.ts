import { getAuth } from "firebase/auth";
import { $history } from "./State";

export default class TapOutService {
    private static instance: TapOutService;
    private writtenInfo: string;
    private readonly id: string;


    constructor() {
        this.writtenInfo = "";
        this.id = this.getUserID();
        this.initKeyboardListener();
        this.clearWrittenInfo();
    }

    private initKeyboardListener() {
        document.addEventListener("keyup",e=>{
            this.writtenInfo +=e.key;
            this.checkIfWrittenInfoIsSameAsID();
        })
    }

    private clearWrittenInfo() {
        setInterval(()=>this.writtenInfo="", 500);
    }

    private async checkIfWrittenInfoIsSameAsID() {
        console.log(this.writtenInfo)
        console.log(this.id)
        if(this.writtenInfo === this.id) {
            await getAuth().signOut();
            $history.value.push("/");
        }
    }

    private getUserID():string {
        if(getAuth().currentUser) {
            const email = getAuth().currentUser!.email
            const id = email!.split("@")[0];
            return id;
        }

        return "";
    }











    public static getInstance(): TapOutService {
        if (!TapOutService.instance) {
            TapOutService.instance = new TapOutService();
        }
        return TapOutService.instance;
    }

    public static initialize() {
        this.getInstance();
    }

}