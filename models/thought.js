import { Schema, model } from "mongoose";
import moment from "moment";
import reactionSchema from "./Reaction";

const thoughtSchema = new Schema(

    {
        thoughtText: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 280
        },
        createdAt:{
            type:Date,
            default: Date.now,
            get: (time) => moment(time).format("MMM DD YYYY [at] hh:mm a"),
        },
        username:{
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters:true,
        },
        id: false,
      }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = model("thought", thoughtSchema);
  
  export default Thought;