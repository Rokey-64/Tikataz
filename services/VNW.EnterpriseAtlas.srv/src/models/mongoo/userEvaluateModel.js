import mongoose from "mongoose";

const evaluate_schema = new mongoose.Schema({
    cid: { type: String, default: "", trim: true },
    cid_type: { type: String, enum: ["auto", "manual"]},
    uid: { type: String, default: "", trim: true },
    star: { type: Number, enum: [1, 2, 3, 4, 5]},

}, {
    timestamps: true,
    // versionKey: false
});

evaluate_schema.index({ cid: 1, cid_type: 1, uid: 1}, { unique: true });
evaluate_schema.index({ uid: 1 });

export const userRateModel = mongoose.models.reaction || mongoose.model("ratings", evaluate_schema);
export default userRateModel;