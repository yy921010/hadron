import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class PhysicalChannel  extends Document{
    @Prop({
        default:'',
        type:String
    })
    name:string
    @Prop({
        default:'',
        type:String
    })
    playUrl:string
}