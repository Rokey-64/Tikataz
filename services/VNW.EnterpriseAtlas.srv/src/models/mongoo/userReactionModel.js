import mongoose from "mongoose";

const reaction_schema = new mongoose.Schema({
    cid: { type: String, default: "", trim: true },
    cid_type: { type: String, enum: ["auto", "manual"]},
    uid: { type: String, default: "", trim: true },
    type: { type: String, enum: ["like", "heart", "dislike"]},

}, {
    timestamps: true
});

reaction_schema.index({ cid: 1, cid_type: 1, uid: 1}, { unique: true });
reaction_schema.index({ uid: 1 });

export const reactionModel = mongoose.models.reaction || mongoose.model("reactions", reaction_schema);
export default reactionModel;