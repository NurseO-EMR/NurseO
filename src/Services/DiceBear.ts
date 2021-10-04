import { Gender } from "../Types/Gender";

export default class DiceBear{
    private static base = "https://avatars.dicebear.com/4.9/api/";

    public static getAvatarURL(gender:Gender, mode:string):string {
        return `${this.base}${gender}/avataaars/${Math.random()}.svg?mode[]=${mode}`
    }


}