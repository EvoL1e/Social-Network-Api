import { Schema, model } from 'mongoose';
import moment from "moment";

const reactionSchema = new Schema(

    {
      reactionId:{
        type: Schema.Types.ObjectId,
      },
      reactionBody:{
        type: String,
        required: true,
        maxLength: 280
      },
      username:{
        type: String,
        required: true,
      },
      createdAt:{
        type:Date,
        default: Date.now,
        get: (time) => moment(time).format("MMM DD YYYY [at] hh:mm a"),
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
      
    }
  );

export default reactionSchema;