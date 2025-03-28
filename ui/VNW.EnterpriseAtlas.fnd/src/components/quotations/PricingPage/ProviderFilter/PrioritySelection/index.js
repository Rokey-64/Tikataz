import { useReducer, useEffect} from "react";
import FilterSelectButton from "../../../common/FilterSelectButton";
import FilterOptionButton from "../../../common/FilterOptionButton";
import FilterStarBar from "../../../common/FilterStarBar";
import { useTranslation } from "react-i18next";
import { ROFReducer, initialOrder, orderItemTemplate } from "../../../../../reducers/ROFReducer";
import { use } from "react";

/**
 * The priority selection panel
 * @returns 
 */
const PrioritySelection = () => {
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(ROFReducer, initialOrder);
    const options = ["Việt nam", "Trung quốc", "Hoa kỳ", "Mỹ"];

    const selectOnchange = (key, value) => {
        dispatch(
            {
                type: 'SET_ORDER_FILTER', payload:
                {
                    ...state.filter,
                    [key]: value
                }
            });
    };

    return (
        <div className="flex flex-col gap-y-3  ml-5">
            <div>
                <label className="text-sm font-semibold">{t("select_message")}</label>
                <div className="flex flex-row gap-x-6">
                    <FilterSelectButton label={t("time")} checked={state.filter.priorityTime} onChange={selectOnchange.bind(this, "priorityTime")}/>
                    <FilterSelectButton label={t("cost")} checked={state.filter.priorityPrice} onChange={selectOnchange.bind(this, "priorityPrice")}/>
                    <FilterSelectButton label={t("quality")} ccheckedeck={state.filter.priorityQuality} onChange={selectOnchange.bind(this, "priorityQuality")}/>
                </div>
            </div>

            <div>
                <label className="text-sm font-semibold">{t("priority_level")}</label>
                <div className="flex flex-col gap-y-3">
                    <FilterOptionButton options={options} selected={state.filter.targetCountry} onChange={selectOnchange.bind(this, "targetCountry")}/>
                    <div className="ml-5">
                        <FilterSelectButton label={t("confirm_message_01")} checked={state.filter.allowedAnothers} onChange={selectOnchange.bind(this, "allowedAnothers")}/>
                    </div>
                </div>
            </div>

            <div>
                <label className="text-sm font-semibold">{t("atleast_stars")}</label>
                <FilterStarBar initialRating={state.filter.minStars} onChange={selectOnchange.bind(this, "minStars")}/>
            </div>
        </div>
    );
};

export default PrioritySelection;