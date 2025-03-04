
import { useState } from "react";

const InsertTime = ({dateString}) => {
    const [formData, setFormData] = useState({
        startTime: "08:00",
        endTime: "17:00",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="flex items-center gap-5">
                <div >
                    <label className="text-sm text-gray-600 mr-1">{dateString}</label>
                </div>
                <div >
                    <label className="text-sm text-gray-600 mr-1">Bắt đầu</label>
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="w-fit px-3 py-1 border rounded focus:outline-blue-400"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600 mr-1">Kết thúc</label>
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="w-fit px-3 py-1 border rounded focus:outline-blue-400"
                    />
                </div>
            </div>

        </div>
    );
};

export default InsertTime;